
attribute vec3 position;

attribute vec4 color;

varying vec4 vcolor;

uniform vec3 translation;
uniform vec3 cameraTranslation;

uniform mat4 transformationMatrix;
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;


void main() {
    vec4 worldPosition = transformationMatrix * vec4(position, 1.0);
    vec4 positionRelativeToCam = viewMatrix * worldPosition;
    gl_Position = projectionMatrix * positionRelativeToCam; //  

    // vec3 pos = position + translation + cameraTranslation;
    // gl_Position = vec4(pos.x, pos.y, pos.z, 1.0);
    
    vcolor = positionRelativeToCam;
}