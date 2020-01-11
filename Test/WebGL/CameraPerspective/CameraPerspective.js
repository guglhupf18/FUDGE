var CameraPerspective;
(function (CameraPerspective) {
    var ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    let cmpCamera = new ƒ.ComponentCamera;
    let viewport;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        ƒ.RenderManager.initialize(true);
        // default camera setting is isometric
        if (cmpCamera.camera == null) {
            cmpCamera.setType(ƒ.CameraIsometric);
            //    cmpCamera.pivot.translation = new ƒ.Vector3(0, 6, 5);
        }
        viewport = new ƒ.Viewport();
        /**
        *  scene hierarchy
        */
        let baseNode = new ƒ.Node("basenode");
        baseNode.appendChild(createHouse());
        baseNode.appendChild(createGrid());
        viewport.initialize("Viewport", baseNode, cmpCamera, canvas);
        // Eventlistener  
        viewport.setFocus(true);
        viewport.activateKeyboardEvent("\u0192keyup" /* UP */, true);
        viewport.addEventListener("\u0192keyup" /* UP */, setPerspective);
        viewport.draw();
    }
    function createHouse() {
        let meshBasement = new ƒ.MeshCube();
        let mtrLightBlue = new ƒ.Material("LightBlue", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0.1, 0.9, 1, 1)));
        let cmpMeshBasement = new ƒ.ComponentMesh(meshBasement);
        let cmpMaterialBasement = new ƒ.ComponentMaterial(mtrLightBlue);
        let cmpTransformBasement = new ƒ.ComponentTransform();
        cmpTransformBasement.local.translation = new ƒ.Vector3(0, 0.5, 0);
        let basement = new ƒ.Node("basement");
        basement.addComponent(cmpMeshBasement);
        basement.addComponent(cmpMaterialBasement);
        basement.addComponent(cmpTransformBasement);
        let meshRoof = new ƒ.MeshPyramid();
        let cmpMeshRoof = new ƒ.ComponentMesh(meshRoof);
        let cmpMaterialRoof = new ƒ.ComponentMaterial(mtrLightBlue);
        let cmpTransformRoof = new ƒ.ComponentTransform();
        cmpTransformRoof.local.translation = new ƒ.Vector3(0, 0.5, 0);
        let roof = new ƒ.Node("roof");
        roof.addComponent(cmpMeshRoof);
        roof.addComponent(cmpMaterialRoof);
        roof.addComponent(cmpTransformRoof);
        basement.appendChild(roof);
        return basement;
    }
    function createGrid() {
        // Quads statt Cubes
        let grid = new ƒ.Node("grid");
        let xAxisNode = new ƒ.Node("xAxisNode");
        let zAxisNode = new ƒ.Node("zAxisNode");
        let gridSize = 30;
        let offset = 0.5;
        /**
         * LightShader (flatshader), ambientlight
         */
        // tslint:disable-next-line: typedef
        for (let i = -gridSize; i <= gridSize; i++) {
            let xAxis = new ƒ.Node("x" + i.toString());
            let zAxis = new ƒ.Node("z" + i.toString());
            let mtrWhite = new ƒ.Material("White", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0.95, 0.7, 0.8)));
            let cmpMaterialWhiteX = new ƒ.ComponentMaterial(mtrWhite);
            let mesh = new ƒ.MeshQuad();
            let cmpMesh = new ƒ.ComponentMesh(mesh);
            let cmpTransformX = new ƒ.ComponentTransform();
            cmpTransformX.local.translation = new ƒ.Vector3(0, 0, i - offset);
            cmpTransformX.local.scale(new ƒ.Vector3(1, 0.05, 0));
            cmpTransformX.local.scaleX(gridSize * 2);
            xAxis.addComponent(cmpMesh);
            xAxis.addComponent(cmpMaterialWhiteX);
            xAxis.addComponent(cmpTransformX);
            xAxisNode.appendChild(xAxis);
            let cmpMaterialWhiteZ = new ƒ.ComponentMaterial(mtrWhite);
            let meshZ = new ƒ.MeshQuad();
            let cmpMeshZ = new ƒ.ComponentMesh(meshZ);
            let cmpTransformZ = new ƒ.ComponentTransform();
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
    function setPerspective(_event) {
        switch (_event.code) {
            case ƒ.KEYBOARD_CODE.ONE:
                console.log("central");
                cmpCamera.setType(ƒ.CameraCentral);
                cmpCamera.pivot.translation = new ƒ.Vector3(0, 0, 5);
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
})(CameraPerspective || (CameraPerspective = {}));
//# sourceMappingURL=CameraPerspective.js.map