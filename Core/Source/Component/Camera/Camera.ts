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
        CABINET = "cabinet",
        ISOMETRIC = "isometric"
    }

    export class Camera {
        public pivot: Matrix4x4 = Matrix4x4.IDENTITY;
        public projection: PROJECTION; // the projection of the camera (default = perspective)
        public transform: Matrix4x4 = Matrix4x4.IDENTITY; // The matrix to multiply each scene objects transformation by, to determine where it will be drawn.

        public backgroundColor: Color = new Color(0, 0, 0.3, 1); // The color of the background the camera will render.
        public backgroundEnabled: boolean = true; // Determines whether or not the background of this camera will be rendered.
       // TODO: examine, if background should be an attribute of Camera or Viewport
 
   
        constructor() {
         //   console.log(this.pivot);            
        }

        public getBackgoundColor(): Color {
            return this.backgroundColor;
        }

        public getBackgroundEnabled(): boolean {
            return this.backgroundEnabled;
        }
        
           /**
         * Returns the multiplikation of the worldtransformation of the camera container with the projection matrix
         * @returns the world-projection-matrix
         * 
         */
        public get ViewProjectionMatrix(): Matrix4x4 {
            
            return this.transform;
        }

        /**
        * Return the calculated normed dimension of the projection space
        */
        public getProjectionRectangle(): Rectangle {
           let cam: CameraCentral = new CameraCentral();
           console.log(cam.getProjectionRectangle());
           return cam.getProjectionRectangle();
        }


        
        //#region Transfer
        public serialize(): Serialization {
            let serialization: Serialization = {
                backgroundColor: this.backgroundColor,
                backgroundEnabled: this.backgroundEnabled,
                projection: this.projection,
                transform: this.transform,
                pivot: this.pivot.serialize()
                
            };
            return serialization;
        }

        public deserialize(_serialization: Serialization): Serializable {
            this.backgroundColor = _serialization.backgroundColor;
            this.backgroundEnabled = _serialization.backgroundEnabled;
            this.projection = _serialization.projection;
            this.transform = _serialization.transform;
            this.pivot.deserialize(_serialization.pivot);
          
            return this;
        }


    }

    
}
