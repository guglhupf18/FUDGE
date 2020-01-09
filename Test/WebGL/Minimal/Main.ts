namespace Minimal {
    import ƒ = FudgeCore;

    window.addEventListener("load", hndLoad);

    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        ƒ.RenderManager.initialize();

        let viewport: ƒ.Viewport = new ƒ.Viewport();

        let mesh: ƒ.MeshCube = new ƒ.MeshCube();
        let mtrSolidWhite: ƒ.Material = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.WHITE));

        let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
        let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrSolidWhite);
        let node: ƒ.Node = new ƒ.Node("Quad");
        node.addComponent(cmpMesh);
        node.addComponent(cmpMaterial);

        let mesh2: ƒ.MeshCube = new ƒ.MeshCube();
        let mtrSolidWhite2: ƒ.Material = new ƒ.Material("SolidBlue", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.BLUE));

        let cmpMesh2: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh2);
        let cmpMaterial2: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrSolidWhite2);
        let node2: ƒ.Node = new ƒ.Node("Quad2");
        let cmpTransform: ƒ.ComponentTransform = new ƒ.ComponentTransform();
        cmpTransform.local.translation = new ƒ.Vector3(1, 1, 1); 
        cmpTransform.local.rotate(new ƒ.Vector3(0, 45, 0));

        node2.addComponent(cmpMesh2);
        node2.addComponent(cmpMaterial2);
        node2.addComponent(cmpTransform);


        let plane: ƒ.MeshCube = new ƒ.MeshCube();
        let mtrCyan: ƒ.Material = new ƒ.Material("White", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CYAN));

        let cmpMesh3: ƒ.ComponentMesh = new ƒ.ComponentMesh(plane);
        let cmpMaterial3: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrCyan);
        let node3: ƒ.Node = new ƒ.Node("Plane");
        let cmpTransform1: ƒ.ComponentTransform = new ƒ.ComponentTransform();
        cmpTransform1.local.scale(new ƒ.Vector3(5, 0.1, 5));

        node3.addComponent(cmpMesh3);
        node3.addComponent(cmpMaterial3);
        node3.addComponent(cmpTransform1);

        let baseNode: ƒ.Node = new ƒ.Node("Base");
        baseNode.appendChild(node);
        baseNode.appendChild(node2);
        baseNode.appendChild(node3);
        let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();

        cmpCamera.setType(ƒ.CameraIsometric);


        
        cmpCamera.pivot.translate(new ƒ.Vector3(0, 0, 5));
       
        
        viewport.initialize("Viewport", baseNode, cmpCamera, canvas);
        ƒ.RenderManager.update();
        viewport.draw();
    }
}