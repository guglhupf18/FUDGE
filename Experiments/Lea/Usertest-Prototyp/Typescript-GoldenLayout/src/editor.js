var GoldenLayoutTest;
(function (GoldenLayoutTest) {
    let myLayout;
    function create() {
        let menubar = document.createElement("div");
        menubar.classList.add("navbar");
        let dropdown_file = document.createElement("div");
        dropdown_file.classList.add("dropdown");
        let file_content = document.createElement("div");
        file_content.id = "File_Dropdown";
        file_content.classList.add("dropdown-content");
        let item_new = document.createElement("a");
        item_new.innerHTML = "New File...";
        file_content.append(item_new);
        let item_open = document.createElement("a");
        item_open.innerHTML = "Open File...";
        file_content.append(item_open);
        let item_Save = document.createElement("a");
        item_Save.innerHTML = "Save";
        file_content.append(item_Save);
        let item_SaveAs = document.createElement("a");
        item_SaveAs.innerHTML = "Save as...";
        file_content.append(item_SaveAs);
        let item_Import = document.createElement("a");
        item_Import.innerHTML = "Import...";
        file_content.append(item_Import);
        let item_Export = document.createElement("a");
        item_Export.innerHTML = "Save";
        file_content.append(item_Export);
        let file_button = document.createElement("button");
        file_button.classList.add("dropbutton");
        file_button.innerHTML = 'File<i class = "fa fa-caret-down"></i>';
        let dropdown_edit = document.createElement("div");
        dropdown_edit.classList.add("dropdown");
        let edit_content = document.createElement("div");
        edit_content.id = "Edit_Dropdown";
        edit_content.classList.add("dropdown-content");
        let item_undo = document.createElement("a");
        item_undo.innerHTML = "Undo";
        edit_content.append(item_undo);
        let item_redo = document.createElement("a");
        item_redo.innerHTML = "Redo";
        edit_content.append(item_redo);
        let item_Copy = document.createElement("a");
        item_Copy.innerHTML = "Copy";
        edit_content.append(item_Copy);
        let item_Paste = document.createElement("a");
        item_Paste.innerHTML = "Paste";
        edit_content.append(item_Paste);
        let item_selectAll = document.createElement("a");
        item_selectAll.innerHTML = "Select All";
        edit_content.append(item_selectAll);
        let item_deselectAll = document.createElement("a");
        item_deselectAll.innerHTML = "Deselect All";
        edit_content.append(item_deselectAll);
        let edit_button = document.createElement("button");
        edit_button.classList.add("dropbutton");
        edit_button.innerHTML = 'Edit<i class = "fa fa-caret-down"></i>';
        edit_button.addEventListener("click", function () {
            edit_content.classList.toggle("show");
        });
        let dropdown_window = document.createElement("div");
        dropdown_window.classList.add("dropdown");
        let window_content = document.createElement("div");
        window_content.id = "window_Dropdown";
        window_content.classList.add("dropdown-content");
        let item_materialEditor = document.createElement("a");
        item_materialEditor.innerHTML = "Material Editor";
        window_content.append(item_materialEditor);
        let item_sketchEditor = document.createElement("a");
        item_sketchEditor.innerHTML = "Sketch Editor";
        item_sketchEditor.addEventListener("click", sketchbutton);
        window_content.append(item_sketchEditor);
        let item_animator = document.createElement("a");
        item_animator.innerHTML = "Animation Editor";
        item_animator.addEventListener("click", animatorbutton);
        window_content.append(item_animator);
        let item_3D = document.createElement("a");
        item_3D.innerHTML = "3D Model Editor";
        window_content.append(item_3D);
        let item_resetLayout = document.createElement("a");
        item_resetLayout.innerHTML = "Reset Layout";
        window_content.append(item_resetLayout);
        let window_button = document.createElement("button");
        window_button.classList.add("dropbutton");
        window_button.innerHTML = 'Window<i class = "fa fa-caret-down"></i>';
        window_button.addEventListener("click", function () {
            window_content.classList.toggle("show");
        });
        let dropdown_tools = document.createElement("div");
        dropdown_tools.classList.add("dropdown");
        let tools_content = document.createElement("div");
        tools_content.id = "tools_Dropdown";
        tools_content.classList.add("dropdown-content");
        let item_select = document.createElement("a");
        item_select.innerHTML = "Selection Tool";
        tools_content.append(item_select);
        let item_translate = document.createElement("a");
        item_translate.innerHTML = "Move Selection";
        tools_content.append(item_translate);
        let item_rotate = document.createElement("a");
        item_rotate.innerHTML = "Rotate Selection";
        tools_content.append(item_rotate);
        let item_scale = document.createElement("a");
        item_scale.innerHTML = "Scale Selection";
        tools_content.append(item_scale);
        let item_pan = document.createElement("a");
        item_pan.innerHTML = "Pan View";
        tools_content.append(item_pan);
        /*let item_animator:HTMLElement = document.createElement("a");
        item_animator.innerHTML = "Animation Editor";
        tools_dropdown.append(item_animator);
        let item_resetLayout:HTMLElement = document.createElement("a");
        item_resetLayout.innerHTML = "Reset Layout";
        tools_dropdown.append(item_resetLayout);*/
        let tools_button = document.createElement("button");
        tools_button.classList.add("dropbutton");
        tools_button.innerHTML = 'Tools<i class = "fa fa-caret-down"></i>';
        tools_button.addEventListener("click", function () {
            tools_content.classList.toggle("show");
        });
        let dropdown_add = document.createElement("div");
        dropdown_add.classList.add("dropdown");
        let add_content = document.createElement("div");
        add_content.id = "add_Dropdown";
        add_content.classList.add("dropdown-content");
        let item_Cube = document.createElement("a");
        item_Cube.innerHTML = "Add Box";
        item_Cube.addEventListener("click", createbuttonpressed);
        add_content.append(item_Cube);
        let item_sphere = document.createElement("a");
        item_sphere.innerHTML = "Add Sphere";
        add_content.append(item_sphere);
        let item_pyramid = document.createElement("a");
        item_pyramid.innerHTML = "Add Pyramid";
        add_content.append(item_pyramid);
        let item_cylinder = document.createElement("a");
        item_cylinder.innerHTML = "Add Cylinder";
        add_content.append(item_cylinder);
        let item_Capsule = document.createElement("a");
        item_Capsule.innerHTML = "Add Capsule";
        add_content.append(item_Capsule);
        let item_plane = document.createElement("a");
        item_plane.innerHTML = "Add Plane";
        add_content.append(item_plane);
        let add_button = document.createElement("button");
        add_button.classList.add("dropbutton");
        add_button.innerHTML = 'Add Node<i class = "fa fa-caret-down"></i>';
        add_button.addEventListener("click", function () {
            add_content.classList.toggle("show");
        });
        let dropdown_help = document.createElement("div");
        dropdown_help.classList.add("dropdown");
        let help_content = document.createElement("div");
        help_content.id = "help_Dropdown";
        help_content.classList.add("dropdown-content");
        let item_tutorial = document.createElement("a");
        item_tutorial.innerHTML = "Tutorial";
        help_content.append(item_tutorial);
        let item_about = document.createElement("a");
        item_about.innerHTML = "About";
        help_content.append(item_about);
        let help_button = document.createElement("button");
        help_button.classList.add("dropbutton");
        help_button.innerHTML = 'Help<i class = "fa fa-caret-down"></i>';
        help_button.addEventListener("click", function () {
            help_content.classList.toggle("show");
        });
        dropdown_file.append(file_button);
        dropdown_file.append(file_content);
        menubar.append(dropdown_file);
        dropdown_edit.append(edit_button);
        dropdown_edit.append(edit_content);
        menubar.append(dropdown_edit);
        dropdown_window.append(window_button);
        dropdown_window.append(window_content);
        menubar.append(dropdown_window);
        dropdown_tools.append(tools_button);
        dropdown_tools.append(tools_content);
        menubar.append(dropdown_tools);
        dropdown_add.append(add_button);
        dropdown_add.append(add_content);
        menubar.append(dropdown_add);
        dropdown_help.append(help_button);
        dropdown_help.append(help_content);
        menubar.append(help_content);
        let root = document.getElementById("menu");
        root.append(menubar);
    }
    create();
    let savedState;
    let stage = 0;
    // let file:HTML = "test.html"
    let config = {
        content: [{
                type: 'row',
                content: [{
                        type: 'component',
                        componentName: 'Scene Explorer',
                        title: "Scene Explorer",
                        componentState: { label: 'A' }
                    },
                    {
                        type: 'component',
                        componentName: 'Viewport',
                        title: "Viewport",
                        componentState: { label: 'D' }
                    },
                    {
                        type: 'column',
                        content: [{
                                type: 'component',
                                componentName: 'Inspector',
                                title: "Inspector",
                                componentState: { label: 'B' }
                            },
                            {
                                type: 'component',
                                componentName: 'Menubar',
                                title: "Menubar",
                                componentState: { label: 'C' }
                            }]
                    }]
            }]
    };
    myLayout = new GoldenLayout(config);
    savedState = localStorage.getItem('scenestate');
    // let state:GoldenLayout.ComponentConfig = myLayout.toConfig();
    if (savedState !== null) {
        myLayout = new GoldenLayout(JSON.parse(savedState));
    }
    else {
        myLayout = new GoldenLayout(config);
    }
    //Layout Changes - listener
    // let s:SimpleComponent = new SimpleComponent();
    // console.log(s);
    myLayout.on('stateChanged', stateupdate);
    myLayout.registerComponent('Viewport', createViewportComponent);
    myLayout.registerComponent('Scene Explorer', createExplorerComponent);
    myLayout.registerComponent('Inspector', createInspectorComponent);
    myLayout.registerComponent('Menubar', createToolComponent);
    myLayout.init();
    function stateupdate() {
        let state = JSON.stringify(myLayout.toConfig());
        localStorage.setItem('scenestate', state);
    }
    function createbuttonpressed() {
        if (stage == 0) {
            myLayout.emit('create-button');
            stage += 1;
        }
    }
    function selectbuttonpressed() {
        if (stage == 1) {
            myLayout.emit('select-button');
            stage += 1;
        }
    }
    function rotatebuttonpressed() {
        if (stage == 2) {
            myLayout.emit('rotate-button');
        }
    }
    function hidebuttonpressed() {
        myLayout.emit('hide-button');
    }
    function shaderbuttonpressed() {
        myLayout.emit('button-hit');
    }
    function scriptbuttonpressed() {
        if (stage >= 2) {
            myLayout.emit('script-button');
        }
    }
    function animatorbutton() {
        window.location.href = "animator.html";
    }
    function sketchbutton() {
        window.location.href = "sketch.html";
    }
    function createToolComponent(container, state) {
        let select_button = document.createElement("button");
        select_button.classList.add("ToolButton");
        select_button.innerHTML = '<img src = "icons/select.png">';
        container.getElement().append(select_button);
        let pan_button = document.createElement("button");
        pan_button.classList.add("ToolButton");
        pan_button.innerHTML = '<img src = "icons/hand.png">';
        //button.addEventListener("click", buttonpressed);
        container.getElement().append(pan_button);
        let move_button = document.createElement("button");
        move_button.innerHTML = '<img src="icons/movetool.png">';
        move_button.classList.add("ToolButton");
        //button.addEventListener("click", buttonpressed);
        container.getElement().append(move_button);
        let rotate_button = document.createElement("button");
        rotate_button.innerHTML = '<img src = "icons/rotate.png">';
        rotate_button.classList.add("ToolButton");
        rotate_button.addEventListener("click", rotatebuttonpressed);
        container.getElement().append(rotate_button);
        let scale_button = document.createElement("button");
        scale_button.innerHTML = '<img src = "icons/Scale_v2.png">';
        scale_button.classList.add("ToolButton");
        //button.addEventListener("click", buttonpressed);
        container.getElement().append(scale_button);
    }
    function createViewportComponent(container, state) {
        let image = document.createElement("img");
        image.addEventListener("click", selectbuttonpressed);
        image.src = "empty.png";
        container.getElement().append(image);
        myLayout.on('create-button', function () {
            image.classList.add("cube");
            image.src = "Cube.png";
        });
        myLayout.on('select-button', function () {
            image.classList.add("cube_selected");
            image.src = "Cube_selected.png";
        });
        myLayout.on('rotate-button', function () {
            image.classList.add("cube_gizmo");
            image.src = "Cube_gizmo2.png";
        });
        myLayout.on('hide-button', function () {
            image.classList.toggle("folded");
        });
    }
    function createInspectorComponent(container, state) {
        // let fieldset: HTMLFieldSetElement = document.createElement("fieldset");
        // let legend: HTMLLegendElement = document.createElement("legend");
        // legend.innerHTML = "Transform";
        // let toggleButton: HTMLButtonElement = document.createElement("button");
        // toggleButton.addEventListener("click", toggleFoldElement);
        // toggleButton.innerHTML = "v";
        // legend.appendChild(toggleButton);
        // fieldset.appendChild(legend);
        // legend.classList.add("unfoldable");
        let fieldset_transform = document.createElement("fieldset");
        let legend_transform = document.createElement("legend");
        legend_transform.innerHTML = "Transform";
        let toggleButton_transform = document.createElement("button");
        toggleButton_transform.addEventListener("click", toggleFoldElement);
        toggleButton_transform.innerHTML = "v";
        legend_transform.appendChild(toggleButton_transform);
        fieldset_transform.appendChild(legend_transform);
        legend_transform.classList.add("unfoldable");
        let container_position = document.createElement("div");
        container_position.classList.add("fieldset_content");
        let label_position = document.createElement("label");
        label_position.innerHTML = "Position";
        let position_label_x = document.createElement("label");
        position_label_x.innerHTML = "X";
        let position_input_x = document.createElement("input");
        container_position.append(label_position);
        container_position.append(position_label_x);
        container_position.append(position_input_x);
        let position_label_y = document.createElement("label");
        position_label_y.innerHTML = "Y";
        let position_input_y = document.createElement("input");
        container_position.append(position_label_y);
        container_position.append(position_input_y);
        let position_label_z = document.createElement("label");
        position_label_z.innerHTML = "Z";
        let position_input_z = document.createElement("input");
        container_position.append(position_label_z);
        container_position.append(position_input_z);
        fieldset_transform.append(container_position);
        let container_rotation = document.createElement("div");
        container_rotation.classList.add("fieldset_content");
        let label_rotation = document.createElement("label");
        label_rotation.innerHTML = "Rotation";
        let rotation_label_x = document.createElement("label");
        rotation_label_x.innerHTML = "X";
        let rotation_input_x = document.createElement("input");
        container_rotation.append(label_rotation);
        container_rotation.append(rotation_label_x);
        container_rotation.append(rotation_input_x);
        let rotation_label_y = document.createElement("label");
        rotation_label_y.innerHTML = "Y";
        let rotation_input_y = document.createElement("input");
        container_rotation.append(rotation_label_y);
        container_rotation.append(rotation_input_y);
        let rotation_label_z = document.createElement("label");
        rotation_label_z.innerHTML = "Z";
        let rotation_input_z = document.createElement("input");
        container_rotation.append(rotation_label_z);
        container_rotation.append(rotation_input_z);
        fieldset_transform.append(container_rotation);
        let container_scale = document.createElement("div");
        container_scale.classList.add("fieldset_content");
        let label_scale = document.createElement("label");
        label_scale.innerHTML = "Scale";
        let scale_label_x = document.createElement("label");
        scale_label_x.innerHTML = "X";
        let scale_input_x = document.createElement("input");
        container_scale.append(label_scale);
        container_scale.append(scale_label_x);
        container_scale.append(scale_input_x);
        let scale_label_y = document.createElement("label");
        scale_label_y.innerHTML = "Y";
        let scale_input_y = document.createElement("input");
        container_scale.append(scale_label_y);
        container_scale.append(scale_input_y);
        let scale_label_z = document.createElement("label");
        scale_label_z.innerHTML = "Z";
        let scale_input_z = document.createElement("input");
        container_scale.append(scale_label_z);
        container_scale.append(scale_input_z);
        fieldset_transform.append(container_scale);
        let fieldset_script = document.createElement("fieldset");
        let legend_script = document.createElement("legend");
        legend_script.innerHTML = "Script";
        let toggleButton_script = document.createElement("button");
        toggleButton_script.addEventListener("click", toggleFoldElement);
        toggleButton_script.innerHTML = "v";
        legend_script.appendChild(toggleButton_script);
        fieldset_script.appendChild(legend_script);
        legend_script.classList.add("unfoldable");
        let container_script = document.createElement("div");
        container_script.classList.add("fieldset_content");
        let label_script = document.createElement("label");
        label_script.innerHTML = "Script";
        let script_input = document.createElement("input");
        let script_add = document.createElement("button");
        script_add.innerHTML = "Add Script";
        script_add.classList.add("TextButton");
        script_add.addEventListener("click", scriptbuttonpressed);
        myLayout.on('script-button', function () {
            let scriptDiv = document.createElement("div");
            scriptDiv.innerHTML = "<a>new_script.ts</a>";
            container_script.append(scriptDiv);
        });
        container_script.append(label_script);
        container_script.append(script_input);
        container_script.append(script_add);
        fieldset_script.append(container_script);
        let fieldset_mesh = document.createElement("fieldset");
        let legend_mesh = document.createElement("legend");
        legend_mesh.innerHTML = "Mesh";
        let toggleButton_mesh = document.createElement("button");
        toggleButton_mesh.addEventListener("click", toggleFoldElement);
        toggleButton_mesh.innerHTML = "v";
        legend_mesh.appendChild(toggleButton_mesh);
        fieldset_mesh.appendChild(legend_mesh);
        legend_mesh.classList.add("unfoldable");
        let container_mesh = document.createElement("div");
        container_mesh.classList.add("fieldset_content");
        let label_mesh = document.createElement("label");
        label_mesh.innerHTML = "Mesh";
        let mesh_input = document.createElement("input");
        container_mesh.append(label_mesh);
        container_mesh.append(mesh_input);
        fieldset_mesh.append(container_mesh);
        let fieldset_material = document.createElement("fieldset");
        let legend_material = document.createElement("legend");
        legend_material.innerHTML = "material";
        let toggleButton_material = document.createElement("button");
        toggleButton_material.addEventListener("click", toggleFoldElement);
        toggleButton_material.innerHTML = "v";
        legend_material.appendChild(toggleButton_material);
        fieldset_material.appendChild(legend_material);
        legend_material.classList.add("unfoldable");
        let container_material = document.createElement("div");
        container_material.classList.add("fieldset_content");
        let label_material = document.createElement("label");
        label_material.innerHTML = "material";
        let material_input = document.createElement("input");
        container_material.append(label_material);
        container_material.append(material_input);
        // shader_select.innerHTML = "<option value='standard'>Standard Shader</option><option value='celshader'>CelShader</option>";
        let shader_select = document.createElement("select");
        let option_standard = document.createElement("option");
        option_standard.value = "standard";
        option_standard.text = "Standard Shader";
        let option_cel = document.createElement("option");
        option_cel.value = "celshader";
        option_cel.text = "CelShader";
        shader_select.options.add(option_standard);
        shader_select.options.add(option_cel);
        container_material.append(shader_select);
        fieldset_material.append(container_material);
        myLayout.on('select-button', function () {
            container.getElement().append(fieldset_transform);
            container.getElement().append(fieldset_script);
            container.getElement().append(fieldset_mesh);
            container.getElement().append(fieldset_material);
        });
    }
    function createPersistentComponent(container, state) {
        if (!typeof window.localStorage) {
            container.getElement().append('<h2 class="err">Your browser doesn\'t support localStorage.</h2>');
            return;
        }
        // Create the input
        let input = $('<input type="text" />');
        container.getElement().append('<h2>I\'ll be saved to localStorage</h2>', input);
        // Set the initial / saved state
        if (state.label) {
            input.val(state.label);
        }
        // Store state updates
        input.on('change', function () {
            container.setState({
                label: input.val()
            });
        });
        return container;
    }
    function createExplorerComponent(container, state) {
        let container_explorer = document.createElement('div');
        myLayout.on("create-button", function () {
            let hideButton = document.createElement("button");
            hideButton.classList.add("hide-button");
            hideButton.innerHTML = "<img src='eye.png'>";
            hideButton.addEventListener("click", hidebuttonpressed);
            hideButton.addEventListener("click", function () {
                hideButton.classList.toggle("hide-pressed");
                if (hideButton.classList.contains("hide-pressed")) {
                    hideButton.innerHTML = "<img src='eye_closed.png'>";
                }
                else {
                    hideButton.innerHTML = "<img src='eye.png'>";
                }
            });
            let label_cube = document.createElement("a");
            label_cube.innerHTML = "Box";
            container_explorer.append(hideButton);
            container_explorer.append(label_cube);
        });
        container.getElement().append(container_explorer);
    }
    function closeMenues(e) {
        let menu = document.getElementById("menu").firstChild;
        let children = menu.children;
        for (let child of children) {
            let innerChildren = child.children;
            for (let innerChild of innerChildren) {
                if (innerChild.classList.contains("show")) {
                    innerChild.classList.remove("show");
                }
            }
        }
        let target = e.target;
        console.log(target);
        if (target.classList.contains("dropbutton")) {
            let dropchildren = target.parentElement.children;
            for (let dropchild of dropchildren) {
                console.log(dropchild);
                if (dropchild.classList.contains("dropdown-content")) {
                    console.log("found you");
                    dropchild.classList.add("show");
                }
            }
        }
    }
    function toggleFoldElement(_event) {
        _event.preventDefault();
        if (_event.target != _event.currentTarget)
            return;
        let target = _event.target;
        let foldTarget = target.parentElement.parentElement;
        let foldToggle;
        //Toggle the folding behaviour of the Folding Target
        foldTarget.classList.contains("fieldset_folded") ? foldToggle = false : foldToggle = true;
        foldToggle == true ? foldTarget.classList.add("fieldset_folded") : foldTarget.classList.remove("fieldset_folded");
        foldToggle == true ? target.innerHTML = ">" : target.innerHTML = "v";
        let children = foldTarget.children;
        // for (let i = 0; i < children.length; i++) {
        for (let child of children) {
            // let child: HTMLElement = <HTMLElement>children[i];
            if (!child.classList.contains("unfoldable")) {
                foldToggle == true ? child.classList.add("folded") : child.classList.remove("folded");
            }
        }
    }
    window.addEventListener("click", closeMenues);
})(GoldenLayoutTest || (GoldenLayoutTest = {}));
//# sourceMappingURL=editor.js.map