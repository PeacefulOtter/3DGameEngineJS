
"use strict"



class Shader {

    /**
     * 
     * @param {String} vertexFile 
     * @param {String} fragmentFile 
     */
    constructor( vertexFile, fragmentFile ) {
        this.program = initShaders(gl, vertexFile, fragmentFile )
        this.uniforms = [];
    }


    bind = () => {
        gl.useProgram( this.program );
    }

    updateUniforms = ( transform ) => {
        this.setUniformVector2f( "translation", transform.translate )
    }

    /**
     * 
     * @param {String} attributeName 
     * @param {Array} bufferData
     */
    addAttribute = ( attributeName, bufferData ) => {
        // console.log(bufferData);
        // let buffer = gl.createBuffer();
        // gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        // gl.bufferData(gl.ARRAY_BUFFER, flatten(bufferData), gl.STATIC_DRAW);

        // let loc = gl.getAttribLocation(this.program, attributeName);
        // gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        // gl.vertexAttribPointer(loc, 4, gl.FLOAT, false, 0, 0);
        // gl.enableVertexAttribArray(loc);
        
        // gl.bindAttribLocation( this.program, loc, attributeName );
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
} 