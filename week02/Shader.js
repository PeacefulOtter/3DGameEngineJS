
"use strict"


// TODO: remove the two types of shaders -> make only one
class Shader {

    /**
     * 
     * @param {String} vertexFile 
     * @param {String} fragmentFile 
     */
    constructor( vertexFile, fragmentFile ) {
        this.program = initShaders(gl, vertexFile, fragmentFile )
        this.attributes = {}
        this.uniforms = {};

        // TODO: make this auto
        this.addUniform("translation", "vec3")
        this.addUniform("cameraTranslation", "vec3")
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
                    // this.setUniformF( value.loc, model.texture )
                    break;
                case "translation":
                    this.setUniformVector3f( value.loc, transform.translation.vec() )
                    break;
                case "cameraTranslation":
                    this.setUniformVector3f( value.loc, camera.transform.translation.vec() )
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
     * 
     * @param {String} uniformName 
     * @param {float} value 
     */
    setUniformF( loc, value )
    {
        gl.uniform1f( loc, value );
    }

    /**
     * 
     * @param {String} uniformName 
     * @param {int} value 
     */
     setUniformI( loc, value )
     {
         gl.uniform1i( loc, value );
     }

    /**
     * 
     * @param {String} uniformName 
     * @param {vec2} value 
     */
    setUniformVector2f = ( loc, value ) =>
    {
        gl.uniform2f( loc, value[0], value[1] );
    }

    /**
     * 
     * @param {String} uniformName 
     * @param {vec3} value 
     */
     setUniformVector3f = ( loc, value ) =>
     {
        gl.uniform3f( loc, value[0], value[1], value[2] );
     }
} 