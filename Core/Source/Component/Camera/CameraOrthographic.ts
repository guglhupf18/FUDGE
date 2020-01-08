
/// <reference path="Camera.ts"/>


namespace FudgeCore {
    // Class to set camera to orthographic projection
    /**
     **
     * Set the camera to orthographic projection. The origin is in the top left corner of the canvas.
     * @param _left The positionvalue of the projectionspace's left border. (Default = 0)
     * @param _right The positionvalue of the projectionspace's right border. (Default = canvas.clientWidth)
     * @param _bottom The positionvalue of the projectionspace's bottom border.(Default = canvas.clientHeight)
     * @param _top The positionvalue of the projectionspace's top border.(Default = 0)
     */
    export class CameraOrthographic extends Camera {

        private left: number = -10;
        private right: number = 10;
        private bottom: number = -10;
        private top: number =  10;
        private near: number = -10;
        private far: number = 10;

        constructor() {
            super();
            
            this.projection = PROJECTION.ORTHOGRAPHIC;         
            this.transform = Matrix4x4.PROJECTION_ORTHOGRAPHIC(this.left, this.right, this.bottom, this.top, this.near, this.far);
        }

        public setProjectionBorder(leftBorder: number, topBorder: number, nearClippingPlane: number, farClippingPlane: number): void {
            this.left = leftBorder;
            this.top = topBorder;
            this.right = this.left * -1;
            this.bottom = -this.top;
            this.near = nearClippingPlane;
            this.far = farClippingPlane;
            this.transform = Matrix4x4.PROJECTION_ORTHOGRAPHIC(this.left, this.right, this.bottom, this.top, this.near, this.far);

        }

        

    }
}