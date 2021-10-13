
"use strict"

/**
     * Extends Renderer
     * @param {RawModel} model: the 3D model to render
     * @param {Shader} shader: the shader to render the model
     */
class Renderer3D extends Renderer {
    constructor(model, shader) {
        super( model, shader )

        shader.addUniform( "diffuse", "1i" )
        shader.addUniform( "normalMap", "1i")

        shader.addUniform( "translation", "vec3" );
        shader.addUniform( "transformationMatrix", "mat" )
        shader.addUniform( "projectionMatrix", "mat" )
        shader.addUniform( "viewMatrix", "mat" )

        shader.addAttribute( "position", model.positions, 3 )
        shader.addAttribute( "texture", model.textures, 2 )
        shader.addAttribute( "normal", model.normals, 3 )

        this.transform.translate(0, 0, 2);


        // REMOVE
        shader.addUniform( "LightPos", "vec3" )
        this.lightPos = new Vector3f(0, 0, 1)
        this.time  =0;
    }
    


    update = (deltaTime) => {
        this.time += deltaTime / 1000;
        this.lightPos.set(
            Math.cos(this.time), 
            Math.sin(this.time), 
            1)
        this.shader.setUniform("LightPos", this.lightPos.vec(), "vec3");
    }


    draw = () => {
        Renderer.prototype.enableAttribs.call(this);
        
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.model.indexBuffer);
        gl.drawElements(gl.TRIANGLES, this.model.indicesLength, gl.UNSIGNED_SHORT, 0);

        Renderer.prototype.disableAttribs.call(this);
    }
}