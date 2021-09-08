class RawModel
{
    constructor( vertices ) {
        // let vaoId = gl.createVertexArray();
        // gl.bindVertexArray( vaoId );

        // Create a new Vertex Buffer Object in memory and select it (bind)
        // A VBO is a collection of Vectors which in this case resemble the location of each vertex.
        this.vboId = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, this.vboId );
        gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
        // Put the VBO in the attributes list at index 0
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0 );
        
        this.vertexCount = vertices.length;
    }

    getVboId = () =>
    {
        return this.vboId;
    }

    // getVertexCount = () =>
    // {
    //     return vertexCount;
    // }
}