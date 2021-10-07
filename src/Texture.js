"use strict"

function isPowerOf2(length) {
    return (length & (length - 1)) == 0;
}

class Texture {

    static Resource = {}
    /**
     * DO NOT CREATE AN INSTANCE OF THIS CLASS USING THE CONSTRUCTOR
     * @param {int} textureID
     */
    constructor( textureID, samplerSlot ) {
        this.id = textureID;
        this.samplerSlot = samplerSlot;      
    }

    /***
     * @param {String} filename
     */
    static _constructWithFilename = ( filename, samplerSlot ) => {
        let resource = Texture.Resource[filename];
        if ( resource != undefined )
            return new Texture( resource, samplerSlot );

        const texture = gl.createTexture(); // not a buffer but an id
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));

        let image = new Image();
        image.src = "../res/textures/" + filename;
        image.onload = () => {
            gl.bindTexture(gl.TEXTURE_2D, texture);

            // if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
            // gl.generateMipmap(gl.TEXTURE_2D);
            // } else {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); // gl.NEAREST
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR); // gl.nearest
    
            // }
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        }

        Texture.Resource[ filename ] = texture;
        return new Texture(texture, samplerSlot);
    }
 

    bind = () => {
        gl.activeTexture(gl.TEXTURE0 + this.samplerSlot)
        gl.bindTexture(gl.TEXTURE_2D, this.id);
    }
}
