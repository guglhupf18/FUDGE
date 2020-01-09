var Minimal;
(function (Minimal) {
    var ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        ƒ.RenderManager.initialize();
        let viewport = new ƒ.Viewport();
        let mesh = new ƒ.MeshQuad();
        let mtrSolidWhite = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("WHITE")));
        let cmpMesh = new ƒ.ComponentMesh(mesh);
        let cmpMaterial = new ƒ.ComponentMaterial(mtrSolidWhite);
        let node = new ƒ.Node("Quad");
        node.addComponent(cmpMesh);
        node.addComponent(cmpMaterial);
        let mesh2 = new ƒ.MeshCube();
        let mtrSolidWhite2 = new ƒ.Material("SolidBlue", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.BLUE));
        let cmpMesh2 = new ƒ.ComponentMesh(mesh2);
        let cmpMaterial2 = new ƒ.ComponentMaterial(mtrSolidWhite2);
        let node2 = new ƒ.Node("Quad2");
        let cmpTransform = new ƒ.ComponentTransform();
        cmpTransform.local.translation = new ƒ.Vector3(1, 1, 1);
        cmpTransform.local.rotate(new ƒ.Vector3(0, 45, 0));
        node2.addComponent(cmpMesh2);
        node2.addComponent(cmpMaterial2);
        node2.addComponent(cmpTransform);
        let plane = new ƒ.MeshCube();
        let mtrCyan = new ƒ.Material("White", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CYAN));
        let cmpMesh3 = new ƒ.ComponentMesh(plane);
        let cmpMaterial3 = new ƒ.ComponentMaterial(mtrCyan);
        let node3 = new ƒ.Node("Plane");
        let cmpTransform1 = new ƒ.ComponentTransform();
        cmpTransform1.local.scale(new ƒ.Vector3(5, 0.1, 5));
        node3.addComponent(cmpMesh3);
        node3.addComponent(cmpMaterial3);
        node3.addComponent(cmpTransform1);
        let baseNode = new ƒ.Node("Base");
        baseNode.appendChild(node);
        baseNode.appendChild(node2);
        baseNode.appendChild(node3);
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.setType(ƒ.CameraIsometric);
        cmpCamera.pivot.translate(new ƒ.Vector3(0, 0, 5));
        viewport.initialize("Viewport", baseNode, cmpCamera, canvas);
        ƒ.RenderManager.update();
        viewport.draw();
    }
})(Minimal || (Minimal = {}));
//# sourceMappingURL=Main.js.map