
"use strict"

class Matrix4f {
    
    static MATRIX_SIZE = 4;

    /**
     * @param {Float[4][4]} matrixArray 
     */
    constructor( matrixArray )
    {
        this.m = matrixArray;
    }

    static identity = () => {
        return new Matrix4f(
            [
                [1, 0, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 1]
            ]
        );
    }

    static perspective = (fov, aspectRatio, zNear, zFar) => {
        let mat = Matrix4f.identity();

        let invTanHalfFov = 1.0 / Math.tan( radians(fov) / 2 );
        let depth = zNear - zFar;

        mat.m[ 0 ][ 0 ] = invTanHalfFov * ( 1.0 / aspectRatio );
        mat.m[ 1 ][ 1 ] = invTanHalfFov;
        mat.m[ 2 ][ 2 ] =  ( -zNear - zFar ) / depth;
        mat.m[ 2 ][ 3 ] = (2 * zFar * zNear) / depth;
        mat.m[ 3 ][ 2 ] = 1;
        mat.m[ 3 ][ 3 ] = 0;

        return mat;
    }

    static translation = ( vec ) => {
        let mat = Matrix4f.identity();

        mat.m[ 0 ][ 3 ] = vec.x;
        mat.m[ 1 ][ 3 ] = vec.y;
        mat.m[ 2 ][ 3 ] = vec.z;
        
        return mat;
    }

    static scale = ( vec ) => {
        let mat = Matrix4f.identity();
       
        mat.m[ 0 ][ 0 ] = vec.x;
        mat.m[ 1 ][ 1 ] = vec.y;
        mat.m[ 2 ][ 2 ] = vec.z;
        
        return mat;
    }

    /**
     * 
     * @param {Vector3f} f : forward vector
     * @param {Vector3f} u : upward vector
     * @param {Vector3f} r : right vector
     * @returns Rotation Matrix
     */
    static rotation = (f, u, r) => {
        let mat = Matrix4f.identity();

        mat.m[ 0 ][ 0 ] = r.x;
        mat.m[ 0 ][ 1 ] = r.y;
        mat.m[ 0 ][ 2 ] = r.z;
        mat.m[ 1 ][ 0 ] = u.x;
        mat.m[ 1 ][ 1 ] = u.y;
        mat.m[ 1 ][ 2 ] = u.z;
        mat.m[ 2 ][ 0 ] = f.x;
        mat.m[ 2 ][ 1 ] = f.y;
        mat.m[ 2 ][ 2 ] = f.z;

        return mat;
    }

    /**
     * 
     * @param {Matrix4f} other 
     * @returns Multiplication between this and other
     */
    mul = ( other ) => {
        let mat = Matrix4f.identity();

        for ( let i = 0; i < Matrix4f.MATRIX_SIZE; i++ )
        {
            for ( let j = 0; j < Matrix4f.MATRIX_SIZE; j++ )
            {
                let value = 0;
                for ( let k = 0; k < Matrix4f.MATRIX_SIZE; k++ )
                {
                    value += this.m[i][k] * other.m[k][j];
                }
                mat.m[i][j] = value;
            }
        }
        
        return mat;
    }

    transpose = () => {
        let mat = Matrix4f.identity();

        for ( var i = 0; i < Matrix4f.MATRIX_SIZE; ++i )
            for ( var j = 0; j < Matrix4f.MATRIX_SIZE; ++j )
                mat.m[i][j] = this.m[j][i];
        
        return mat;
    }
}