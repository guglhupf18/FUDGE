namespace MiniScene {
    import ƒ = Fudge;

    window.addEventListener("DOMContentLoaded", init);

    let node: ƒ.Node;
    let camera: ƒ.Node;
    let viewPort: ƒ.Viewport;

    export function init(): void {
        ƒ.GLUtil.initializeContext();
        let shdBasic: ƒ.ShaderBasic = new ƒ.ShaderBasic();
        let mtrRed: ƒ.Material = new ƒ.Material("Red", new ƒ.Vector3(255, 0, 0), shdBasic);

        let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh();
        cmpMesh.initialize(new ƒ.MeshCube(50, 50, 50).Positions);
        let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial();
        cmpMaterial.initialize(mtrRed);
        let cmpTransform: ƒ.ComponentTransform = new ƒ.ComponentTransform();
        node = new ƒ.Node("Node");
        node.addComponent(cmpMesh);
        node.addComponent(cmpMaterial);
        node.addComponent(cmpTransform);
        cmpTransform.scaleX(2);
        
        camera = new ƒ.Node("Camera");
        cmpTransform = new ƒ.ComponentTransform();
        cmpTransform.translate(100, 100, 500);
        cmpTransform.lookAt(node.transform.position);
        camera.addComponent(cmpTransform);
        let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        camera.addComponent(cmpCamera);

        viewPort = new ƒ.Viewport("MiniScene", node, cmpCamera);
        viewPort.drawScene();
        viewPort.showSceneGraph();

        console.group("Original");
        console.log(cmpTransform);
        console.groupEnd();
    
        console.group("Serialized");
        let serializer: ƒ.Serializer = new ƒ.Serializer();
        let serialization: ƒ.Serialization = serializer.serialize(cmpTransform);
        console.log(serialization);
        console.groupEnd();

        console.group("Stringified");
        let json: string = JSON.stringify(serialization);
        console.log(json);
        console.groupEnd();

        console.group("Parsed");
        serialization = JSON.parse(json);
        console.log(serialization);
        console.groupEnd();

        console.group("Reconstructed");
        let reconstruction: ƒ.Serializable = serializer.deserialize(serialization);
        console.log(reconstruction);
        console.groupEnd();
    }
}