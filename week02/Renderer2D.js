"use strict"


class Renderer2D extends Renderer
{

    constructor( model, shader ) 
    {
        super( model, shader )
        
        this.color = [vec4(1, 0, 1, 1), vec4(0, 0, 1, 1), vec4(1, 0, 0, 1)];

        // this.shader = new Shader( "2D.vs", "2D.fs" )
        shader.addAttribute( "position", model.vertices, 2 )
        shader.addAttribute( "color", this.color, 4 )
        shader.addUniform("translation")
        
        // dummy stuff
        this.aim = vec2(0, 0);
    }


    setAim = (x, y) => {
        this.aim = vec2(x, y);
    }

    update = () => {
        // UPDATE AN ATTRIBUTE
        this.color[0] = add(this.color[0], vec4(0, 0.005, 0, 0))
        this.color[1] = add(this.color[1], vec4(0, 0.005, 0, 0))
        this.color[2] = add(this.color[2], vec4(0, 0.005, 0, 0))
        gl.bindBuffer(gl.ARRAY_BUFFER, this.shader.attributes["color"])
        gl.bufferData(gl.ARRAY_BUFFER, flatten(this.color), gl.STATIC_DRAW);

        let delta = sub(this.aim, this.transform.translation.xy());
        this.transform.translate(delta[0] / 50, delta[1] / 50, 0);
    }

    draw = () => {
        // gl.bindVertexArray( this.vaoId );
        gl.enableVertexAttribArray( 0 );
        gl.enableVertexAttribArray( 1 );

        // gl.bindBuffer( gl.ARRAY_BUFFER,  this.shader.attributes["position"] );
        // gl.vertexAttribPointer( 0, 2, gl.FLOAT, false, 12, 0 );
        // gl.vertexAttribPointer( 1, 4, gl.FLOAT, false, 12, 8 ); // 12 = FLOAT_BYTES (4) * NB_FLOAT_BEFORE (3)
        
        // FOR attr in SHADER_ATTRIBUTES
        
        gl.bindBuffer( gl.ARRAY_BUFFER, this.shader.attributes["position"])
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
        gl.bindBuffer( gl.ARRAY_BUFFER, this.shader.attributes["color"])
        gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 0, 0);
        gl.drawArrays( gl.TRIANGLES, 0, this.vertexCount );

        gl.disableVertexAttribArray( 0 );
        gl.disableVertexAttribArray( 1 );
        // gl.bindVertexArray( 0 );
    }
}