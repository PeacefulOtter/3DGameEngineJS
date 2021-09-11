
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
    }


    bind = () => {
        gl.useProgram( this.program );
    }

    /**
     * FIXME: NEEDS TO BE DYNAMIC ===========
     * @param {Transform} transform 
     */
    updateUniforms = ( transform ) => {
        this.setUniformVector3f( "translation", transform.translation.vec() )
    }

    /**
     * 
     * @param {String} attributeName 
     * @param {Array} bufferData: data to put on the buffer
     * @param {int} dimension: dimension of each element in buffer
     */
    addAttribute = ( attributeName, bufferData, dimension ) => {
        console.log("Adding attribute ", attributeName, " with data: ", bufferData);
        
        let buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(bufferData), gl.STATIC_DRAW);

        let loc = gl.getAttribLocation(this.program, attributeName);
        gl.vertexAttribPointer(loc, dimension, gl.FLOAT, false, 0, 0);

        this.attributes[ attributeName ] = buffer;
        
        gl.bindAttribLocation( this.program, loc, attributeName );
    }

    /**
     * 
     * @param {String} uniformName 
     */
    addUniform = (uniformName) => {
        let loc = gl.getUniformLocation(this.program, uniformName)
        this.uniforms[ uniformName ] = loc;
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