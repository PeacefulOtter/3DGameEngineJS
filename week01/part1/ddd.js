window.onload = () => {
    let canvas = document.getElementById("c");
    let gl = canvas.getContext("webgl")
    // initShaders(gl, "a.vs", "a.fs")
    gl.clearColor(1,0, 0, 0.2);
    gl.clear(gl.COLOR_BUFFER_BIT);
}