// A Worthy — Immersive 3D Education Scene
// Three.js cinematic hero with floating education elements

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.162.0/build/three.module.js';
import { EffectComposer } from 'https://cdn.jsdelivr.net/npm/three@0.162.0/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.jsdelivr.net/npm/three@0.162.0/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://cdn.jsdelivr.net/npm/three@0.162.0/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'https://cdn.jsdelivr.net/npm/three@0.162.0/examples/jsm/postprocessing/OutputPass.js';

// ─── Brand Palette ───
const NAVY    = 0x1B2A4A;
const GOLD    = 0xC9A84C;
const OFFWHITE = 0xF5F0E8;
const WARMGOLD = 0xD4A853;
const DEEPNAVY = 0x0D1A2F;

// ─── Scene Setup ───
const canvas = document.getElementById('hero-3d');
if (!canvas) throw new Error('Canvas #hero-3d not found');

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(DEEPNAVY, 0.025);

const camera = new THREE.PerspectiveCamera(55, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
camera.position.set(0, 1.5, 8);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// ─── Post-Processing ───
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(canvas.clientWidth, canvas.clientHeight),
  0.5, 0.4, 0.88
);
composer.addPass(bloomPass);
composer.addPass(new OutputPass());

// ─── Lighting ───
const ambientLight = new THREE.AmbientLight(OFFWHITE, 0.3);
scene.add(ambientLight);

const goldLight = new THREE.PointLight(GOLD, 2.5, 30);
goldLight.position.set(4, 5, 3);
goldLight.castShadow = true;
scene.add(goldLight);

const blueLight = new THREE.PointLight(0x3366AA, 1.5, 25);
blueLight.position.set(-5, -2, 4);
scene.add(blueLight);

const rimLight = new THREE.PointLight(WARMGOLD, 1.0, 20);
rimLight.position.set(0, 3, -5);
scene.add(rimLight);

// ─── Materials ───
const navyMat = new THREE.MeshPhysicalMaterial({
  color: NAVY,
  metalness: 0.3,
  roughness: 0.4,
  clearcoat: 0.6,
  clearcoatRoughness: 0.1,
});

const goldMat = new THREE.MeshPhysicalMaterial({
  color: GOLD,
  metalness: 0.8,
  roughness: 0.15,
  clearcoat: 1.0,
  clearcoatRoughness: 0.05,
  emissive: GOLD,
  emissiveIntensity: 0.08,
});

const glassMat = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  metalness: 0.0,
  roughness: 0.05,
  transmission: 0.92,
  transparent: true,
  thickness: 0.5,
  ior: 1.5,
  clearcoat: 1.0,
});

const whiteMat = new THREE.MeshPhysicalMaterial({
  color: OFFWHITE,
  metalness: 0.1,
  roughness: 0.6,
  clearcoat: 0.3,
});

// ─── Floating Objects ───
const floatingGroup = new THREE.Group();
scene.add(floatingGroup);

// Helper: create a 3D book shape
function createBook(width, height, depth, material, spineMat) {
  const group = new THREE.Group();
  // Book body
  const body = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
  body.castShadow = true;
  group.add(body);
  // Spine accent
  const spine = new THREE.Mesh(
    new THREE.BoxGeometry(depth * 0.15, height * 1.01, depth * 1.01),
    spineMat || goldMat
  );
  spine.position.x = -width / 2;
  group.add(spine);
  // Pages (visible edge)
  const pages = new THREE.Mesh(
    new THREE.BoxGeometry(width * 0.92, height * 0.96, depth * 0.02),
    whiteMat
  );
  pages.position.x = width * 0.03;
  pages.position.z = depth / 2;
  group.add(pages);
  return group;
}

// Book stack
const book1 = createBook(1.2, 0.18, 0.9, navyMat, goldMat);
book1.position.set(-1.5, -0.5, 0);
book1.rotation.y = 0.3;
floatingGroup.add(book1);

