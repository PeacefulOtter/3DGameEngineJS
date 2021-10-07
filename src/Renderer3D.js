
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
        shader.addUniform("normalMap", "1i")

        shader.addUniform( "translation", "vec3" );
        shader.addUniform( "transformationMatrix", "mat" )
        shader.addUniform( "projectionMatrix", "mat" )
        shader.addUniform( "viewMatrix", "mat" )

        this.transform.translate(0, 0, 2);
    }
    


    update = () => {
        // console.log("here");
        // this.transform.setTranslation(0, 0, -5.9 + Math.sin(this.time++ / 30) / 15);
        // this.shader.updateUniforms(this.transform)
    }


    draw = () => {
        // Renderer.prototype.draw.call(this)
        Renderer.prototype.enableAttribs.call(this);
        
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.model.indexBuffer);
        gl.drawElements(gl.TRIANGLES, this.model.indicesLength, gl.UNSIGNED_SHORT, 0);

        Renderer.prototype.disableAttribs.call(this);
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