
"use strict"

/**
     * Extends Renderer
     * @param {RawModel} model: the 3D model to render
     * @param {Shader} shader: the shader to render the model
     */
class Renderer3D extends Renderer {
    constructor(model, shader) {
        super( model, shader )
        /*this.color = [];
        for (let i = 0; i < model.positions.length * 3; i++) {
            this.color.push(vec4(Math.random(), Math.random(), Math.random(), 1))            
        }*/

        shader.addUniform( "diffuse", "1i" )
        shader.addUniform( "transformationMatrix", "mat" )
        shader.addUniform( "projectionMatrix", "mat" )
        shader.addUniform( "viewMatrix", "mat" )

        shader.addAttribute( "position", model.positions, 3 )
        shader.addAttribute( "texture", model.textures, 2 )
        // shader.addAttribute( "normal", model.normals, 3 )
        // shader.addAttribute( "color", this.color, 4 )

        this.transform.translate(0, 0, 2);

        // this.mesh = new Mesh( model )
    }
    


    update = () => {
        // console.log("here");
        // this.transform.setTranslation(0, 0, -5.9 + Math.sin(this.time++ / 30) / 15);
        // this.shader.updateUniforms(this.transform)
    }


    draw = () => {
        this.model.material.diffuse.bind(this.shader.uniforms[ "diffuse" ].loc, 0)
        Renderer.prototype.draw.call(this)

    }
}


// DRAW

        /*gl.enableVertexAttribArray( 0 );
        gl.enableVertexAttribArray( 1 );
        gl.enableVertexAttribArray( 2 );
        // gl.enableVertexAttribArray( 3 );
        
        // VBOs
        gl.bindBuffer( gl.ARRAY_BUFFER, this.mesh.vbo )
        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, Vertex.VERTEX_SIZE * 4, 0); // positions
        gl.vertexAttribPointer(1, 2, gl.FLOAT, false, Vertex.VERTEX_SIZE * 4, 12 ); // textures
        gl.vertexAttribPointer(2, 3, gl.FLOAT, false, Vertex.VERTEX_SIZE * 4, 20 ); // normals
        // gl.vertexAttribPointer(3, 3, gl.FLOAT, false, Vertex.VERTEX_SIZE * 4, 32 ); // tangents

        // COLOR - WHERE ???
        // gl.bindBuffer( gl.ARRAY_BUFFER, this.shader.attributes["color"] )
        // gl.vertexAttribPointer(0, 4, gl.FLOAT, false, 0, 0);

        gl.drawArrays( gl.TRIANGLES, 0, this.positions.length )

        // INDICES
        // gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.mesh.ibo );
        // gl.drawElements( gl.TRIANGLES, this.model.indices.length, gl.UNSIGNED_INT, 0 );

        gl.disableVertexAttribArray( 0 );
        gl.disableVertexAttribArray( 1 );
        gl.disableVertexAttribArray( 2 );
        // gl.disableVertexAttribArray( 3 );*/