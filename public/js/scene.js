// A Worthy — Immersive Shader-Based 3D Hero
// Custom GLSL shaders for flowing abstract visuals

import * as THREE from 'three';

const canvas = document.getElementById('hero-3d');
if (!canvas) console.warn('Canvas #hero-3d not found');

if (canvas) {

const parent = canvas.parentElement;
const w = parent.clientWidth || window.innerWidth;
const h = parent.clientHeight || window.innerHeight;

// ─── Renderer ───
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(w, h);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x000000, 0);

// ─── Scene & Camera ───
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
camera.position.set(0, 0, 3);

// ═══════════════════════════════════════════════
// SHADER 1: Flowing Gradient Mesh (fullscreen BG)
// ═══════════════════════════════════════════════

const bgVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const bgFragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  varying vec2 vUv;

  // Simplex noise helpers
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                            + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                            dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;

    // Flowing noise field
    float n1 = snoise(uv * 2.0 + uTime * 0.08);
    float n2 = snoise(uv * 3.5 - uTime * 0.06 + 10.0);
    float n3 = snoise(uv * 1.5 + uTime * 0.04 + vec2(n1, n2) * 0.3);

    // Mouse influence (subtle warp)
    float mouseDist = length(uv - uMouse * 0.5 - 0.5);
    float mouseInfluence = smoothstep(0.6, 0.0, mouseDist) * 0.15;

    // Brand colours
    vec3 navy   = vec3(0.106, 0.165, 0.290);   // #1B2A4A
    vec3 gold   = vec3(0.788, 0.659, 0.298);   // #C9A84C
    vec3 cream  = vec3(0.961, 0.941, 0.910);   // #F5F0E8
    vec3 blue   = vec3(0.290, 0.478, 0.710);   // #4A7AB5
    vec3 white  = vec3(1.0, 1.0, 1.0);

    // Layer blending
    float blend1 = smoothstep(-0.3, 0.6, n1 + mouseInfluence);
    float blend2 = smoothstep(-0.2, 0.5, n2);
    float blend3 = smoothstep(-0.1, 0.4, n3);

    // Base is cream/white, with flowing navy and gold veins
    vec3 color = cream;
    color = mix(color, white, blend1 * 0.3);
    color = mix(color, mix(navy, blue, 0.3), blend2 * 0.25);
    color = mix(color, gold, blend3 * 0.2);

    // Soft gold highlights in certain areas
    float highlight = smoothstep(0.3, 0.8, n1 * n2 + 0.2);
    color = mix(color, mix(gold, cream, 0.5), highlight * 0.15);

    // Subtle vignette from edges
    float vignette = 1.0 - smoothstep(0.3, 1.2, length(uv - 0.5) * 1.4);
    color *= 0.92 + vignette * 0.08;

    gl_FragColor = vec4(color, 0.85);
  }
`;

const bgMat = new THREE.ShaderMaterial({
  vertexShader: bgVertexShader,
  fragmentShader: bgFragmentShader,
  uniforms: {
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(w, h) },
    uMouse: { value: new THREE.Vector2(0, 0) },
  },
  transparent: true,
  depthWrite: false,
});

const bgPlane = new THREE.Mesh(new THREE.PlaneGeometry(12, 8), bgMat);
bgPlane.position.z = -3;
scene.add(bgPlane);

// ═══════════════════════════════════════════════
// SHADER 2: Glowing Orb Mesh (floating sphere)
// ═══════════════════════════════════════════════

const orbVertexShader = `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;

  // Noise for vertex displacement
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise3D(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }

  void main() {
    vUv = uv;
    vNormal = normal;

    // Displace vertices with noise
    float displacement = snoise3D(position * 1.5 + uTime * 0.3) * 0.15;
    displacement += snoise3D(position * 3.0 - uTime * 0.2) * 0.08;

    vec3 newPos = position + normal * displacement;
    vPosition = newPos;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
  }
`;

const orbFragmentShader = `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;

  void main() {
    vec3 navy = vec3(0.106, 0.165, 0.290);
    vec3 gold = vec3(0.788, 0.659, 0.298);
    vec3 blue = vec3(0.290, 0.478, 0.710);
    vec3 cream = vec3(0.96, 0.94, 0.91);

    // Fresnel effect (edges glow)
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - max(dot(viewDir, normalize(vNormal)), 0.0), 3.0);

    // Flowing colour bands
    float band = sin(vPosition.y * 4.0 + uTime * 0.5) * 0.5 + 0.5;
    float band2 = cos(vPosition.x * 3.0 - uTime * 0.3 + vPosition.z * 2.0) * 0.5 + 0.5;

    vec3 baseColor = mix(navy, blue, band);
    baseColor = mix(baseColor, gold, band2 * 0.4);

    // Gold rim glow
    vec3 rimColor = mix(gold, cream, 0.3);
    vec3 finalColor = mix(baseColor, rimColor, fresnel * 0.7);

    // Subtle inner glow
    finalColor += gold * fresnel * 0.2;

    float alpha = 0.85 + fresnel * 0.15;
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

const orbMat = new THREE.ShaderMaterial({
  vertexShader: orbVertexShader,
  fragmentShader: orbFragmentShader,
  uniforms: {
    uTime: { value: 0 },
  },
  transparent: true,
  side: THREE.DoubleSide,
});

const orbGeo = new THREE.IcosahedronGeometry(0.9, 64);
const orbMesh = new THREE.Mesh(orbGeo, orbMat);
orbMesh.position.set(1.8, 0.2, 0);
scene.add(orbMesh);

