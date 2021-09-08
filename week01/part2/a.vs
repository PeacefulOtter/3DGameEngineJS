
attribute vec2 position;
attribute vec4 color;

varying vec4 vcolor;


void main() {
    gl_Position = vec4(position.x, position.y, 0.0, 1.0);
    vcolor = color;
}