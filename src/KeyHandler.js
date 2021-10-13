
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

        const vertices = [
            [-0.5,0.5,0.0],
            [-0.5,-0.5,0.0],
            [0.5,-0.5,0.0],
            [ 0.5,0.5,0.0] 
         ];
         
        const textures = vertices.map(v => vec2(v[0] + 0.5, v[1] + 0.5))
         console.log(textures);

        const indices = [
            3,2,1,
            3,1,0
        ]

        let m = RawModel._constructWithVertices( vertices, textures, "rock2", ".png" )
        m.setIndices(indices)
        console.log(m);
        let s = new Shader( "2D.vs", "2D.fs" )
        let point = new Renderer3D( m, s );

        // point.transform.translate(canvasX, canvasY, 0)
        //point.transform.scale(2);

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