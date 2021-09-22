
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
            case keys[0]:
                this.transform.translate(0, 0, -0.1)
                break;
            case keys[1]:
                this.transform.translate(0.1, 0, 0)
                break;
            case keys[2]:
                this.transform.translate(0, 0, 0.1)
                break;
            case keys[3]:
                this.transform.translate(-0.1, 0, 0)
                break;
            default:
                break;
        }
    }
}