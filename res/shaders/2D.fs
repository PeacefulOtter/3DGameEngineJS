precision mediump float;

varying highp vec2 vtexture;
varying vec4 vcolor;

uniform sampler2D diffuse;

void main() {
    gl_FragColor = texture2D(diffuse, vtexture); 
}