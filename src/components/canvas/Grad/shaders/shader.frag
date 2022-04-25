#ifdef GL_ES
precision highp float;
#endif

uniform float time;
uniform vec3 color;
varying vec2 vUv;

void main() {
  gl_FragColor.rgba = vec4(0.8 + 0.5 * sin(vUv.xyx + time) + color, 1.0);
}
