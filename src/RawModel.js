"use strict"

// TODO; separate simple models??
class RawModel {

    /**
     * FIXME: - USE CONSTRUCTOR
     * ===========================================================
     * DONT INSTANTIATE A RAWMODEL WITH THE CONSTRUCTOR, USE STATIC METHODS
     * ===========================================================
     */
    constructor( positions, textures, normals, material ) 
    {
        this.positions = positions;
        this.textures = textures || [];
        this.normals = normals || [];
        // this.tangents = tangents || []
        this.material = material || null
    }

    /**
     * @param {String} filename null
     * @return {RawModel} model 
     */
    static _constructWithOBJ = ( objFilename, textFilename, textExtension ) => {
        const faces = OBJLoader.loadFile( objFilename )
        console.log("faces", faces);
        let positions = faces.map( face => {
            return face.map(f => f[0])
        }).flat(1)
        console.log("pos", positions);
        let textures = faces.map( face => {
            return face.map(f => f[1])
        }).flat(1)
        console.log("tex", textures);
        let normals = faces.map( face => {
            return face.map(f => f[2])
        }).flat(1)
        console.log("nor", normals);

        
        let material = new Material( textFilename, textExtension );
        return new RawModel( positions, textures, normals, material )
    }

    /**
     * @param {Float[][3]} Array of positions
     * @returns {RawModel} model 
     */
    static _constructWithVertices = ( positions ) => {
        return new RawModel( positions )
    }
}