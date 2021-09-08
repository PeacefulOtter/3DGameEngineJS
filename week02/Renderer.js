"use strict"


class Renderer
{
    /**
     * 
     * @param {RawModel} model 
     */
    constructor( model ) {
        this.model = model
        this.transform = new Transform()
        this.shader = new Shader( "a.vs", "a.fs" )
        this.shader.addAttribute( "color", vec4(1, 0, 1, 1) )
        this.shader.addUniform("translation")
        
        this.aim = vec2(0, 0);
    }


    render = () => {
        this.shader.bind()
        this.shader.updateUniforms( this.transform )
        this.draw( gl )
    }

    setPoint = (x, y) => {
        this.aim = vec2(x, y);
    }

    update = () => {
        let delta = sub(this.aim, this.transform.translate);
        this.transform.move(delta[0] / 50, delta[1] / 50);
    }

    draw = () => {
        // gl.bindVertexArray( this.model.vaoId );
        gl.enableVertexAttribArray( 0 );
        // gl.enableVertexAttribArray( 1 );

        gl.drawArrays( gl.TRIANGLES, 0, this.model.vertexCount );

        gl.disableVertexAttribArray( 0 );
        // gl.disableVertexAttribArray( 1 );
        // gl.bindVertexArray( 0 );
    }
}