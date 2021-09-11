
attribute vec3 position;
attribute vec4 color;

varying vec4 vcolor;

uniform vec3 translation;


void main() {
    vec3 actualPos = position + translation;
    gl_Position = vec4(actualPos.xyz, 1.0);
    vcolor = color;
}