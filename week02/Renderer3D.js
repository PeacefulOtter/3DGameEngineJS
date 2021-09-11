
"use strict"



class Renderer3D extends Renderer {

    /**
     * 
     * @param {RawModel} model: the 3D model to render
     * @param {Shader} shader: the shader to render the model
     */
    constructor( model, shader )
    {
        super( model, shader )

        this.color = [];
        model.vertices.forEach( elt => {
            this.color.push(vec4(Math.random(), Math.random(), Math.random(), 1))
        });

        this.shader.addAttribute( "position", model.vertices, 3 )
        this.shader.addAttribute( "color", this.color, 4 )
        this.shader.addUniform("translation")

        this.transform.translate(0, 0, -0.5);
    }


    draw = () => {
        gl.enableVertexAttribArray( 0 );
        gl.enableVertexAttribArray( 1 );
        
        gl.bindBuffer( gl.ARRAY_BUFFER, this.shader.attributes["position"])
        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
        gl.bindBuffer( gl.ARRAY_BUFFER, this.shader.attributes["color"])
        gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 0, 0);
        gl.drawArrays( gl.TRIANGLES, 0, this.vertexCount );

        gl.disableVertexAttribArray( 0 );
        gl.disableVertexAttribArray( 1 );
    }
}