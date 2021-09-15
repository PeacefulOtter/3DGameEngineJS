
"use strict"

class Camera {
    constructor(x, y, z)
    {
        this.transform = new Transform()
        this.transform.setTranslation(x, y, z)
    }

    move =  (x, y, z) => {
        this.transform.translate(x, y, z)
    }
}