const book2 = createBook(1.1, 0.15, 0.85, goldMat, navyMat);
book2.position.set(-1.4, -0.2, 0.1);
book2.rotation.y = -0.15;
book2.rotation.z = 0.05;
floatingGroup.add(book2);

const book3 = createBook(1.0, 0.14, 0.8, new THREE.MeshPhysicalMaterial({
  color: 0x8B4513,
  metalness: 0.2,
  roughness: 0.5,
  clearcoat: 0.4,
}), goldMat);
book3.position.set(-1.6, 0.05, -0.05);
book3.rotation.y = 0.5;
book3.rotation.z = -0.08;
floatingGroup.add(book3);

// Graduation cap
function createGradCap() {
  const group = new THREE.Group();
  // Board
  const board = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 0.06, 1.2),
    navyMat
  );
  board.castShadow = true;
  group.add(board);
  // Button on top
  const button = new THREE.Mesh(
    new THREE.SphereGeometry(0.06, 16, 16),
    goldMat
  );
  button.position.y = 0.06;
  group.add(button);
  // Tassel cord
  const tasselCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.06, 0),
    new THREE.Vector3(0.3, -0.1, 0.1),
    new THREE.Vector3(0.5, -0.4, 0.15),
  ]);
  const tasselGeo = new THREE.TubeGeometry(tasselCurve, 16, 0.012, 8, false);
  const tassel = new THREE.Mesh(tasselGeo, goldMat);
  group.add(tassel);
  // Tassel end
  const tEnd = new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.015, 0.12, 8),
    goldMat
  );
  tEnd.position.set(0.5, -0.46, 0.15);
  group.add(tEnd);
  // Crown
  const crown = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.45, 0.25, 4),
    navyMat
  );
  crown.position.y = -0.15;
  crown.rotation.y = Math.PI / 4;
  group.add(crown);
  return group;
}

const gradCap = createGradCap();
gradCap.position.set(1.8, 1.5, -1);
gradCap.rotation.z = -0.2;
gradCap.rotation.x = 0.15;
floatingGroup.add(gradCap);

// CASE letter cubes
const letterGeo = new THREE.BoxGeometry(0.55, 0.55, 0.55);
const letters = ['C', 'A', 'S', 'E'];
const letterMeshes = [];

letters.forEach((letter, i) => {
  const group = new THREE.Group();

  // Cube
  const mat = i % 2 === 0 ? navyMat.clone() : goldMat.clone();
  const cube = new THREE.Mesh(letterGeo, mat);
  cube.castShadow = true;
  group.add(cube);

  // Glow shell
  const glow = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 0.6, 0.6),
    new THREE.MeshBasicMaterial({
      color: i % 2 === 0 ? NAVY : GOLD,
      transparent: true,
      opacity: 0.08,
    })
  );
  group.add(glow);

  // Letter label using canvas texture
  const labelCanvas = document.createElement('canvas');
  labelCanvas.width = 128;
  labelCanvas.height = 128;
  const ctx = labelCanvas.getContext('2d');
  ctx.fillStyle = 'transparent';
  ctx.fillRect(0, 0, 128, 128);
  ctx.fillStyle = i % 2 === 0 ? '#C9A84C' : '#1B2A4A';
  ctx.font = 'bold 80px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(letter, 64, 64);

  const labelTex = new THREE.CanvasTexture(labelCanvas);
  const labelMat = new THREE.MeshBasicMaterial({
    map: labelTex,
    transparent: true,
    depthWrite: false,
  });
  const labelMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.45, 0.45), labelMat);
  labelMesh.position.z = 0.281;
  group.add(labelMesh);

  // Position in arc
  const angle = (i - 1.5) * 0.5;
  group.position.set(Math.sin(angle) * 2.5, 0.8 + Math.cos(i * 1.2) * 0.3, -1.5);
  group.rotation.y = angle * 0.3;

  floatingGroup.add(group);
  letterMeshes.push(group);
});

