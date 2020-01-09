namespace CameraPerspective {
    import ƒ = FudgeCore;

    window.addEventListener("load", hndLoad);
    
    window.addEventListener(ƒ.KEYBOARD_CODE.SPACE, setPerspective);


        
    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera;

    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        ƒ.RenderManager.initialize();

        let viewport: ƒ.Viewport = new ƒ.Viewport();

        /** 
        * region hierarchy
        */

        let baseNode: ƒ.Node = new ƒ.Node("basenode");
        baseNode.appendChild(createGrid());
        baseNode.appendChild(createHouse());
        // Eventlistener  


        cmpCamera.setType(ƒ.CameraIsometric);

        viewport.initialize("Viewport", baseNode, cmpCamera, canvas);
        ƒ.RenderManager.update();
        viewport.draw();
    }

    function createHouse(): ƒ.Node {
        let meshCube: ƒ.MeshCube = new ƒ.MeshCube();
        let mtrLightBlue: ƒ.Material = new ƒ.Material("LightBlue", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0.01, 0.9, 0.7, 1)));

        let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(meshCube);
        let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrLightBlue);
        let cmpTransform: ƒ.ComponentTransform = new ƒ.ComponentTransform();
        cmpTransform.local.translation = new ƒ.Vector3(0, 0, 0);

        let basement: ƒ.Node = new ƒ.Node("basement");

        basement.addComponent(cmpMesh);
        basement.addComponent(cmpMaterial);
        basement.addComponent(cmpTransform);
        return basement;
    }

    function createGrid(): ƒ.Node {
        let grid: ƒ.Node = new ƒ.Node("grid");
        let xAxisNode: ƒ.Node = new ƒ.Node("xAxisNode");
        let zAxisNode: ƒ.Node = new ƒ.Node("zAxisNode");
        let gridSize: number = 3;

        let mtrWhite: ƒ.Material = new ƒ.Material("White", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.WHITE));
        let cmpMaterialWhite: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrWhite);

        // tslint:disable-next-line: typedef
        for (let i = 0; i <= gridSize; i++) {
            let xAxis: ƒ.Node = new ƒ.Node("x" + i.toString());
            let zAxis: ƒ.Node = new ƒ.Node("z" + i.toString());

            let mesh: ƒ.MeshCube = new ƒ.MeshCube();
            let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);

            let cmpTransformX: ƒ.ComponentTransform = new ƒ.ComponentTransform();
            cmpTransformX.local.translation = new ƒ.Vector3(0, 0, i);
            cmpTransformX.local.scale(new ƒ.Vector3(1, 0.01, 0.1));
            cmpTransformX.local.scaleX(30);

            let cmpTransformZ: ƒ.ComponentTransform = new ƒ.ComponentTransform();
            cmpTransformZ.local.translation = new ƒ.Vector3(i, 0, 0);
            cmpTransformZ.local.scale(new ƒ.Vector3(0.01, 0.01, 1));
            cmpTransformZ.local.scaleZ(30);

            xAxis.addComponent(cmpMesh);
            xAxis.addComponent(cmpMaterialWhite);
            xAxis.addComponent(cmpTransformX);

            xAxisNode.appendChild(xAxis);

            zAxis.addComponent(cmpMesh);
            zAxis.addComponent(cmpMaterialWhite);
            zAxis.addComponent(cmpTransformZ);

            zAxisNode.appendChild(zAxis);

        }
        console.log(xAxisNode);

        grid.appendChild(xAxisNode);
        grid.appendChild(zAxisNode);

        return grid;
    }

    function setPerspective(_event: ƒ.KeyboardEventƒ): void {
        console.log(_event);
        switch (_event.code) {
            case ƒ.KEYBOARD_CODE.SPACE:
                console.log("Pressed SPACE");
                break;
            default:
                console.log("Invalid Input");
        }
    }
    function test(event: ƒ.KeyboardEventƒ): void {
        console.log("test"); 
    }
}