// Camera in Cavalier Projection
/// <reference path="CameraOrthographic.ts"/>

namespace FudgeCore {
    export class CameraCabinett extends CameraOrthographic {

        private alpha: number = 65;

        constructor() {
            super();
            this.projection = PROJECTION.CABINET;                      
            this.transform = Matrix4x4.MULTIPLICATION(this.transform, Matrix4x4.PROJECTION_CABINET(this.alpha));
        }
    }
}