// Pencil
function createPencil() {
  const group = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.04, 1.4, 6),
    new THREE.MeshPhysicalMaterial({ color: WARMGOLD, metalness: 0.3, roughness: 0.5 })
  );
  body.castShadow = true;
  group.add(body);
  // Tip
  const tip = new THREE.Mesh(
    new THREE.ConeGeometry(0.04, 0.15, 6),
    new THREE.MeshPhysicalMaterial({ color: 0x2a2a2a, metalness: 0.1, roughness: 0.7 })
  );
  tip.position.y = -0.775;
  group.add(tip);
  // Eraser
  const eraser = new THREE.Mesh(
    new THREE.CylinderGeometry(0.045, 0.045, 0.1, 6),
    new THREE.MeshPhysicalMaterial({ color: 0xE87461, metalness: 0.0, roughness: 0.8 })
  );
  eraser.position.y = 0.75;
  group.add(eraser);
  // Metal band
  const band = new THREE.Mesh(
    new THREE.CylinderGeometry(0.048, 0.048, 0.06, 6),
    goldMat
  );
  band.position.y = 0.69;
  group.add(band);
  return group;
}

const pencil = createPencil();
pencil.position.set(2.2, -0.3, 1);
pencil.rotation.z = -0.6;
pencil.rotation.x = 0.2;
floatingGroup.add(pencil);

// A+ badge (glass sphere with text)
const badgeSphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.45, 32, 32),
  glassMat
);
badgeSphere.position.set(-2.5, 1.2, -0.5);
floatingGroup.add(badgeSphere);

// A+ text on badge
const aplusCanvas = document.createElement('canvas');
aplusCanvas.width = 256;
aplusCanvas.height = 256;
const apCtx = aplusCanvas.getContext('2d');
apCtx.fillStyle = 'rgba(27, 42, 74, 0.0)';
apCtx.fillRect(0, 0, 256, 256);
apCtx.fillStyle = '#C9A84C';
apCtx.font = 'bold 120px Inter, sans-serif';
apCtx.textAlign = 'center';
apCtx.textBaseline = 'middle';
apCtx.fillText('A+', 128, 128);
const aplusTex = new THREE.CanvasTexture(aplusCanvas);
const aplusLabel = new THREE.Mesh(
  new THREE.PlaneGeometry(0.6, 0.6),
  new THREE.MeshBasicMaterial({ map: aplusTex, transparent: true, depthWrite: false })
);
aplusLabel.position.copy(badgeSphere.position);
aplusLabel.position.z += 0.46;
floatingGroup.add(aplusLabel);

// Magnifying glass
function createMagnifier() {
  const group = new THREE.Group();
  // Lens ring
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.35, 0.04, 16, 32),
    goldMat
  );
  group.add(ring);
  // Lens
  const lens = new THREE.Mesh(
    new THREE.CircleGeometry(0.34, 32),
    new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.95,
      transparent: true,
      roughness: 0.0,
      metalness: 0.0,
      thickness: 0.2,
      ior: 1.6,
    })
  );
  group.add(lens);
  // Handle
  const handle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.035, 0.04, 0.6, 8),
    new THREE.MeshPhysicalMaterial({ color: 0x3a2a1a, metalness: 0.2, roughness: 0.6 })
  );
  handle.position.y = -0.6;
  handle.rotation.z = 0;
  group.add(handle);
  return group;
}

const magnifier = createMagnifier();
magnifier.position.set(2.8, 0.5, 0.5);
magnifier.rotation.z = 0.4;
magnifier.rotation.y = -0.3;
floatingGroup.add(magnifier);

// ─── Particle Field ───
const particleCount = 1500;
const particleGeo = new THREE.BufferGeometry();
const particlePositions = new Float32Array(particleCount * 3);
const particleSizes = new Float32Array(particleCount);

for (let i = 0; i < particleCount; i++) {
  const r = 15 + Math.random() * 25;
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
  particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
  particlePositions[i * 3 + 2] = r * Math.cos(phi);
  particleSizes[i] = 0.02 + Math.random() * 0.06;
}

particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
particleGeo.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));

const particleMat = new THREE.PointsMaterial({
  color: GOLD,
  size: 0.05,
  transparent: true,
  opacity: 0.5,
  sizeAttenuation: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
});

const particles = new THREE.Points(particleGeo, particleMat);
scene.add(particles);

// ─── Ground Plane ───
const groundGeo = new THREE.PlaneGeometry(40, 40);
const groundMat = new THREE.MeshStandardMaterial({
  color: NAVY,
  transparent: true,
  opacity: 0.06,
  metalness: 0.5,
  roughness: 0.5,
});
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -2;
scene.add(ground);

// ─── Mouse Tracking ───
let mouseX = 0, mouseY = 0;
let targetMouseX = 0, targetMouseY = 0;

document.addEventListener('mousemove', (e) => {
  targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

// ─── Scroll Tracking ───
let scrollY = 0;
window.addEventListener('scroll', () => {
  scrollY = window.scrollY;
});

// ─── Animation Loop ───
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();

  // Smooth mouse following
  mouseX += (targetMouseX - mouseX) * 0.03;
  mouseY += (targetMouseY - mouseY) * 0.03;

  // Camera idle drift + mouse parallax
  camera.position.x = Math.sin(t * 0.12) * 0.5 + mouseX * 0.4;
  camera.position.y = 1.5 + Math.cos(t * 0.08) * 0.3 - mouseY * 0.2;
  camera.position.z = 8 - scrollY * 0.002;
  camera.lookAt(0, 0.3, 0);

  // Float the entire group gently
  floatingGroup.position.y = Math.sin(t * 0.5) * 0.15;
  floatingGroup.rotation.y = Math.sin(t * 0.15) * 0.08;

  // Individual object animations
  // Books bob
  book1.position.y = -0.5 + Math.sin(t * 0.7) * 0.08;
  book2.position.y = -0.2 + Math.sin(t * 0.8 + 1) * 0.06;
  book3.position.y = 0.05 + Math.sin(t * 0.6 + 2) * 0.07;

  // Grad cap floats and tilts
  gradCap.position.y = 1.5 + Math.sin(t * 0.4) * 0.2;
  gradCap.rotation.z = -0.2 + Math.sin(t * 0.3) * 0.1;

  // CASE cubes rotate gently
  letterMeshes.forEach((mesh, i) => {
    mesh.rotation.y = t * 0.2 + i * 0.5;
    mesh.rotation.x = Math.sin(t * 0.3 + i) * 0.15;
    mesh.position.y = 0.8 + Math.sin(t * 0.5 + i * 1.5) * 0.15;
  });

  // Pencil spins slowly
  pencil.rotation.z = -0.6 + Math.sin(t * 0.25) * 0.15;
  pencil.position.y = -0.3 + Math.sin(t * 0.45 + 0.5) * 0.12;

  // A+ badge pulses
  const badgeScale = 1 + Math.sin(t * 1.5) * 0.05;
  badgeSphere.scale.set(badgeScale, badgeScale, badgeScale);
  aplusLabel.position.z = badgeSphere.position.z + 0.46;

  // Magnifier tilts
  magnifier.rotation.z = 0.4 + Math.sin(t * 0.35) * 0.12;
  magnifier.position.y = 0.5 + Math.sin(t * 0.55) * 0.1;

  // Particles rotate slowly
  particles.rotation.y = t * 0.015;
  particles.rotation.x = Math.sin(t * 0.01) * 0.1;

  // Light animation
  goldLight.position.x = 4 + Math.sin(t * 0.2) * 1.5;
  goldLight.position.z = 3 + Math.cos(t * 0.15) * 1;

  // Render
  composer.render();
}

animate();

// ─── Resize Handler ───
function onResize() {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
  composer.setSize(w, h);
}

window.addEventListener('resize', onResize);

// ─── Reduced Motion ───
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // Stop auto-animation, just render once
  clock.stop();
  composer.render();
}
