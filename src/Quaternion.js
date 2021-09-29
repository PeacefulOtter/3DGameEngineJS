
"use strict"


class Quaternion {
    constructor(x, y, z, w) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        this.w = w || 0; 
    }

    /**
     * @returns {Quaternion} conjugate this
     */
    conjugate = () => {
        return new Quaternion( -this.x, -this.y, -this.z, this.w)
    }

    /**
     * @returns {Matrix4f} rotation matrix
     */
    toRotationMatrix = () => {
        let x = this.x; let y = this.y; let z = this.z; let w = this.w;

        let forward =  new Vector3f(2.0 * (x * z - w * y), 2.0 * (y * z + w * x), 1.0 - 2.0 * (x * x + y * y));
        let up = new Vector3f(2.0 * (x * y + w * z), 1.0 - 2.0 * (x * x + z * z), 2.0 * (y * z - w * x));
        let right = new Vector3f(1.0 - 2.0 * (y * y + z * z), 2.0 * (x * y - w * z), 2.0 * (x * z + w * y));

        return Matrix4f.rotation( forward, up, right );
    }

    getForward = () => { return new Vector3f(  0,  0,  1 ).rotate( this ); }
    getBack = () =>    { return new Vector3f(  0,  0, -1 ).rotate( this ); }
    getUp = () =>      { return new Vector3f(  0,  1,  0 ).rotate( this ); }
    getDown = () =>    { return new Vector3f(  0, -1,  0 ).rotate( this ); }
    getRight = () =>   { return new Vector3f(  1,  0,  0 ).rotate( this ); }
    getLeft = () =>    { return new Vector3f( -1,  0,  0 ).rotate( this ); }
}