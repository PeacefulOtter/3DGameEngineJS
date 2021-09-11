
attribute vec2 position;
attribute vec4 color;

varying vec4 vcolor;

uniform vec3 translation;


void main() {
    vec2 actualPos = position + translation.xy;
    gl_Position = vec4(actualPos.x, actualPos.y, 0.0, 1.0);
    vcolor = color;
}