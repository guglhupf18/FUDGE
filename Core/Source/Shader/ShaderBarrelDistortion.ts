namespace FudgeCore {
    /**
    * basic barrel distortion shader 
    */
    export class ShaderBarrelDistortion extends Shader {
        public static getCoat(): typeof Coat {
            return CoatColored;
        }

        public static getVertexShaderSource(): string {
            return `#version 300 es
            in highp vec4 posVtx;
            uniform mat4 mvpM;
            
            void main(void)
            {
             gl_Position = mvpM * posVtx;
            }`;


        }
        public static getFragmentShaderSource(): string {
            return `#version 300 es
            in highp vec2 texFrg;
            out highp vec4 frgCol;
            uniform highp sampler2D texSampler;
            
            void main(void)
            {
             highp vec4 col = vec4(0.0, 0.0, 0.0, 1.0); /* base colour */
             if (all(greaterThanEqual(texFrg, vec2(0.0))) &&
                 all(lessThanEqual(texFrg, vec2(1.0))))
             {
              col = texture(texSampler, texFrg);
             }
             frgCol = col;
            }`;
        }
    }
}