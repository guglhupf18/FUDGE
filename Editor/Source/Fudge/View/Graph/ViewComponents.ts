namespace Fudge {
  import ƒ = FudgeCore;
  import ƒui = FudgeUserInterface;

  enum Menu {
    COMPONENTMENU = "Add Components"
  }

  // TODO: examin problem with ƒ.Material when using "typeof ƒ.Mutable" as key to the map
  let resourceToComponent: Map<Function, typeof ƒ.Component> = new Map<Function, typeof ƒ.Component>([
    [ƒ.Audio, ƒ.ComponentAudio],
    [ƒ.Material, ƒ.ComponentMaterial],
    [ƒ.Mesh, ƒ.ComponentMesh]
  ]);

  /**
   * View all components attached to a node
   * @author Jirka Dell'Oro-Friedl, HFU, 2020
   */
  export class ViewComponents extends View {
    private node: ƒ.Node;
    private expanded: { [type: string]: boolean } = { ComponentTransform: true };

    constructor(_container: GoldenLayout.Container, _state: Object) {
      super(_container, _state);
      this.fillContent();

      this.dom.addEventListener(EVENT_EDITOR.SET_GRAPH, this.hndEvent);
      this.dom.addEventListener(EVENT_EDITOR.FOCUS_NODE, this.hndEvent);
      this.dom.addEventListener(EVENT_EDITOR.UPDATE, this.hndEvent);
      this.dom.addEventListener(ƒui.EVENT.RENAME, this.hndEvent);
      this.dom.addEventListener(ƒui.EVENT.EXPAND, this.hndEvent);
      this.dom.addEventListener(ƒui.EVENT.COLLAPSE, this.hndEvent);
      this.dom.addEventListener(ƒui.EVENT.CONTEXTMENU, this.openContextMenu);
    }

    //#region  ContextMenu
    protected getContextMenu(_callback: ContextMenuCallback): Electron.Menu {
      const menu: Electron.Menu = new remote.Menu();
      let item: Electron.MenuItem;
      item = new remote.MenuItem({
        label: "Add Component",
        submenu: ContextMenu.getSubclassMenu<typeof ƒ.Component>(CONTEXTMENU.ADD_COMPONENT, ƒ.Component.subclasses, _callback)
      });
      menu.append(item);

      ContextMenu.appendCopyPaste(menu);
      return menu;
    }

    protected contextMenuCallback(_item: Electron.MenuItem, _window: Electron.BrowserWindow, _event: Electron.Event): void {
      ƒ.Debug.info(`MenuSelect: Item-id=${CONTEXTMENU[_item.id]}`);

      switch (Number(_item.id)) {
        case CONTEXTMENU.ADD_COMPONENT:
          let iSubclass: number = _item["iSubclass"];
          let component: typeof ƒ.Component = ƒ.Component.subclasses[iSubclass];
          //@ts-ignore
          let cmpNew: ƒ.Component = new component();
          ƒ.Debug.info(cmpNew.type, cmpNew);

          this.node.addComponent(cmpNew);
          this.dom.dispatchEvent(new CustomEvent(ƒui.EVENT.SELECT, { bubbles: true, detail: { data: this.node } }));
          break;
      }
    }
    //#endregion

    protected hndDragOver = (_event: DragEvent): void => {
      if (!this.node)
        return;
      if (this.dom != _event.target)
        return;

      let viewSource: View = View.getViewSource(_event);
      if (!(viewSource instanceof ViewInternal || viewSource instanceof ViewScript))
        return;

      for (let source of viewSource.getDragDropSources()) {
        if (source instanceof ScriptInfo) {
          if (!source.isComponent)
            return;
        } else if (!this.findComponentType(source))
          return;
      }

      _event.dataTransfer.dropEffect = "link";
      _event.preventDefault();
      _event.stopPropagation();
    }

    protected hndDrop = (_event: DragEvent): void => {
      let viewSource: View = View.getViewSource(_event);
      for (let source of viewSource.getDragDropSources()) {
        let cmpNew: ƒ.Component = this.createComponent(source);
        this.node.addComponent(cmpNew);
        this.expanded[cmpNew.type] = true;
      }
      this.dom.dispatchEvent(new Event(EVENT_EDITOR.UPDATE, { bubbles: true }));
    }

    private fillContent(): void {
      while (this.dom.lastChild && this.dom.removeChild(this.dom.lastChild));
      if (this.node) {
        if (this.node instanceof ƒ.Node) {
          this.setTitle(this.node.name);

          let nodeComponents: ƒ.Component[] = this.node.getAllComponents();
          for (let nodeComponent of nodeComponents) {
            let fieldset: ƒui.ExpandableFieldSet = ƒui.Generator.createFieldSetFromMutable(nodeComponent);
            let uiComponent: ControllerComponent = new ControllerComponent(nodeComponent, fieldset);
            fieldset.expand(this.expanded[nodeComponent.type]);
            this.dom.append(uiComponent.domElement);
          }
        }
      }
      else {
        let cntEmpty: HTMLDivElement = document.createElement("div");
        this.dom.append(cntEmpty);
      }
    }

    private hndEvent = (_event: CustomEvent): void => {
      switch (_event.type) {
        // case ƒui.EVENT.RENAME: break;
        case EVENT_EDITOR.SET_GRAPH:
        case EVENT_EDITOR.FOCUS_NODE:
          this.node = _event.detail;
        case EVENT_EDITOR.UPDATE:
          this.fillContent();
          break;
        case ƒui.EVENT.EXPAND:
        case ƒui.EVENT.COLLAPSE:
          this.expanded[(<ƒui.ExpandableFieldSet>_event.target).getAttribute("type")] = (_event.type == ƒui.EVENT.EXPAND);
        default:
          break;
      }
    }

    private createComponent(_resource: Object): ƒ.Component {
      if (_resource instanceof ScriptInfo)
        if (_resource.isComponent)
          return new (<ƒ.General>_resource.script)();

      let typeComponent: typeof ƒ.Component = this.findComponentType(_resource);
      return new (<ƒ.General>typeComponent)(_resource);
    }

    private findComponentType(_resource: Object): typeof ƒ.Component {
      for (let entry of resourceToComponent)
        if (_resource instanceof entry[0])
          return entry[1];
    }
  }
}