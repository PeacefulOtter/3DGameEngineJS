"use strict"


class RawModel {

    /**
     * ===========================================================
     * DONT INSTANTIATE A RAWMODEL WITH THE CONSTRUCTOR, USE STATIC METHODS
     * ===========================================================
     */
    constructor( positions, textures, normals ) 
    {
        this.positions = positions;
        this.textures = textures || [];
        this.normals = normals || [];
        // this.tangents = tangents || []
    }

    /**
     * @param {String} filename null
     * @return {RawModel} model 
     */
    static _constructWithOBJ = ( filename ) => {
        const faces = OBJLoader.loadFile( filename )
        console.log(faces);
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
        return new RawModel(positions, textures, normals )
    }

    /**
     * @param {Float[][3]} Array of positions
     * @returns {RawModel} model 
     */
    static _constructWithVertices = ( positions ) => {
        return new RawModel( positions )
    }
}