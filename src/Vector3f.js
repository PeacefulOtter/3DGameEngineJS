
"use strict"

class Vector3f {

    static Y_AXIS = new Vector3f( 0, 1, 0 );

    /**
     * 
     * @param {float} x 
     * @param {float} y 
     * @param {float} z
     */
    constructor( x, y, z ) 
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add = (x, y, z) => {
        return new Vector3f(this.x + x, this.y + y, this.z + z);
    }

    addVec = (vec) => {
        return new Vector3f(this.x + vec.x, this.y + vec.y, this.z + vec.z);
    }


    /**
     * @param {Float} amount 
     */
    mul = ( amount ) => {
        return new Vector3f( amount * this.x, amount * this.y, amount * this.z );
    }

    /**
     * @param {Quaternion} quat: rotation quaternion 
     * @returns {Vector3f} Rotated vector
     */
    rotate = ( quat ) => {
        let conjugate = quat.conjugate();
        let temp = quat.mulVec( this );
        let w = temp.mulQuat( conjugate );

        return new Vector3f( w.x, w.y, w.z );
    }

    xy = () => {
        return vec2(this.x, this.y);
    }

    vec = () => {
        return vec3(this.x, this.y, this.z);
    }

    toString = () => { return this.vec() }
}