// ═══════════════════════════════════════════════
// SHADER 3: Particle Ring (orbiting dots)
// ═══════════════════════════════════════════════

const ringCount = 300;
const ringGeo = new THREE.BufferGeometry();
const ringPositions = new Float32Array(ringCount * 3);
const ringPhases = new Float32Array(ringCount);
const ringRadii = new Float32Array(ringCount);

for (let i = 0; i < ringCount; i++) {
  const angle = (i / ringCount) * Math.PI * 2;
  const r = 1.2 + (Math.random() - 0.5) * 0.3;
  ringPositions[i * 3] = Math.cos(angle) * r;
  ringPositions[i * 3 + 1] = (Math.random() - 0.5) * 0.2;
  ringPositions[i * 3 + 2] = Math.sin(angle) * r;
  ringPhases[i] = Math.random() * Math.PI * 2;
  ringRadii[i] = r;
}

ringGeo.setAttribute('position', new THREE.BufferAttribute(ringPositions, 3));
ringGeo.setAttribute('aPhase', new THREE.BufferAttribute(ringPhases, 1));
ringGeo.setAttribute('aRadius', new THREE.BufferAttribute(ringRadii, 1));

const ringVertexShader = `
  uniform float uTime;
  attribute float aPhase;
  attribute float aRadius;
  varying float vAlpha;

  void main() {
    float angle = aPhase + uTime * 0.3;
    vec3 pos = vec3(
      cos(angle) * aRadius,
      position.y + sin(uTime * 0.5 + aPhase * 3.0) * 0.15,
      sin(angle) * aRadius
    );

    vAlpha = 0.3 + sin(uTime + aPhase * 5.0) * 0.2;

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = (3.0 + sin(aPhase + uTime) * 1.5) * (200.0 / -mvPos.z);
    gl_Position = projectionMatrix * mvPos;
  }
`;

const ringFragmentShader = `
  varying float vAlpha;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    float glow = 1.0 - smoothstep(0.0, 0.5, dist);
    glow = pow(glow, 2.0);

    vec3 gold = vec3(0.788, 0.659, 0.298);
    gl_FragColor = vec4(gold, glow * vAlpha);
  }
`;

const ringMat = new THREE.ShaderMaterial({
  vertexShader: ringVertexShader,
  fragmentShader: ringFragmentShader,
  uniforms: {
    uTime: { value: 0 },
  },
  transparent: true,
  depthWrite: false,
});

const ringMesh = new THREE.Points(ringGeo, ringMat);
ringMesh.position.copy(orbMesh.position);
scene.add(ringMesh);

// ═══════════════════════════════════════════════
// Ambient floating particles
// ═══════════════════════════════════════════════

const dustCount = 500;
const dustGeo = new THREE.BufferGeometry();
const dustPos = new Float32Array(dustCount * 3);
for (let i = 0; i < dustCount; i++) {
  dustPos[i * 3] = (Math.random() - 0.5) * 12;
  dustPos[i * 3 + 1] = (Math.random() - 0.5) * 7;
  dustPos[i * 3 + 2] = (Math.random() - 0.5) * 5 - 1;
}
dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
const dustMat = new THREE.PointsMaterial({
  color: 0xC9A84C,
  size: 0.012,
  transparent: true,
  opacity: 0.25,
  sizeAttenuation: true,
  depthWrite: false,
});
const dustMesh = new THREE.Points(dustGeo, dustMat);
scene.add(dustMesh);

// ─── Mouse ───
let mouseX = 0, mouseY = 0;
let targetMX = 0, targetMY = 0;
document.addEventListener('mousemove', (e) => {
  targetMX = (e.clientX / window.innerWidth - 0.5) * 2;
  targetMY = (e.clientY / window.innerHeight - 0.5) * 2;
});

// ─── Animation ───
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();

  mouseX += (targetMX - mouseX) * 0.03;
  mouseY += (targetMY - mouseY) * 0.03;

  // Camera
  camera.position.x = Math.sin(t * 0.08) * 0.3 + mouseX * 0.3;
  camera.position.y = Math.cos(t * 0.06) * 0.15 - mouseY * 0.15;
  camera.lookAt(0.5, 0, 0);

  // Update shader uniforms
  bgMat.uniforms.uTime.value = t;
  bgMat.uniforms.uMouse.value.set(mouseX, mouseY);
  orbMat.uniforms.uTime.value = t;
  ringMat.uniforms.uTime.value = t;

  // Orb gentle rotation
  orbMesh.rotation.y = t * 0.1;
  orbMesh.rotation.x = Math.sin(t * 0.07) * 0.1;
  orbMesh.position.y = 0.2 + Math.sin(t * 0.3) * 0.1;

  // Ring follows orb
  ringMesh.position.copy(orbMesh.position);
  ringMesh.rotation.x = Math.sin(t * 0.15) * 0.2;
  ringMesh.rotation.z = t * 0.05;

  // Dust
  dustMesh.rotation.y = t * 0.008;

  renderer.render(scene, camera);
}

animate();

// ─── Resize ───
function onResize() {
  const pw = parent.clientWidth || window.innerWidth;
  const ph = parent.clientHeight || window.innerHeight;
  camera.aspect = pw / ph;
  camera.updateProjectionMatrix();
  renderer.setSize(pw, ph);
  bgMat.uniforms.uResolution.value.set(pw, ph);
}
window.addEventListener('resize', onResize);

// ─── Reduced Motion ───
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  clock.stop();
  renderer.render(scene, camera);
}

} // end if (canvas)
