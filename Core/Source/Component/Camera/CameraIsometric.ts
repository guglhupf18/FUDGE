// Camera in Cavalier Projection
/// <reference path="CameraOrthographic.ts"/>

namespace FudgeCore {
    export class CameraIsometric extends CameraOrthographic {
               
        constructor() {
            super();
            this.projection = PROJECTION.ISOMETRIC ;            
            this.transform = Matrix4x4.MULTIPLICATION(this.transform, Matrix4x4.PROJECTION_ISOMETRIC());          
        }
    }
}