namespace Fudge {
  import ƒ = FudgeCore;
  import ƒui = FudgeUserInterface;

  export let typesOfResources: ƒ.General[] = [
    ƒ.Mesh
  ];

  /**
   * List the internal resources
   * @author Jirka Dell'Oro-Friedl, HFU, 2020  
   */
  export class ViewInternal extends View {
    private table: ƒui.Table<ƒ.SerializableResource>;

    constructor(_container: GoldenLayout.Container, _state: Object) {
      super(_container, _state);

      this.dom.addEventListener(EVENT_EDITOR.SET_PROJECT, this.hndEvent);
      this.dom.addEventListener(EVENT_EDITOR.UPDATE, this.hndEvent);
      this.dom.addEventListener(ƒui.EVENT.CONTEXTMENU, this.openContextMenu);
      // this.dom.addEventListener(ƒui.EVENT.DRAG_OVER, this.hndDragOver);
      // this.dom.addEventListener(ƒui.EVENT.DROP, this.hndDrop);
    }

    public listResources(): void {
      while (this.dom.lastChild && this.dom.removeChild(this.dom.lastChild));
      this.table = new ƒui.Table<ƒ.SerializableResource>(new ControllerTableResource(), Object.values(ƒ.Project.resources));
      this.dom.appendChild(this.table);
    }

    public getSelection(): ƒ.SerializableResource[] {
      return this.table.controller.selection;
    }

    public getDragDropSources(): ƒ.SerializableResource[] {
      return this.table.controller.dragDrop.sources;
    }

    // #region  ContextMenu
    protected getContextMenu(_callback: ContextMenuCallback): Electron.Menu {
      const menu: Electron.Menu = new remote.Menu();
      let item: Electron.MenuItem;

      item = new remote.MenuItem({ label: "Edit", id: String(CONTEXTMENU.EDIT), click: _callback, accelerator: process.platform == "darwin" ? "E" : "E" });
      menu.append(item);

      item = new remote.MenuItem({
        label: "Create Mesh",
        submenu: ContextMenu.getSubclassMenu<typeof ƒ.Mesh>(CONTEXTMENU.CREATE_MESH, ƒ.Mesh.subclasses, _callback)
      });
      menu.append(item);

      item = new remote.MenuItem({
        label: "Create Material",
        submenu: ContextMenu.getSubclassMenu<typeof ƒ.Shader>(CONTEXTMENU.CREATE_MATERIAL, ƒ.Shader.subclasses, _callback)
      });
      menu.append(item);

      // ContextMenu.appendCopyPaste(menu);
      return menu;
    }

    protected contextMenuCallback(_item: Electron.MenuItem, _window: Electron.BrowserWindow, _event: Electron.Event): void {
      ƒ.Debug.fudge(`MenuSelect | id: ${CONTEXTMENU[_item.id]} | event: ${_event}`);
      let iSubclass: number = _item["iSubclass"];

      switch (Number(_item.id)) {
        case CONTEXTMENU.CREATE_MESH:
          if (!iSubclass) {
            alert("Funky Electron-Error... please try again");
            return;
          }

          let typeMesh: typeof ƒ.Mesh = ƒ.Mesh.subclasses[iSubclass];
          //@ts-ignore
          let meshNew: ƒ.Mesh = new typeMesh();
          this.dom.dispatchEvent(new Event(EVENT_EDITOR.UPDATE, { bubbles: true }));
          this.table.selectInterval(meshNew, meshNew);
          break;
        case CONTEXTMENU.CREATE_MATERIAL:
          if (!iSubclass) {
            alert("Funky Electron-Error... please try again");
            return;
          }
          let typeShader: typeof ƒ.Shader = ƒ.Shader.subclasses[iSubclass];
          let mtrNew: ƒ.Material = new ƒ.Material("NewMaterial", typeShader);
          this.dom.dispatchEvent(new Event(EVENT_EDITOR.UPDATE, { bubbles: true }));
          this.table.selectInterval(mtrNew, mtrNew);
          break;
        case CONTEXTMENU.EDIT:
          let resource: ƒ.SerializableResource = this.table.getFocussed();
          this.dom.dispatchEvent(new CustomEvent(EVENT_EDITOR.SET_GRAPH, { bubbles: true, detail: resource }));
          break;
      }
    }
    //#endregion

    protected hndDragOver = (_event: DragEvent): void => {
      _event.dataTransfer.dropEffect = "none";
      if (this.dom != _event.target)
        return;

      let viewSource: View = View.getViewSource(_event);
      if (!(viewSource instanceof ViewExternal || viewSource instanceof ViewHierarchy))
        return;

      if (viewSource instanceof ViewExternal) {
        let sources: DirectoryEntry[] = viewSource.getDragDropSources();
        for (let source of sources)
          if (source.getMimeType() != MIME.AUDIO && source.getMimeType() != MIME.IMAGE)
            return;
      }

      _event.dataTransfer.dropEffect = "link";
      _event.preventDefault();
      _event.stopPropagation();
    }

    protected hndDrop = async (_event: DragEvent): Promise<void> => {
      let viewSource: View = View.getViewSource(_event);

      if (viewSource instanceof ViewHierarchy) {
        let sources: ƒ.Node[] = viewSource.getDragDropSources();
        for (let source of sources) {
          await ƒ.Project.registerAsGraph(source, true);
        }
      } else if (viewSource instanceof ViewExternal) {
        let sources: DirectoryEntry[] = viewSource.getDragDropSources();
        for (let source of sources) {
          switch (source.getMimeType()) {
            case MIME.AUDIO:
              console.log(new ƒ.Audio(source.pathRelative));
              break;
            case MIME.IMAGE:
              console.log(new ƒ.TextureImage(source.pathRelative));
              break;
          }
        }
        // console.log("External");
      }

      this.dom.dispatchEvent(new Event(EVENT_EDITOR.UPDATE, { bubbles: true }));
    }

    private hndEvent = (_event: CustomEvent): void => {
      switch (_event.type) {
        case EVENT_EDITOR.SET_PROJECT:
        case EVENT_EDITOR.UPDATE:
          this.listResources();
          break;
        // case ƒui.EVENT.SELECT:
        //   console.log(_event.detail.data);
        //   break;
      }
    }
  }
}