
"use strict"

class Transform
{
    constructor()
    {
        this.translate = vec2(0, 0);
    }

    move = (x, y) => {
        this.translate = add(this.translate, vec2(x, y))
    }
}