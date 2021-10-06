"use strict"

var gl;
var renderer;
var camera;


var points = []; // temp

let init = () => {

    // let vertices = [ vec2(0.0, 0.5), vec2(-0.5, -0.5), vec2(0.5, -0.5) ];
    // renderer = new Renderer(vertices)
    let model = RawModel._constructWithOBJ( "alien.obj", "brick", ".jpg" )
    let shader = new Shader( "3D.vs", "3D.fs" )
    renderer = new Renderer3D( model, shader )
    renderer.transform.scale(0.5)

    /*let model2 = RawModel._constructWithOBJ( "cube.obj", "brick", ".jpg" )
    renderer2 = new Renderer3D( model2, shader )
    renderer2.transform.translate(0.5, 0, 0.5); */

    camera = new Camera(0, 0, 0.5);

    gl.clearColor(0, 0, 0.1, 0.12);
    
    
    gl.frontFace( gl.CW );
    gl.enable( gl.CULL_FACE ); // glDisable( GL_CULL_FACE );
    gl.cullFace( gl.BACK );
    gl.enable( gl.DEPTH_TEST );


    const ext = gl.getExtension("OES_element_index_uint");
    if ( !ext )
        console.log('Warning: unable to use an extension');



    /*gl.bindBuffer(gl.ARRAY_BUFFER, renderer.shader.attributes["position"]);
    gl.bufferData(gl.ARRAY_BUFFER, 8*100, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, renderer.shader.attributes["color"]);
    gl.bufferData(gl.ARRAY_BUFFER, 16*100, gl.STATIC_DRAW);*/
}

let currentTime = undefined;
let deltaTime = 0;

let render = (a) => {
    // UPDATE
    if ( currentTime === undefined )
        currentTime = a;
    else {
        deltaTime = a - currentTime;
        currentTime = a;
    }
    KeyHandler.update(deltaTime)

    // RENDER
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    renderer.update()
    renderer.render()

    // renderer2.update()
    // renderer2.render()

    points.forEach((point, i) => {
        point.update()
        point.render()
    });

    true ? window.requestAnimationFrame(render) : setTimeout(render, 1000)
}

window.onload = () => {
    const canvas = document.getElementById( "gl-canvas" );
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    init()

    document.onkeydown = (e) => { KeyHandler.handleKeyPress( e ) }
    document.onkeyup    =   (e) => { KeyHandler.handleKeyUp( e ) }
    canvas.onclick = (e) => { KeyHandler.handleClick( e ) }
    
    render()
};


