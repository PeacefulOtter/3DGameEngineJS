
"use strict"

class Transform
{
    constructor()
    {
        this.translation = new Vector3f(0, 0, 0);
    }

    translate = (x, y, z) => {
        this.translation = this.translation.add(x, y, z)
    }
}