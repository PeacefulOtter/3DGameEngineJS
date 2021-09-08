"use strict"

var gl;
var renderer;

let init = () => {

    let vertices = [ vec2(0.0, 0.5), vec2(-0.5, -0.5), vec2(0.5, -0.5) ];
    let model = new RawModel(vertices)
    renderer = new Renderer(model)

    gl.clearColor(1,0, 0, 0.2);
}

let render = () => {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    renderer.update()
    renderer.render()

    window.requestAnimationFrame(render)
}

let keyHandler = (e) => {

}

window.onload = () => {
    const canvas = document.getElementById( "gl-canvas" );
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    init()

    KeyHandler.target = renderer;
    document.onkeydown = (e) => { KeyHandler.handleKeyDown( e ) }
    canvas.onclick = (e) => { KeyHandler.handleClick( e ) }
    
    
    render()
};


