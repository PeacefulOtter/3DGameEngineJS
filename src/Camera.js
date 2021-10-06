
"use strict"

class Camera {

    static FOV = 70.0;
    static ASPECT_RATIO = 16 / 9.0;
    static Z_NEAR = 0.01;
    static Z_FAR = 5000;

    // TODO: Make this generic
    static keys = [ 
        "z", 
        "d",
        "s",
        "q",
        "ArrowUp",
        "ArrowRight",
        "ArrowDown",
        "ArrowLeft",
        "Shift",
        " "
    ]

    constructor(x, y, z)
    {
        this.transform = new Transform()
        this.transform.setTranslation(x, y, z)
        this.projection = Matrix4f.perspective( Camera.FOV, Camera.ASPECT_RATIO, Camera.Z_NEAR, Camera.Z_FAR );
    }

    // TODO: not request this for every object!!!!
    getViewMatrix = () =>
    {
        let pos = this.transform.translation.mul( -1 );
        let cameraRotation = this.transform.rotation.conjugate().toRotationMatrix();
        let cameraTranslation = Matrix4f.translation( pos );
        return cameraRotation.mul( cameraTranslation );
    }

    move =  ( key ) => {
        switch (key) {
            case Camera.keys[0]:
                this.translateZ(1)
                break;
            case Camera.keys[1]:
                this.translateX(1)
                break;
            case Camera.keys[2]:
                this.translateZ(-1)
                break;
            case Camera.keys[3]:
                this.translateX(-1)
                break;
            case Camera.keys[4]:
                this.rotateX(-3)
                break;
            case Camera.keys[5]:
                this.rotateY(3)
                break;
            case Camera.keys[6]:
                this.rotateX(3)
                break;
            case Camera.keys[7]:
                this.rotateY(-3)
                break;
            case Camera.keys[8]:
                this.transform.translate(0, -0.05, 0);
                break;
            case Camera.keys[9]:
                this.transform.translate(0, 0.05, 0);
                break;
            default:
                break;
        }
    }

    translateX = (sign) => {
        let right = this.transform.rotation.getRight()
        this.transform.translateVec( right.mul(0.05 * sign) );
    }

    translateZ = (sign) => {
        let front = this.transform.rotation.getForward()
        this.transform.translateVec( front.mul(0.05 * sign) );
    }

    rotateX = ( angleDeg ) => {
        this.transform.rotateVec( this.transform.rotation.getRight(), angleDeg );
    }

    rotateY = ( angleDeg ) => {
        this.transform.rotateVec( Vector3f.Y_AXIS, angleDeg );
    }
}