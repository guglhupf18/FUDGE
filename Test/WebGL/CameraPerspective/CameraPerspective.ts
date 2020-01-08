namespace CameraPerspective {
    import ƒ = FudgeCore;

    window.addEventListener("load", hndLoad);

    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        ƒ.RenderManager.initialize();

        let viewport: ƒ.Viewport = new ƒ.Viewport();

        let baseNode: ƒ.Node = new ƒ.Node("base");

        let meshCube: ƒ.MeshCube = new ƒ.MeshCube();
        let mtrLightBlue: ƒ.Material = new ƒ.Material("LightBlue", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0.01, 0.9, 0.7, 1)));

        let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(meshCube);
        let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrLightBlue);
        let cmpTransform: ƒ.ComponentTransform = new ƒ.ComponentTransform();
        cmpTransform.local.translation = new ƒ.Vector3(1, 0, 0);

        let pyramid: ƒ.MeshPyramid = new ƒ.MeshPyramid();
        let cmpPyramid: ƒ.ComponentMesh = new ƒ.ComponentMesh(pyramid);
        
        let roof: ƒ.Node = new ƒ.Node("roof");
        roof.addComponent(cmpPyramid);
        roof.addComponent(cmpMaterial);
        let cmpTransform1: ƒ.ComponentTransform = new ƒ.ComponentTransform();

        cmpTransform1.local.translation = new ƒ.Vector3(-1, 0, 0);

        roof.addComponent(cmpTransform1);

        let basement: ƒ.Node = new ƒ.Node("house_basement");

        basement.addComponent(cmpMesh);
        basement.addComponent(cmpMaterial);
        basement.addComponent(cmpTransform);

        basement.appendChild(roof);
        
        /** 
         * Region Coordination Raster
         */

        let rasterBase: ƒ.Node = new ƒ.Node("rasterBase");
        let xLineNode: ƒ.Node = new ƒ.Node("xLineNode");
        let yLineNode: ƒ.Node = new ƒ.Node("yLineNode");
        let zLineNode: ƒ.Node = new ƒ.Node("zLineNode");

        let xLine: ƒ.MeshCube = new ƒ.MeshCube();
        let yLine: ƒ.MeshCube = new ƒ.MeshCube();
        let zLine: ƒ.MeshCube = new ƒ.MeshCube();

        let xLineCmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(xLine);
        let yLineCmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(yLine);
        let zLineCmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(zLine);
        
        let mtrWhite: ƒ.Material = new ƒ.Material("White", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.WHITE));

        let cmpMaterialWhite: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrWhite);

        xLineNode.addComponent(xLineCmpMesh);
        yLineNode.addComponent(yLineCmpMesh);
        zLineNode.addComponent(zLineCmpMesh);

        let cmpScale: ƒ.ComponentTransform = new ƒ.ComponentTransform();
        cmpScale.local.translation = new ƒ.Vector3 (0, 0, 0);
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
        let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();

        cmpCamera.setType(ƒ.CameraCabinett);

        
        cmpCamera.pivot.translate(new ƒ.Vector3(0, 0, 5));
       
        
        viewport.initialize("Viewport", baseNode, cmpCamera, canvas);
        ƒ.RenderManager.update();
        viewport.draw();
    }
}