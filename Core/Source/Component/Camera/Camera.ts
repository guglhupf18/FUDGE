// The main camera class for ComponentCamera to interact with

namespace FudgeCore {
    export enum FIELD_OF_VIEW {
        HORIZONTAL, VERTICAL, DIAGONAL
    }
    /**
     * Defines identifiers for the various projections a camera can provide.  
     * TODO: change back to number enum if strings not needed
     */
    export enum PROJECTION {
        CENTRAL = "central",
        ORTHOGRAPHIC = "orthographic",
        DIMETRIC = "dimetric",
        STEREO = "stereo",
        CAVALIER = "cavalier",
        CABINETT = "cabinett"
    }

    export class Camera {
        public pivot: Matrix4x4 = null;
        public projection: PROJECTION = null; // the projection of the camera (default = perspective)
        public transform: Matrix4x4 = new Matrix4x4; // The matrix to multiply each scene objects transformation by, to determine where it will be drawn.

        public backgroundColor: Color = new Color(0, 0, 0.3, 1); // The color of the background the camera will render.
        public backgroundEnabled: boolean = true; // Determines whether or not the background of this camera will be rendered.
        // TODO: examine, if background should be an attribute of Camera or Viewport
        public fieldOfView: number = null; // The camera's sensorangle.
        public aspectRatio: number = null;
        public direction: FIELD_OF_VIEW = null;

        constructor() {
            this.pivot = Matrix4x4.IDENTITY;
        }

        public setProjection(cam: Camera): void {            
            this.projection = cam.projection;
            
        }
      
        public getProjection(): PROJECTION {
            return this.projection;
        }


        public getBackgoundColor(): Color {
            return this.backgroundColor;
        }

        public getBackgroundEnabled(): boolean {
            return this.backgroundEnabled;
        }
        /**
        * Return the calculated normed dimension of the projection space
        */
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

           /**
         * Returns the multiplikation of the worldtransformation of the camera container with the projection matrix
         * @returns the world-projection-matrix
         * 
         */
        public get ViewProjectionMatrix(): Matrix4x4 {
            
            return this.transform;
        }

        
        //#region Transfer
        public serialize(): Serialization {
            let serialization: Serialization = {
                backgroundColor: this.backgroundColor,
                backgroundEnabled: this.backgroundEnabled,
                projection: this.projection,
                fieldOfView: this.fieldOfView,
                direction: this.direction,
                aspect: this.aspectRatio,
                pivot: this.pivot.serialize()
              //  [super.constructor.name]: super.serialize()
            };
            return serialization;
        }

        public deserialize(_serialization: Serialization): Serializable {
            this.backgroundColor = _serialization.backgroundColor;
            this.backgroundEnabled = _serialization.backgroundEnabled;
            this.projection = _serialization.projection;
            this.fieldOfView = _serialization.fieldOfView;
            this.aspectRatio = _serialization.aspect;
            this.direction = _serialization.direction;
            this.pivot.deserialize(_serialization.pivot);
           // super.deserialize(_serialization[super.constructor.name]);
            switch (this.projection) {
                case PROJECTION.ORTHOGRAPHIC:
                    // this.projectOrthographic(); // TODO: serialize and deserialize parameters
                    break;
                case PROJECTION.CENTRAL:
                  //  this.camera = new CameraPerspective();
                    break;
            }
            return this;
        }


    }

    
}
