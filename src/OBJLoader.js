


class OBJLoader {

    static parse = ( filename ) => {
        let obj = new OBJDoc( '../res/models/' + filename )
        obj.parse(loadFileAJAX( '../res/models/' + filename ), 1, false)
        return obj
    }

    static loadFile = ( filename )  => {   
        let positions = []
        let textures = []
        // let tangents = []
        let normals =  []
        let faces = []

        // const response = await fetch( '../res/models/' + filename );
        // const text = await response.text()
        const text = loadFileAJAX( '../res/models/' + filename );

        text.split('\n').forEach(line => {
            let data = line.split(' ')
            let keyword = data.shift()

            if ( line === "" || keyword === "#" )
                return;

            // usemtl
            // tangents
            data = data.filter( elt => elt != "" )
            let dataFloat = data.map(parseFloat)

            if ( keyword === "v" )
                positions.push( normalize(dataFloat, false) )

            else if ( keyword === "vt" )
                textures.push( [dataFloat[0], 1.0 - dataFloat[1]] )
            else if ( keyword === "vn" )
                normals.push( dataFloat )
            else if ( keyword === "f")  
            {    
                let face = [];
                for (let i = 0; i <= 2; i++) {
                    let vertex = data[i].split('/').map(num => parseInt(num))
                    // FIXME: OBJ file does not necessary have texture and normals
                    // FIXME: Indices are not necessarily sorted (?)
                    face.push( [
                        positions[vertex[0] - 1], 
                        textures[vertex[1] - 1], 
                        normals[vertex[2] - 1] ] )
                }
                faces.push( face )
            }
                
        });

        return faces    
    }
}  