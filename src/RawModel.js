"use strict"

// TODO; separate simple models??
class RawModel {

    /**
     * FIXME: - USE CONSTRUCTOR
     * ===========================================================
     * DONT INSTANTIATE A RAWMODEL WITH THE CONSTRUCTOR, USE STATIC METHODS
     * ===========================================================
     */
    constructor( positions, textures, normals, material, indexBuffer, indicesLength ) 
    {
        this.positions = positions;
        this.textures = textures || [];
        this.normals = normals || [];
        // this.tangents = tangents || []
        this.material = material || null
        this.indexBuffer = indexBuffer;
        this.indicesLength = indicesLength;
    }

    /**
     * @param {String} filename null
     * @return {RawModel} model 
     */
    static _constructWithOBJ = ( objFilename, textFilename, textExtension ) => {
        const faces = OBJLoader.loadFile( objFilename )
        /*console.log("faces", faces);
        let positions = faces.map( face => {
            return face.map(f => f[0])
        }).flat(1)
        console.log("pos", positions);*/
        let textures = faces.map( face => {
            return face.map(f => f[1])
        }).flat(1)
        /*console.log("tex", textures);
        let normals = faces.map( face => {
            return face.map(f => f[2])
        }).flat(1)
        console.log("nor", normals);*/

        const obj = OBJLoader.parse( objFilename )
        console.log(obj);
        const { vertices, normals, colors, indices } = obj.getDrawingInfo()
        console.log(vertices, normals, indices);

        let v = obj.vertices.map( vertex => [vertex.x, vertex.y, vertex.z])    
        const indexBuffer = gl.createBuffer();
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, indexBuffer );
        gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW );

        let material = new Material( textFilename, textExtension );
        console.log(indices.length, vertices.length, textures.length);
        return new RawModel( v, textures, normals, material, indexBuffer, indices.length )
    }

    /**
     * @param {Float[][3]} Array of positions
     * @returns {RawModel} model 
     */
    static _constructWithVertices = ( positions ) => {
        return new RawModel( positions )
    }
}