



class ComplexRenderer extends Renderer {

    /**
     * 
     * @param {String} filename 
     */
    constructor( filename )
    {
        vertices, textures, normals, indices = OBJLoader.loadFile( filename )
        console.log(vertices, normals, textures, indices);
    }


    render = () => {
        console.log("here");
    }
}