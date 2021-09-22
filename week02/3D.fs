precision mediump float;

varying highp vec2 vtexture;
varying vec3 vnormal;
varying vec4 vcolor;

uniform sampler2D diffuse;


void main() {
    vec4 tex = vec4(vtexture.x, vtexture.y, 0.0, 0.0);
    vec4 nor = vec4(vnormal, 0.0);
    gl_FragColor = texture2D(diffuse, vtexture); // vec4(1.0, 0.0, 1.0, 1.0);
}