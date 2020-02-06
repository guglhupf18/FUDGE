// Camera used to merge two PerspectiveCamera into stereoscopic 3D 
/**
 * Effects: Anaglyph; Paralax; Stereo
 * 
 * Properties: 
 * float aspect = 1; float 
 * 
 *
 */
/// <reference path="Camera.ts"/>


namespace FudgeCore {
    export class CameraStereo extends Camera {
        public aspect: number = 1.0;
        public eyeSep: number = 0.064;
        public lCamera: Camera = new Camera;
        public rCamera: Camera = new Camera;
        
        public CameraStereo(): void {
     ///       this.getFieldOfView();
        }
      /*
        public update(camera : CameraPerspective): void {
            // update the cameras 
        }
        */
    }
}