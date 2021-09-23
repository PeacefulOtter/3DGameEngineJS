
attribute vec3 position;
attribute vec2 texture;
attribute vec3 normal;
attribute vec4 color;

varying highp vec2 vtexture;
varying vec3 vnormal;
varying vec4 vcolor;

uniform vec3 translation;
uniform vec3 cameraTranslation;

void main() {
    vtexture = texture;
    vnormal = normal;

    vec3 t = translation + cameraTranslation;
    vec3 actualPos = position + t;
    gl_Position = vec4(actualPos.xyz, 1.0);

    vcolor = vec4(texture.x, texture.y, 0.0, 1.0);
}