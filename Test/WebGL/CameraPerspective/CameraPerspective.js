var CameraPerspective;
(function (CameraPerspective) {
    var ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        ƒ.RenderManager.initialize();
        let viewport = new ƒ.Viewport();
        let baseNode = new ƒ.Node("base");
        let meshCube = new ƒ.MeshCube();
        let mtrLightBlue = new ƒ.Material("LightBlue", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0.01, 0.9, 0.7, 1)));
        let cmpMesh = new ƒ.ComponentMesh(meshCube);
        let cmpMaterial = new ƒ.ComponentMaterial(mtrLightBlue);
        let cmpTransform = new ƒ.ComponentTransform();
        cmpTransform.local.translation = new ƒ.Vector3(1, 0, 0);
        let pyramid = new ƒ.MeshPyramid();
        let cmpPyramid = new ƒ.ComponentMesh(pyramid);
        let roof = new ƒ.Node("roof");
        roof.addComponent(cmpPyramid);
        roof.addComponent(cmpMaterial);
        let cmpTransform1 = new ƒ.ComponentTransform();
        cmpTransform1.local.translation = new ƒ.Vector3(-1, 0, 0);
        roof.addComponent(cmpTransform1);
        let basement = new ƒ.Node("house_basement");
        basement.addComponent(cmpMesh);
        basement.addComponent(cmpMaterial);
        basement.addComponent(cmpTransform);
        basement.appendChild(roof);
        /**
         * Region Coordination Raster
         */
        let rasterBase = new ƒ.Node("rasterBase");
        let xLineNode = new ƒ.Node("xLineNode");
        let yLineNode = new ƒ.Node("yLineNode");
        let zLineNode = new ƒ.Node("zLineNode");
        let xLine = new ƒ.MeshCube();
        let yLine = new ƒ.MeshCube();
        let zLine = new ƒ.MeshCube();
        let xLineCmpMesh = new ƒ.ComponentMesh(xLine);
        let yLineCmpMesh = new ƒ.ComponentMesh(yLine);
        let zLineCmpMesh = new ƒ.ComponentMesh(zLine);
        let mtrWhite = new ƒ.Material("White", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.WHITE));
        let cmpMaterialWhite = new ƒ.ComponentMaterial(mtrWhite);
        xLineNode.addComponent(xLineCmpMesh);
        yLineNode.addComponent(yLineCmpMesh);
        zLineNode.addComponent(zLineCmpMesh);
        let cmpScale = new ƒ.ComponentTransform();
        cmpScale.local.translation = new ƒ.Vector3(0, 0, 0);
        cmpScale.local.scale(new ƒ.Vector3(1, 0, 0));
        cmpScale.local.scaleX(20);
        xLineNode.addComponent(cmpScale);
        xLineNode.addComponent(cmpMaterialWhite);
        rasterBase.appendChild(xLineNode);
        /*
            let meshPyramid: ƒ.MeshPyramid = new ƒ.MeshPyramid();
          
            let cmpMeshRoof: ƒ.ComponentMesh = new ƒ.ComponentMesh(meshPyramid);
            let roof: ƒ.Node = new ƒ.Node("house_roof");
            cmpTransform.local.translation = new ƒ.Vector3(0, 0.5, 0);
            roof.addComponent(cmpMeshRoof);
            roof.addComponent(cmpMaterial);
            roof.addComponent(cmpTransform);
    */
        //  basement.appendChild(roof);
        // console.log(basement);
        baseNode.appendChild(basement);
        baseNode.appendChild(roof);
        baseNode.appendChild(rasterBase);
        console.log(baseNode);
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.setType(ƒ.CameraCabinett);
        cmpCamera.pivot.translate(new ƒ.Vector3(0, 0, 5));
        viewport.initialize("Viewport", baseNode, cmpCamera, canvas);
        ƒ.RenderManager.update();
        viewport.draw();
    }
})(CameraPerspective || (CameraPerspective = {}));
//# sourceMappingURL=CameraPerspective.js.map