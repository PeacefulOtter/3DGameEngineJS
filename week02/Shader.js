
"use strict"



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
        this.addUniform("translation")
        this.addUniform("cameraTranslation")
    }


    bind = () => {
        gl.useProgram( this.program );
    }

    /**
     * FIXME: NEEDS TO BE DYNAMIC ===========
     * FIXME: camera as argument to avoid var
     * @param {Transform} transform 
     */
    updateUniforms = ( transform ) => {
        this.setUniformVector3f( "translation", transform.translation.vec() )
        this.setUniformVector3f( "cameraTranslation", camera.transform.translation.vec() )
    }

    /**
     * 
     * @param {String} attributeName 
     * @param {Array} bufferData: data to put on the buffer
     * @param {int} dimension: dimension of each element in buffer
     */
    addAttribute = ( attributeName, bufferData, dimension ) => {
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
     * 
     * @param {String} uniformName 
     */
    addUniform = (uniformName) => {
        let loc = gl.getUniformLocation(this.program, uniformName)
        this.uniforms[ uniformName ] = loc;
        console.log(loc);
    }


    /**
     * 
     * @param {String} uniformName 
     * @param {float} value 
     */
    setUniformF( uniformName, value )
    {
        gl.uniform1f( this.uniforms[ uniformName ], value );
    }

    /**
     * 
     * @param {String} uniformName 
     * @param {vec2} value 
     */
    setUniformVector2f = ( uniformName, value ) =>
    {
        gl.uniform2f( this.uniforms[ uniformName ], value[0], value[1] );
    }

    /**
     * 
     * @param {String} uniformName 
     * @param {vec3} value 
     */
     setUniformVector3f = ( uniformName, value ) =>
     {
        gl.uniform3f( this.uniforms[ uniformName ], value[0], value[1], value[2] );
     }
} 