// Camera in Cavalier Projection
/// <reference path="Camera.ts"/>

namespace FudgeCore {
    export class CameraCavalier extends Camera {

        private alpha: number = 45;

       
        constructor() {
            super();
            this.projection = PROJECTION.CAVALIER;
            this.transform = Matrix4x4.PROJECTION_CAVALIER(this.alpha);
        }
    }
}