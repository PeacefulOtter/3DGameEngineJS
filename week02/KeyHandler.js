
"use strict"


class KeyHandler
{
    static handleClick = (e) => {
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left; //x position within the element.
        let y = e.clientY - rect.top;  //y position within the element.
        let halfSize = e.target.width / 2;
        let canvasX = x / halfSize - 1;
        let canvasY = -(y / halfSize - 1)


        KeyHandler.target.setPoint(canvasX, canvasY)
    }

    static handleKeyDown = (e) => {
        console.log(e);
    }

}