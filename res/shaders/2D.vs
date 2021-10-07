
attribute vec3 position;
attribute vec2 texture;

varying vec4 vcolor;
varying vec2 vtexture;

uniform vec3 translation;
uniform vec3 cameraTranslation;

uniform mat4 transformationMatrix;
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;


void main() {
    vec4 worldPosition = transformationMatrix * vec4(position, 1.0);
    vec4 positionRelativeToCam = viewMatrix * worldPosition;
    gl_Position = projectionMatrix * positionRelativeToCam; //  

    vtexture = texture;
    vcolor = projectionMatrix * positionRelativeToCam;
}