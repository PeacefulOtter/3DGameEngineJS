
"use strict"


class KeyHandler
{
    static KeyCodes = {
        TOP: "z",
        RIGHT: "d",
        BOTTOM: "s",
        LEFT: "q",
    }

    static keyPressed = new Set()

    static handleClick = (e) => {
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left; // x position within the element.
        let y = e.clientY - rect.top;  // y position within the element.
        let halfSize = e.target.width / 2;
        let canvasX = x / halfSize - 1;
        let canvasY = -(y / halfSize - 1)

        let vertices = [ vec3(0.0, 0.5, 0), vec3(-0.5, -0.5, 0), vec3(0.5, -0.5, 0) ];
        vertices[0][0] += canvasX
        vertices[1][0] += canvasX
        vertices[2][0] += canvasX
        vertices[0][1] += canvasY
        vertices[1][1] += canvasY
        vertices[2][1] += canvasY

        const textures = [[vertices[0][0], vertices[0][1]],[vertices[1][0], vertices[1][1]], [vertices[2][0], vertices[2][1]]];

        let m = RawModel._constructWithVertices( vertices, textures, "rock2", ".png" )
        let s = new Shader( "2D.vs", "2D.fs" )
        let point = new Renderer2D( m, s );
        point.transform.scale(2);

        points.push(point)
    }

    static handleKeyPress = (e) => {
        let key = e.key; // string representation of the key pressed
        KeyHandler.keyPressed = KeyHandler.keyPressed.add(key)
    }

    static handleKeyUp = (e) => {
        KeyHandler.keyPressed.delete(e.key)
    }

    static update = (deltaTime) => {
        // dispatch the key event
        KeyHandler.keyPressed.forEach(key => {
            if ( Camera.keys.includes(key) )
                camera.move( key )
        });  
    }
}