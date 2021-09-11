"use strict"


class RawModel {

    /**
     * ===========================================================
     * DONT INSTANTIATE A RAWMODEL WITH THE CONSTRUCTOR, USE STATIC METHODS
     * ===========================================================
     */
    constructor( vertices, normals, textures, indices ) 
    {
        this.vertices = vertices;
        this.normals = normals;
        this.textures = textures;
        this.indices = indices;
    }

    /**
     * 
     * @param {string} filename 
     * @returns 
     */
    static _constructWithOBJ = ( filename ) => {
        const {vertices, normals, textures, indices} = OBJLoader.loadFile( filename )
        console.log(vertices, normals, textures, indices);
        return new RawModel(vertices, normals, textures, indices)
    }

    /**
     * 
     * @param {RawModel} model 
     * @returns 
     */
    static _constructWithVertices = ( vertices ) => {
        return new RawModel( vertices, [], [], [] )
    }
}