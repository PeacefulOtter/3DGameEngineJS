
"use strict"

class Camera {

    static FOV = 70.0;
    static ASPECT_RATIO = 16 / 9.0;
    static Z_NEAR = 0.01;
    static Z_FAR = 5000;

    static Y_AXIS = new Vector3f( 0, 1, 0 );

    // TODO: Make this generic
    static keys = [ 
        "z", 
        "d",
        "s",
        "q",
        "ArrowUp",
        "ArrowRight",
        "ArrowDown",
        "ArrowLeft"
    ]

    constructor(x, y, z)
    {
        this.transform = new Transform()
        this.transform.setTranslation(x, y, z)
        this.projection = Matrix4f.perspective( Camera.FOV, Camera.ASPECT_RATIO, Camera.Z_NEAR, Camera.Z_FAR );
    }

    getViewMatrix = () =>
    {
        let pos = this.transform.translation.mul( -1 );
        let cameraRotation = this.transform.rotation.conjugate().toRotationMatrix();
        let cameraTranslation = Matrix4f.translation( pos.x, pos.y, pos.z );
        return cameraRotation.mul( cameraTranslation );
    }

    move =  ( key ) => {
        switch (key) {
            case Camera.keys[0]:
                this.transform.translate(0, 0, -0.05)
                break;
            case Camera.keys[1]:
                this.transform.translate(0.03, 0, 0)
                break;
            case Camera.keys[2]:
                this.transform.translate(0, 0, 0.05)
                break;
            case Camera.keys[3]:
                this.transform.translate(-0.03, 0, 0)
                break;
            case Camera.keys[4]:
                this.transform.rotate()
                break;
            case Camera.keys[5]:
                this.transform.rotate()
                break;
            case Camera.keys[6]:
                this.transform.rotate()
                break;
            case Camera.keys[7]:
                this.transform.rotate()
                break;
            default:
                break;
        }
        console.log(this.transform.translation.vec());
    }

    rotateX = ( angleDeg ) => {
        this.transform.rotate( this.transform.rotation.getRight(), angleDeg );
    }

    rotateY = ( angleDeg ) => {
        this.transform.rotate( Camera.Y_AXIS, angleDeg );
    }
}