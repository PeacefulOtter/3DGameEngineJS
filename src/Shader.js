
"use strict"


class Shader {

    static PATH = "../res/shaders/";
    static Resource = {};
    /**
     * 
     * @param {String} vertexFile 
     * @param {String} fragmentFile 
     */
    constructor( vertexFile, fragmentFile ) 
    {
        let resource = Shader.Resource[vertexFile];
        if ( resource != undefined )
        {
            console.log("using already created shader", vertexFile);
            this.program = resource.program;
            this.attributes = resource.attributes;
        }
        else
        {
            this.program = initShaders(gl, Shader.PATH + vertexFile, Shader.PATH + fragmentFile )
            this.attributes = {}
            this.uniforms = {};
            Shader.Resource[vertexFile] = { program: this.program, attributes: this.attributes };
            console.log("Creating shader", vertexFile);
        }

        this.uniforms = {}
    }


    bind = () => {
        gl.useProgram( this.program );
    }

    unbind = () => {
        gl.useProgram( null );
    }

    setUniform = (uniformName, data, type) => {
        this.bind()
        let loc = gl.getUniformLocation(this.program, uniformName)
        
        switch (type) {
            case "vec3":
                this.setUniformVector3f(loc, data)
                break;
            // TODO: add more
            default:
                break;
        }

        this.unbind()
    }

    /**
     * FIXME: camera as argument to avoid var
     * @param {Transform} transform 
     */
    updateUniforms = ( transform, model ) => {
        for ( let [key, value] of Object.entries(this.uniforms) ) 
        {
            switch (key) {
                case "diffuse":
                    model.material.diffuse.bind()
                    this.setUniformI( value.loc, model.material.diffuse.samplerSlot )
                    break;
                case "normalMap":
                    model.material.normal.bind()
                    this.setUniformI( value.loc, model.material.normal.samplerSlot )
                    break;
                case "transformationMatrix":
                    this.setUniformMatrix( value.loc, transform.getTransformationMatrix() )
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
        if ( this.attributes[attributeName] != undefined )
            return;
            
        let data = flatten(bufferData)
        
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
        console.log("Added attribute", attributeName, "with data: \n", data);
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
        console.log("Added uniform: ", uniformName, this.uniforms[ uniformName ]);
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
        gl.uniformMatrix4fv( loc, false, flatten(value.transpose().m) );
    }
} 