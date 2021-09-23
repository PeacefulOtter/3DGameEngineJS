
"use strict"

class Camera {

    // TODO: Make this generic
    static keys = [ 
        "z", 
        "d",
        "s",
        "q"
    ]

    constructor(x, y, z)
    {
        this.transform = new Transform()
        this.transform.setTranslation(x, y, z)
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
            default:
                break;
        }
        console.log(this.transform.translation.vec());
    }
}