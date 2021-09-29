"use strict"

class Mesh {

    /**
     * 
     * @param {RawModel} model 
     */
    constructor( model )
    {
        /**
         * @param {Vertex[]} vertices: position, textures, normals
         */
        /*let vertices = []
        for (let i = 0; i < model.positions.length; i++) {
            console.log(vertices);
            vertices.push( [
                model.positions[i],
                model.textures[i],
                model.normals[i]
                // vec3(1, 1, 1)// model.tangents[i]
            ] ) 
        }

        this.ibo = gl.createBuffer()
        this.vbo = gl.createBuffer()

        console.log(vertices);
        console.log(model.indices);

        gl.bindBuffer( gl.ARRAY_BUFFER, this.vbo );
        gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(flatten(vertices)), gl.STATIC_DRAW );

        // INDICES
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.ibo );
        gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, flatten(model.indices), gl.STATIC_DRAW );
        */
    }

    //FIXME: destroy bufffers
    // .gl.deleteBuffer(this.data)
}