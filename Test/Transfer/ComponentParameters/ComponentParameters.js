var ComponentParameters;
(function (ComponentParameters) {
    var ƒ = FudgeCore;
    window.addEventListener("DOMContentLoaded", init);
    function init() {
        let img = document.querySelector("img");
        let txtImage = new ƒ.TextureImage();
        txtImage.image = img;
        let coatTextured = new ƒ.CoatTextured();
        coatTextured.texture = txtImage;
        let cmpMaterial = new ƒ.ComponentMaterial(new ƒ.Material("Material", ƒ.ShaderTexture, coatTextured));
        let quad = new ƒ.Node("Quad");
        quad.addComponent(new ƒ.ComponentMesh(new ƒ.MeshQuad()));
        quad.addComponent(cmpMaterial);
        ƒ.RenderManager.initialize();
        ƒ.RenderManager.update();
        let viewport = new ƒ.Viewport();
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(2);
        cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
        viewport.initialize("Viewport", quad, cmpCamera, document.querySelector("canvas"));
        viewport.draw();
        let mutator = cmpMaterial.getMutatorForUserInterface();
        ƒ.Debug.log(mutator);
        mutator = cmpMaterial.mutatorCoat;
        ƒ.Debug.log(mutator);
        ƒ.Loop.start();
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, (_event) => {
            mutator.rotation = mutator.rotation + 0.1;
            mutator.translation["x"] += 0.01;
            let s = 1.5 + Math.sin(mutator.translation["x"]);
            mutator.scaling = { x: s, y: s };
            coatTextured.mutate(mutator);
            viewport.draw();
        });
    }
})(ComponentParameters || (ComponentParameters = {}));
//# sourceMappingURL=ComponentParameters.js.map