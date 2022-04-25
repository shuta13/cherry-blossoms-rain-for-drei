
#ifdef GL_ES
precision highp float;
#endif

uniform float time;
uniform vec2 resolution;
uniform vec3 color;
varying vec2 vUv;

// ref. https://codepen.io/UstymUkhman/pen/jpZGZW
float blossom(vec2 vUv, float scale) {
    float w = smoothstep(1.0, 0.0, -vUv.y * (scale / 10.0));
    
    if (w < 0.1) {
      return 0.0;
    }
    
    float c = time / scale;
    
    // Fall to left:
    vUv += c * 5.0;
    
    vUv.y += c;
    vUv.x -= c;

    vUv.y += c * 2.0;
    vUv.x += cos(vUv.y + time * 0.5) / scale;
    vUv   *= scale;

    vec2 s = floor(vUv);
    vec2 f = fract(vUv);
    vec2 p = vec2(0.0);

    float k = 3.0;
    float d = 0.0;
    
    p = 0.5 + 0.35 * sin(11.0 * fract(sin((s + p + scale) * mat2(7, 3, 6, 5)) * 5.0)) - f;
    d = length(p);
    k = min(d, k);

    k = smoothstep(0.0, k, sin(f.x + f.y) * 0.01);
    return k * w;
  }

  void main (void) {
    float size = mix(min(resolution.x, resolution.y), max(resolution.x, resolution.y), 0.5);
    // vec2 vUv = (gl_FragCoord.xy * 2.0 - resolution.xy) / size;
    float c = 1.0 - smoothstep(1.0, 0.0, clamp(vUv.y * 0.1 + 0.75, 0.0, 0.75));

    // c += blossom(vUv, 30.0) * 0.3;
    // c += blossom(vUv, 20.0) * 0.5;
    c += blossom(vUv, 15.0) * 0.8;

    c += blossom(vUv, 10.0);
    c += blossom(vUv, 5.0);
    c += blossom(vUv, 1.0);

    gl_FragColor = vec4(c, 1.0 - c * 0.3 * vUv.y, 1.0 - c * 0.1, 0.8); // 0.0
  }
