namespace CameraPerspective {
    import ƒ = FudgeCore;

    window.addEventListener("load", hndLoad);

    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera;

    let viewport: ƒ.Viewport;

    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        ƒ.RenderManager.initialize(true);

        // default camera setting is isometric
        if (cmpCamera.camera == null) {
            cmpCamera.setType(ƒ.CameraCentral);
            cmpCamera.pivot.translate(new ƒ.Vector3(1, 1, 10));
          //  cmpCamera.pivot.lookAt(new ƒ.Vector3());
            //cmpCamera.camera.pivot.lookAt(new ƒ.Vector3());
        }

        viewport = new ƒ.Viewport();

        /** 
        *  scene hierarchy
        */
        let baseNode: ƒ.Node = new ƒ.Node("basenode");


        baseNode.appendChild(createHouse());
        baseNode.appendChild(createGrid());

        baseNode.appendChild(createLight());

        viewport.initialize("Viewport", baseNode, cmpCamera, canvas);

        // Eventlistener  
        viewport.setFocus(true);
        viewport.activateKeyboardEvent(ƒ.EVENT_KEYBOARD.UP, true);
        viewport.addEventListener(ƒ.EVENT_KEYBOARD.UP, setPerspective);

       
        viewport.draw();
    }

    function createHouse(): ƒ.Node {
        let meshBasement: ƒ.MeshCube = new ƒ.MeshCube();
        let mtrLightBlue: ƒ.Material = new ƒ.Material("LightBlue", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1)));

        let cmpMeshBasement: ƒ.ComponentMesh = new ƒ.ComponentMesh(meshBasement);
        let cmpMaterialBasement: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrLightBlue);
        let cmpTransformBasement: ƒ.ComponentTransform = new ƒ.ComponentTransform();
        cmpTransformBasement.local.translation = new ƒ.Vector3(0, 0.5, 0);

        let basement: ƒ.Node = new ƒ.Node("basement");

        basement.addComponent(cmpMeshBasement);
        basement.addComponent(cmpMaterialBasement);
        basement.addComponent(cmpTransformBasement);

        let meshRoof: ƒ.MeshPyramid = new ƒ.MeshPyramid();
        let cmpMeshRoof: ƒ.ComponentMesh = new ƒ.ComponentMesh(meshRoof);
        let cmpMaterialRoof: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrLightBlue);
        let cmpTransformRoof: ƒ.ComponentTransform = new ƒ.ComponentTransform();
        cmpTransformRoof.local.translation = new ƒ.Vector3(0, 0.5, 0);

        let roof: ƒ.Node = new ƒ.Node("roof");
        roof.addComponent(cmpMeshRoof);
        roof.addComponent(cmpMaterialRoof);
        roof.addComponent(cmpTransformRoof);

        basement.appendChild(roof);

        return basement;
    }

    function createGrid(): ƒ.Node {

        // Quads statt Cubes
        let grid: ƒ.Node = new ƒ.Node("grid");
        let xAxisNode: ƒ.Node = new ƒ.Node("xAxisNode");
        let zAxisNode: ƒ.Node = new ƒ.Node("zAxisNode");
        let gridSize: number = 30;
        let offset: number = 0.5;
        /**
         * LightShader (flatshader), ambientlight
         */
        // tslint:disable-next-line: typedef
        for (let i = - gridSize; i <= gridSize; i++) {
            let xAxis: ƒ.Node = new ƒ.Node("x" + i.toString());
            let zAxis: ƒ.Node = new ƒ.Node("z" + i.toString());

            let mtrWhite: ƒ.Material = new ƒ.Material("White", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0.95, 0.9, 0.9)));

            let cmpMaterialWhiteX: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrWhite);
            let mesh: ƒ.MeshQuad = new ƒ.MeshQuad();
            let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
            let cmpTransformX: ƒ.ComponentTransform = new ƒ.ComponentTransform();
            cmpTransformX.local.translation = new ƒ.Vector3(0, 0, i - offset);
            cmpTransformX.local.scale(new ƒ.Vector3(1, 0.05, 0));
            cmpTransformX.local.scaleX(gridSize * 2);

            xAxis.addComponent(cmpMesh);
            xAxis.addComponent(cmpMaterialWhiteX);
            xAxis.addComponent(cmpTransformX);

            xAxisNode.appendChild(xAxis);

            let cmpMaterialWhiteZ: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrWhite);
            let meshZ: ƒ.MeshQuad = new ƒ.MeshQuad();
            let cmpMeshZ: ƒ.ComponentMesh = new ƒ.ComponentMesh(meshZ);
            let cmpTransformZ: ƒ.ComponentTransform = new ƒ.ComponentTransform();
            cmpTransformZ.local.rotateX(90);

            cmpTransformZ.local.translation = new ƒ.Vector3(-i - offset, 0, 0);
            cmpTransformZ.local.scale(new ƒ.Vector3(0.05, 1, 0));
            cmpTransformZ.local.scaleY(gridSize * 2);

            zAxis.addComponent(cmpMeshZ);
            zAxis.addComponent(cmpMaterialWhiteZ);
            zAxis.addComponent(cmpTransformZ);

            zAxisNode.appendChild(zAxis);

        }

        grid.appendChild(xAxisNode);
        grid.appendChild(zAxisNode);

        return grid;
    }

    function setPerspective(_event: ƒ.EventKeyboard): void {
        
        switch (_event.code) {
            case ƒ.KEYBOARD_CODE.ONE:
                console.log("central");
                cmpCamera.setType(ƒ.CameraCentral);
                
                break;
            case ƒ.KEYBOARD_CODE.TWO:
                console.log("ortho");
                cmpCamera.setType(ƒ.CameraOrthographic);

                break;
            case ƒ.KEYBOARD_CODE.THREE:
                console.log("cabinet");
                cmpCamera.setType(ƒ.CameraCabinet);

                break;
            case ƒ.KEYBOARD_CODE.FOUR:
                console.log("cavalier");
                cmpCamera.setType(ƒ.CameraCavalier);
                break;
            case ƒ.KEYBOARD_CODE.FIVE:
                console.log("isometric");
                cmpCamera.setType(ƒ.CameraIsometric);
                break;
            default:
                console.log("Invalid Input");
        }
        viewport.draw();
    }

    function createLight(): ƒ.Node {
        let node: ƒ.Node = new ƒ.Node("light");
        let light: ƒ.LightAmbient = new ƒ.LightAmbient();
        let lightColor: ƒ.Color = new ƒ.Color(1, 0.4, 0.5, 1);       
        light.color = lightColor;

        let cmpLight: ƒ.ComponentLight = new ƒ.ComponentLight();
        cmpLight.light = light;
        let cmpTransform: ƒ.ComponentTransform = new ƒ.ComponentTransform();
        cmpTransform.local.translation = new ƒ.Vector3(0, 5, 0);

        let cmpLightAmbient: ƒ.ComponentLight = new ƒ.ComponentLight (new ƒ.LightDirectional(new ƒ.Color(1, 1, 1, 1)));
        cmpLightAmbient.pivot.lookAt(new  ƒ.Vector3(1, -1, 0));

        node.addComponent(cmpLightAmbient);

        return node;
    }
}