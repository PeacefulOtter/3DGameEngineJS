
"use strict"

class Vector3f {

    /**
     * 
     * @param {float} x 
     * @param {float} y 
     * @param {float} z
     */
    constructor( x, y, z ) 
    {
        this.x = x
        this.y = y
        this.z = z
    }

    add = (x, y, z) => {
        return new Vector3f(this.x + x, this.y + y, this.z + z)
    }

    xy = () => {
        return vec2(this.x, this.y)
    }

    vec = () => {
        return vec3(this.x, this.y, this.z)
    }
}