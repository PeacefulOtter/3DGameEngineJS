"use strict"

var gl;

window.onload = () => {
    const canvas = document.getElementById( "gl-canvas" );
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    init()
    window.onkeydown = (e) => {}
    // ....
    window.requestAnimationFrame(render) // | gl.DEPTH_BUFFER_BIT
};


