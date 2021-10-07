


class Material {

    static construtPath = (fn, spec, ext) => {
        return fn + spec + ext
    }
    constructor( filename, extension )
    {
        this.diffuse = Texture._constructWithFilename( 
            Material.construtPath( filename, "_diffuse", extension ), 0  );
        this.normal = Texture._constructWithFilename( 
            Material.construtPath( filename, "_normal", extension ), 1 );
        // this.height = Texture._constructWithFilename( 
        //    Material.construtPath( filename, "_height", ".png" ), 2 );
        // this.roughness;
        this.attenuation = new Vector3f( 0.1, 1, 20 );
    }
}