// Camera in Cavalier Projection
/// <reference path="CameraOrthographic.ts"/>

namespace FudgeCore {
    export class CameraCavalier extends CameraOrthographic {

        private alpha: number = 45;        
       
        constructor() {
            super();
            this.projection = PROJECTION.CAVALIER;            
            this.transform = Matrix4x4.MULTIPLICATION(this.transform, Matrix4x4.PROJECTION_CAVALIER(this.alpha));          
        }
    }
}