"use strict"


class Renderer
{

    /**
     * 
     * @param {Array (of vertex)} vertices 
     */
    constructor( vertices ) {
        this.vertexCount = vertices.length
        this.transform = new Transform()
        
        this.color = [vec4(1, 0, 1, 1), vec4(0, 0, 1, 1), vec4(1, 0, 0, 1)];

        this.shader = new Shader( "a.vs", "a.fs" )
        this.shader.addAttribute( "position", vertices, 2 )
        this.shader.addAttribute( "color", this.color, 4 )
        this.shader.addUniform("translation")
        
        // dummy stuff
        this.aim = vec2(0, 0);
    }


    render = () => {
        this.shader.bind()
        this.shader.updateUniforms( this.transform )
        this.draw()
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

        let delta = sub(this.aim, this.transform.translate);
        this.transform.move(delta[0] / 50, delta[1] / 50);
    }

    draw = () => {
        // gl.bindVertexArray( this.vaoId );
        gl.enableVertexAttribArray( 0 );
        gl.enableVertexAttribArray( 1 );

        // gl.bindBuffer( gl.ARRAY_BUFFER,  this.shader.attributes["position"] );
        // gl.vertexAttribPointer( 0, 2, gl.FLOAT, false, 12, 0 );
        // gl.vertexAttribPointer( 1, 4, gl.FLOAT, false, 12, 8 ); // 12 = FLOAT_BYTES (4) * NB_FLOAT_BEFORE (3)
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