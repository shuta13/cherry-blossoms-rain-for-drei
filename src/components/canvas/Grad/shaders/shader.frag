#ifdef GL_ES
precision highp float;
#endif

uniform float time;
uniform vec3 color;
varying vec2 vUv;

void main() {
  gl_FragColor.rgba = vec4(0.4 + 0.3 * sin(vUv.xxx + time) + color, 1.0);
}
