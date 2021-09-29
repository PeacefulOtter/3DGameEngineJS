
attribute vec2 position;

attribute vec4 color;

varying vec4 vcolor;

uniform vec3 translation;
uniform vec3 cameraTranslation;


void main() {
    vec2 actualPos = position + translation.xy + cameraTranslation.xy;
    vec3 pos = vec3(actualPos.xy, cameraTranslation.z);
    gl_Position = vec4(pos.x, pos.y, pos.z, 1.0);
    vcolor = color;
}