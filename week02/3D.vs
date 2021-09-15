
attribute vec3 position;
attribute vec2 texture;
attribute vec3 normal;
attribute vec4 color;

varying vec2 vtexture;
varying vec3 vnormal;
varying vec4 vcolor;

uniform vec3 translation;
uniform vec3 cameraTranslation;


void main() {
    vtexture = texture;
    vnormal = normal;
    vcolor = color;

    vec3 actualPos = position + translation + cameraTranslation;
    gl_Position = vec4(actualPos.xyz, 1.0);
}