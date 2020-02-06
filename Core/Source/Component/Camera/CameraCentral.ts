// Class to set camera to perspective mode
/**
 * @param _aspect The aspect ratio between width and height of projectionspace.(Default = canvas.clientWidth / canvas.ClientHeight)
 * @param _fieldOfView The field of view in Degrees. (Default = 45)
 * @param _direction The plane on which the fieldOfView-Angle is given 
 * 
 *
 */
/// <reference path="Camera.ts"/>

namespace FudgeCore {

    export class CameraCentral extends Camera {

        public fieldOfView: number = 45; // The camera's sensorangle.
        public aspectRatio: number = 1.0;
        public direction: FIELD_OF_VIEW = FIELD_OF_VIEW.DIAGONAL;
        public near: number = 1;
        public far: number = 2000;

        constructor() {
            super();
            this.projection = PROJECTION.CENTRAL;
            this.transform = Matrix4x4.PROJECTION_CENTRAL(this.aspectRatio, this.fieldOfView, this.near, this.far, this.direction);
           
        }

        public getAspect(): number {
            return this.aspectRatio;
        }

        public getFieldOfView(): number {
            return this.fieldOfView;
        }

        public getDirection(): FIELD_OF_VIEW {
            return this.direction;
        }

        public getProjectionRectangle(): Rectangle {

            let tanFov: number = Math.tan(Math.PI * this.fieldOfView / 360); // Half of the angle, to calculate dimension from the center -> right angle
            let tanHorizontal: number = 0;
            let tanVertical: number = 0;

            if (this.direction == FIELD_OF_VIEW.DIAGONAL) {
                let aspect: number = Math.sqrt(this.aspectRatio);
                tanHorizontal = tanFov * aspect;
                tanVertical = tanFov / aspect;
            }
            else if (this.direction == FIELD_OF_VIEW.VERTICAL) {
                tanVertical = tanFov;
                tanHorizontal = tanVertical * this.aspectRatio;
            }
            else {//FOV_DIRECTION.HORIZONTAL
                tanHorizontal = tanFov;
                tanVertical = tanHorizontal / this.aspectRatio;
            }

            return Rectangle.GET(0, 0, tanHorizontal * 2, tanVertical * 2);
        }

        //#region Transfer
        public serialize(): Serialization {
            let serialization: Serialization = {
                projection: this.projection,
                fieldOfView: this.fieldOfView,
                direction: this.direction,
                aspect: this.aspectRatio,
                pivot: this.pivot.serialize(),
                transform: super.transform,
                [super.constructor.name]: super.serialize() // TODO: Why?
            };
            return serialization;
        }
    }
}