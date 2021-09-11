"use strict"

var gl;
var renderer;


var points = []; // temp

let init = () => {

    // let vertices = [ vec2(0.0, 0.5), vec2(-0.5, -0.5), vec2(0.5, -0.5) ];
    // renderer = new Renderer(vertices)
    let model = RawModel._constructWithOBJ( "sphere.obj" )
    let shader = new Shader( "3D.vs", "3D.fs" )
    renderer = new Renderer3D( model, shader )

    new RawModel()

    gl.clearColor(1,0, 0, 0.2);

    gl.bindBuffer(gl.ARRAY_BUFFER, renderer.shader.attributes["position"]);
    gl.bufferData(gl.ARRAY_BUFFER, 8*100, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, renderer.shader.attributes["color"]);
    gl.bufferData(gl.ARRAY_BUFFER, 16*100, gl.STATIC_DRAW);
}

let render = () => {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // renderer.update()
    renderer.render()

    points.forEach((point, i) => {
        point.update()
        point.render()
    });

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
    let index = 0;
    document.onkeydown = (e) => { KeyHandler.handleKeyDown( e ) }
    canvas.onclick = (e) => { KeyHandler.handleClick( e, index++ ) }
    
    
    render()
};


