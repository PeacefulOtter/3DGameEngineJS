


class OBJLoader {


    static Vertex = class {
        constructor( pos, tex, nor )
        {
            this.pos = pos;
            this.tex = tex;
            this.nor = nor;
        }
    }

    static loadFile = ( filename )  => {   
        let vertices = []
        let textures = []
        // let tangents = []
        let normals =  []
        let indices = []

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

            if ( keyword === "v" )
                vertices.push( data.map(parseFloat) )
            else if ( keyword === "vt" )
                textures.push( data.map(parseFloat) )
            else if ( keyword === "vn" )
                normals.push( data.map(parseFloat) )
            else if ( keyword === "f")
            {    
                let facet = [];
                for (let i = 0; i <= 2; i++) {
                    let vertex = data[i].split('/').map(num => parseInt(num))
                    facet.push(new this.Vertex(
                        vertices[vertex[0] - 1], 
                        textures[vertex[1] - 1], 
                        normals[vertex[2] - 1] ))
                }
                indices.push( facet )
            }
                
        });
        
        return {
            "vertices": vertices,
            "textures": textures,
            "normals": normals,
            "indices": indices
        }
    }
}  