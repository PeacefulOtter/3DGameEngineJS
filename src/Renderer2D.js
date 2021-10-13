"use strict"


class Renderer2D extends Renderer
{

    constructor( model, shader ) 
    {
        super( model, shader )

        shader.addUniform( "diffuse", "1i" )
        shader.addUniform( "normalMap", "1i" )

        shader.addUniform( "translation", "vec3" )
        shader.addUniform( "transformationMatrix", "mat" )
        shader.addUniform( "projectionMatrix", "mat" )
        shader.addUniform( "viewMatrix", "mat" )
        shader.addUniform( "LightPos", "vec3" )

        shader.addAttribute( "position", model.positions, 3 )
        shader.addAttribute( "texture", model.textures, 2)
    
        this.transform.translate(0, 0, 2);
        this.transform.rotateVec(Vector3f.Y_AXIS, 180)
    }

    // TODO: add time?
    update = (deltaTime) => {
        this.time += deltaTime / 1000;
        this.lightPos.set(
            Math.cos(this.time), 
            Math.sin(this.time), 
            1)
        this.shader.setUniform("LightPos", this.lightPos.vec(), "vec3");
    }
}