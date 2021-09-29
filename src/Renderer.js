"use strict"

/**
     * 
     * @param {RawModel} model 
     * @param {Shader} shader 
     */
class Renderer {
    constructor( model, shader ) {
        this.model = model;
        this.shader = shader;
        this.transform = new Transform();
        this.vertexCount = model.positions.length
    }

    render = () => {
        this.shader.bind()
        this.shader.updateUniforms( this.transform, this.model )
        this.draw()
    }

    draw () {
        for (const [key, value] of Object.entries(this.shader.attributes)) {
            this.shader.bindAttribute( value.buffer, value.attribute, value.dimension )
        }

        gl.drawArrays( gl.TRIANGLES, 0, this.vertexCount );

        for (const [key, value] of Object.entries(this.shader.attributes)) {
            gl.disableVertexAttribArray( value.attribute );
        }
    }
}
 