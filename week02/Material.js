


class Material {
    static path = "../res/textures/"

    static construtPath = (fn, spec, ext) => {
        return Material.path + filename + spec + extension
    }
    constructor( filename, extension )
    {

        this.diffuse = Texture._constructWithFilename( Material.construtPath( filename, "_diffuse", extension )  );
        this.normal = Texture._constructWithFilename( Material.construtPath( filename, "_normal", extension ) );
        this.height = Texture._constructWithFilename( Material.construtPath( filename, "_height", extension ) );
        // this.roughness;
        this.attenuation = new Vector3f( 0.1, 1, 20 );
    }
}