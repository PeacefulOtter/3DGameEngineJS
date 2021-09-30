"use strict"


class Renderer2D extends Renderer
{

    constructor( model, shader ) 
    {
        super( model, shader )
        
        this.color = [vec4(1, 0, 1, 1), vec4(0, 0, 1, 1), vec4(1, 0, 0, 1)];

        // shader.addUniform("translation", "vec3")
        // shader.addUniform("cameraTranslation", "vec3")
        shader.addUniform( "transformationMatrix", "mat" )
        shader.addUniform( "projectionMatrix", "mat" )
        shader.addUniform( "viewMatrix", "mat" )

        shader.addAttribute( "position", model.positions, 3 )
        // shader.addAttribute( "color", this.color, 4 )
    
        this.transform.translate(0, 0, 2);
        this.transform.rotateVec(Vector3f.Y_AXIS, 180)
    }

    update = () => {
        // UPDATE AN ATTRIBUTE
        // this.color[0] = add(this.color[0], vec4(0, 0.005, 0, 0))
        // this.color[1] = add(this.color[1], vec4(0, 0.005, 0, 0))
        // this.color[2] = add(this.color[2], vec4(0, 0.005, 0, 0))
        // gl.bindBuffer(gl.ARRAY_BUFFER, this.shader.attributes["color"].buffer)
        // gl.bufferData(gl.ARRAY_BUFFER, flatten(this.color), gl.STATIC_DRAW);

        // let delta = sub(this.aim, this.transform.translation.xy());
        // this.transform.translate(delta[0] / 50, delta[1] / 50, 0);
    }
}