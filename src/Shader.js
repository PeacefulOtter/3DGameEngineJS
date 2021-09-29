
"use strict"


class Shader {

    static PATH = "../res/shaders/";

    /**
     * 
     * @param {String} vertexFile 
     * @param {String} fragmentFile 
     */
    constructor( vertexFile, fragmentFile ) {
        this.program = initShaders(gl, Shader.PATH + vertexFile, Shader.PATH + fragmentFile )
        this.attributes = {}
        this.uniforms = {};
    }


    bind = () => {
        gl.useProgram( this.program );
    }

    /**
     * FIXME: NEEDS TO BE MORE GENERIC ===========
     * FIXME: camera as argument to avoid var
     * @param {Transform} transform 
     */
    updateUniforms = ( transform, model ) => {
        for ( let [key, value] of Object.entries(this.uniforms) ) 
        {
            switch (key) {
                case "diffuse":
                    this.setUniformF( value.loc, model.material.diffuse )
                    break;
                case "translation":
                    this.setUniformVector3f( value.loc, transform.translation.vec() )
                    break;
                case "cameraTranslation":
                    this.setUniformVector3f( value.loc, camera.transform.translation.vec() )
                    break;
                case "transformationMatrix":
                    this.setUniformMatrix( value.loc, camera.transform.getTransformationMatrix() )
                    break;
                case "projectionMatrix":
                    this.setUniformMatrix( value.loc, camera.projection )
                    break;
                case "viewMatrix":
                    this.setUniformMatrix( value.loc, camera.getViewMatrix() )
                    break;
                default:
                    break;
            }
        }
    }

    /**
     * 
     * @param {String} attributeName 
     * @param {Array} bufferData: data to put on the buffer
     * @param {int} dimension: dimension of each element in buffer
     */
    addAttribute = ( attributeName, bufferData, dimension ) => {
        console.log(attributeName, bufferData);
        let data = flatten(bufferData)
        console.log("Adding attribute", attributeName, "with data: \n", data);
        
        let buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

        let loc = gl.getAttribLocation(this.program, attributeName);
        if ( loc == -1 )
        {
            console.log("Cannot find location of", attributeName);
            return;
        }
        gl.vertexAttribPointer(loc, dimension, gl.FLOAT, false, 0, 0);

        this.attributes[ attributeName ] = {
            "attribute": loc,
            "buffer": buffer, 
            "dimension": dimension
        };
        
        gl.bindAttribLocation( this.program, loc, attributeName );
    }

    bindAttribute = ( buffer, attribute, dimension ) => {
        gl.bindBuffer( gl.ARRAY_BUFFER, buffer )
        gl.enableVertexAttribArray( attribute ) 
        gl.vertexAttribPointer( attribute, dimension, gl.FLOAT, false, 0, 0 )
    }

    /**
     * Register a shader uniform
     * @param {String} uniformName 
     */
    addUniform = (uniformName, uniformType) => {
        let loc = gl.getUniformLocation(this.program, uniformName)
        this.uniforms[ uniformName ] = { "loc": loc, "type": uniformType };
        console.log(uniformName, this.uniforms[ uniformName ]);
    }


    /**
     * @param {glLocation} loc 
     * @param {float} value 
     */
    setUniformF = ( loc, value ) => {
        gl.uniform1f( loc, value );
    }

    /**
     * @param {glLocation} loc 
     * @param {int} value 
     */
     setUniformI = ( loc, value ) => {
         gl.uniform1i( loc, value );
     }

    /**
     * @param {glLocation} loc 
     * @param {vec2} value 
     */
    setUniformVector2f = ( loc, value ) => {
        gl.uniform2f( loc, value[0], value[1] );
    }

    /**
     * @param {glLocation} loc 
     * @param {vec3} value 
     */
    setUniformVector3f = ( loc, value ) => {
        gl.uniform3f( loc, value[0], value[1], value[2] );
    }

    /**
     * @param {glLocation} loc 
     * @param {Matrix4f} value 
     */
    setUniformMatrix = ( loc, value ) => {
        gl.uniformMatrix4fv( loc, false, flatten(value.transpose().m) ); // FIXME: flip buffer????
    }
} 