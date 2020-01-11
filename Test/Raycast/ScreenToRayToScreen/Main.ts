namespace ScreenToRayToScreen {
  import ƒ = FudgeCore;
  window.addEventListener("load", init);

  export let root: ƒ.Node = new ƒ.Node("Root");
  export let args: URLSearchParams;
  export let camera: CameraOrbit;
  let viewport: ƒ.Viewport;
  let speedCameraRotation: number = 0.2;
  let speedCameraTranslation: number = 0.02;
  let labelDOM: HTMLSpanElement;
  let crc2: CanvasRenderingContext2D;

  ƒ.Debug.setFilter(ƒ.DebugConsole, ƒ.DEBUG_FILTER.ALL - ƒ.DEBUG_FILTER.CLEAR);
  ƒ.Debug.setFilter(ƒ.DebugTextArea, ƒ.DEBUG_FILTER.ALL);

  function init(): void {
    args = new URLSearchParams(location.search);
    const canvas: HTMLCanvasElement = document.querySelector("canvas");
    ƒ.Debug.log("Canvas", canvas);
    crc2 = canvas.getContext("2d");

    ƒ.RenderManager.initialize(true);

    // enable unlimited mouse-movement (user needs to click on canvas first)
    canvas.addEventListener("click", canvas.requestPointerLock);

    labelDOM = document.createElement("span");
    labelDOM.appendChild(ƒ.DebugTextArea.textArea);
    document.body.appendChild(labelDOM);


    createScene();

    // setup viewport
    viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", root, camera.cmpCamera, canvas);
    ƒ.Debug.log("Viewport", viewport);

    // setup event handling
    viewport.activatePointerEvent(ƒ.EVENT_POINTER.MOVE, true);
    viewport.activateWheelEvent(ƒ.EVENT_WHEEL.WHEEL, true);
    viewport.addEventListener(ƒ.EVENT_POINTER.MOVE, hndPointerMove);
    viewport.addEventListener(ƒ.EVENT_WHEEL.WHEEL, hndWheelMove);
    // window.addEventListener("keydown", hndKeyDown);



    updateDisplay();
    ƒ.Debug.log("Game", root);
  }

  function hndPointerMove(_event: ƒ.EventPointer): void {
    if (document.pointerLockElement) {
      camera.rotateY(_event.movementX * speedCameraRotation);
      camera.rotateX(_event.movementY * speedCameraRotation);
      updateDisplay();
      return;
    }

    let posProjection: ƒ.Vector2 = viewport.pointClientToProjection(new ƒ.Vector2(_event.pointerX, _event.pointerY));

    ƒ.Debug.clear();

    let ray: ƒ.Ray = new ƒ.Ray(new ƒ.Vector3(posProjection.x, posProjection.y, -1));
    console.group("original");
    ƒ.Debug.log("origin", ray.origin.toString());
    ƒ.Debug.log("direction", ray.direction.toString());
    console.groupEnd();

    ray.direction.scale(camera.getDistance());
    ray.origin.transform(camera.cmpCamera.pivot);
    ray.origin.transform(camera.cmpCamera.getContainer().mtxWorld);
    ray.direction.transform(camera.cmpCamera.pivot, false);
    ray.direction.transform(camera.cmpCamera.getContainer().mtxWorld, false);
    console.group("transformed");
    ƒ.Debug.log("origin", ray.origin.toString());
    ƒ.Debug.log("direction", ray.direction.toString());
    console.groupEnd();

    let rayEnd: ƒ.Vector3 = ƒ.Vector3.SUM(ray.origin, ray.direction);
    let projection: ƒ.Vector3 = camera.cmpCamera.camera.transform.translation;
    // let screen: ƒ.Vector2 = ƒ.RenderManager.rectClip.pointToRect(projection.toVector2(), viewport.getCanvasRectangle());
    let screen: ƒ.Vector2 = viewport.pointClipToClient(projection.toVector2());
    console.group("end");
    ƒ.Debug.log("End", rayEnd.toString());
    ƒ.Debug.log("Projected", projection.toString());
    ƒ.Debug.log("Screen", screen.toString());

    console.groupEnd();

    let mtxCube: ƒ.Matrix4x4 = root.getChildrenByName("Cube")[0].cmpTransform.local;
    mtxCube.translation = rayEnd;
    updateDisplay();

  }

  function hndWheelMove(_event: WheelEvent): void {
    camera.translate(_event.deltaY * speedCameraTranslation);
    updateDisplay();
  }


  function createScene(): void {
    // set lights
    let cmpLight: ƒ.ComponentLight = new ƒ.ComponentLight(new ƒ.LightDirectional(ƒ.Color.CSS("WHITE")));
    cmpLight.pivot.lookAt(new ƒ.Vector3(0.5, 1, 0.8));
    // game.addComponent(cmpLight);
    let cmpLightAmbient: ƒ.ComponentLight = new ƒ.ComponentLight(new ƒ.LightAmbient(ƒ.Color.CSS("DARK_GREY")));
    root.addComponent(cmpLightAmbient);

    // setup orbiting camera
    camera = new CameraOrbit(75);
    root.appendChild(camera);
    // camera.setRotationX(-20);
    camera.setRotationY(90);
    camera.cmpCamera.getContainer().addComponent(cmpLight);

    let cube: ƒ.Node = new ƒ.Node("Cube");
    let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(new ƒ.MeshCube());
    cube.addComponent(cmpMesh);

    let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(
      new ƒ.Material("Red", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("RED")))
    );
    cube.addComponent(cmpMaterial);

    let cmpTransform: ƒ.ComponentTransform = new ƒ.ComponentTransform();
    cube.addComponent(cmpTransform);

    root.appendChild(cube);
  }


  export function updateDisplay(): void {
    viewport.draw();
    drawLabels();
  }

  function drawLabels(): void {
    let mtxCube: ƒ.Matrix4x4 = root.getChildrenByName("Cube")[0].mtxWorld;
    let projection: ƒ.Vector3 = camera.cmpCamera.camera.transform.translation;
    let posCanvas: ƒ.Vector2 = viewport.pointClipToCanvas(projection.toVector2());
    let posClient: ƒ.Vector2 = viewport.pointClipToClient(projection.toVector2());
    let posScreen: ƒ.Vector2 = viewport.pointClientToScreen(posClient);

    ƒ.Debug.group("Cube");
    ƒ.Debug.clear();
    ƒ.Debug.info("End", mtxCube.translation.toString());
    ƒ.Debug.log("Projected", projection.toString());
    ƒ.Debug.warn("Canvas", posCanvas.toString());
    ƒ.Debug.error("Client", posClient.toString());
    ƒ.Debug.log("Screen", posScreen.toString());
    ƒ.Debug.groupEnd();

    labelDOM.style.left = posScreen.x + 30 + "px";
    labelDOM.style.top = posScreen.y + 30 + "px";

    crc2.beginPath();
    crc2.arc(posCanvas.x, posCanvas.y, 2, 0, 2 * Math.PI);
    crc2.moveTo(posCanvas.x, posCanvas.y);
    posCanvas.subtract(ƒ.Vector2.ONE(50));
    crc2.lineTo(posCanvas.x, posCanvas.y);
    crc2.rect(posCanvas.x, posCanvas.y, -220, -100);
    let text: string[] = ƒ.DebugTextArea.textArea.textContent.split("\n");
    let posLineY: number = 0;
    for (let line of text)
      crc2.fillText(line, posCanvas.x - 210, posCanvas.y - 96 + (posLineY += 16), 200);
    crc2.stroke();
  }
}