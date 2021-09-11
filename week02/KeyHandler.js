
"use strict"


class KeyHandler
{
    static handleClick = (e, index) => {
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left; // x position within the element.
        let y = e.clientY - rect.top;  // y position within the element.
        let halfSize = e.target.width / 2;
        let canvasX = x / halfSize - 1;
        let canvasY = -(y / halfSize - 1)


        // KeyHandler.target.setAim(canvasX, canvasY)

        let vertices = [ vec2(0.0, 0.5), vec2(-0.5, -0.5), vec2(0.5, -0.5) ];
        vertices[0][0] += canvasX
        vertices[1][0] += canvasX
        vertices[2][0] += canvasX
        vertices[0][1] += canvasY
        vertices[1][1] += canvasY
        vertices[2][1] += canvasY

        let model = RawModel._constructWithVertices( vertices )
        let shader = new Shader( "2D.vs", "2D.fs" )
        let point = new Renderer2D( model, shader );
        points.push(point)
    }

    static handleKeyDown = (e) => {
        console.log(e);
    }

}