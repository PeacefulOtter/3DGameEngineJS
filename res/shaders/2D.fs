precision mediump float;

varying highp vec2 vtexture;
varying vec4 vcolor;

uniform sampler2D diffuse;
uniform sampler2D normalMap;

void main() {
    // gl_FragColor = texture2D(diffuse, vtexture); 

    vec2 Resolution = vec2(512, 512);      //resolution of screen
    vec3 LightPos = vec3(0.0, 0.0, 1.0);        //light position, normalized
    vec4 LightColor = vec4(1.0, 0.8, 0.6, 1.0);      //light RGBA -- alpha is intensity
    vec4 AmbientColor = vec4(0.6, 0.6, 1.0, 0.2);    //ambient RGBA -- alpha is intensity 
    vec3 Falloff = vec3(0.3, 1.0, 2.0);

    //RGBA of our diffuse color
	vec4 DiffuseColor = texture2D(diffuse, vtexture);
	
	//RGB of our normal map
	vec3 NormalMap = texture2D(normalMap, vtexture).rgb;
    // NormalMap.g = 1.0 - NormalMap.g;
	
	//The delta position of light
	vec3 LightDir = vec3(LightPos.xy - (gl_FragCoord.xy / Resolution.xy), LightPos.z);
	
	//Correct for aspect ratio
	LightDir.x *= Resolution.x / Resolution.y;
	
	//Determine distance (used for attenuation) BEFORE we normalize our LightDir
	float D = length(LightDir);
	
	//normalize our vectors
	vec3 N = normalize(NormalMap * 2.0 - 1.0);
	vec3 L = normalize(LightDir);
	
	//Pre-multiply light color with intensity
	//Then perform "N dot L" to determine our diffuse term
	vec3 Diffuse = (LightColor.rgb * LightColor.a) * max(dot(N, L), 0.0);

	//pre-multiply ambient color with intensity
	vec3 Ambient = AmbientColor.rgb * AmbientColor.a;
	
	//calculate attenuation
	float Attenuation = 1.0 / ( Falloff.x + (Falloff.y*D) + (Falloff.z*D*D) );
	
	//the calculation which brings it all together
	vec3 Intensity = Ambient + Diffuse; // * Attenuation;
	vec3 FinalColor = DiffuseColor.rgb * Intensity;
    vec4 temp = texture2D(diffuse, vtexture);
	gl_FragColor = vec4(FinalColor, DiffuseColor.a);
}