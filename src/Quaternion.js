
"use strict"


class Quaternion {
    constructor(x, y, z, w) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        this.w = w || 0; 
    }

    /**
     * 
     * @param {Vector3f} axis 
     * @param {float} angleDeg 
     * @returns {Quaternion} Rotation quaternion
     */
    static _createFromVec = ( axis, angleDeg ) => {
        let halfRadAngle = radians( angleDeg ) / 2;
        let cosHalfAngle = Math.cos( halfRadAngle );
        let sinHalfAngle = Math.sin( halfRadAngle );

        let x = axis.x * sinHalfAngle;
        let y = axis.y * sinHalfAngle;
        let z = axis.z * sinHalfAngle;
        let w = cosHalfAngle;

        return new Quaternion(x, y, z, w);
    }

    /**
     * @returns {Quaternion} conjugate this
     */
    conjugate = () => {
        return new Quaternion( -this.x, -this.y, -this.z, this.w)
    }

    /**
     * 
     * @param {Quaternion} quat 
     * @returns {Quaternion} rotated quaternion
     */
    rotate = ( quat ) => {
        return quat.mulQuat( this )
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

    mulQuat = ( other ) => {
        let x = this.x; let y = this.y; let z = this.z; let w = this.w;

        let x_ = x * other.w + w * other.x + y * other.z - z * other.y;
        let y_ = y * other.w + w * other.y + z * other.x - x * other.z;
        let z_ = z * other.w + w * other.z + x * other.y - y * other.x;
        let w_ = w * other.w - x * other.x - y * other.y - z * other.z;
        
        return new Quaternion( x_, y_, z_, w_ );
    }

    mulVec = ( other ) => {
        let x = this.x; let y = this.y; let z = this.z; let w = this.w;

        let x_ =  w * other.x + y * other.z - z * other.y;
        let y_ =  w * other.y + z * other.x - x * other.z;
        let z_ =  w * other.z + x * other.y - y * other.x;
        let w_ = -x * other.x - y * other.y - z * other.z;
        
        return new Quaternion( x_, y_, z_, w_ );
    }

    vec = () => { return vec4(this.x, this.y, this.z, this.w); }

    toString = () => { return this.vec() }
}