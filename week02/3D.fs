precision mediump float;

varying vec2 vtexture;
varying vec3 vnormal;
varying vec4 vcolor;

void main() {
    vec4 tex = vec4(vtexture.x, vtexture.y, 0.0, 0.0);
    vec4 nor = vec4(vnormal, 0.0);
    gl_FragColor = vcolor + nor + tex; 
    // vec4(1.0, 0.0, 1.0, 1.0);
}