
attribute vec3 position;
attribute vec2 texture;
attribute vec3 normal;
attribute vec4 color;

varying highp vec2 vtexture;
varying vec3 vnormal;
varying vec4 vcolor;

uniform vec3 translation;

uniform mat4 transformationMatrix;
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;

void main() {
    vtexture = texture;
    vnormal = normal;

    vec4 worldPosition = transformationMatrix * vec4(position, 1.0);
    vec4 positionRelativeToCam = viewMatrix * worldPosition;
    gl_Position = projectionMatrix * positionRelativeToCam + vec4(translation.xyz, 0.0);

    vcolor = vec4(1, 1, 1, 1); 
}