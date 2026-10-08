/**
 * Z-THREAT GLOBE: Interactive Three.js Human Risk Intelligence Visualizer
 * Real-time particle sphere simulating human endpoint sensor nodes & threat interception
 */

export function initThreatGlobe(containerId) {
  const container = document.getElementById(containerId);
  if (!container || typeof THREE === 'undefined') return;

  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 240;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Group for rotation
  const globeGroup = new THREE.Group();
  scene.add(globeGroup);

  // 1. Create Core Wireframe Sphere
  const sphereGeo = new THREE.SphereGeometry(80, 28, 28);
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0x1e293b,
    wireframe: true,
    transparent: true,
    opacity: 0.25
  });
  const wireMesh = new THREE.Mesh(sphereGeo, wireMat);
  globeGroup.add(wireMesh);

  // 2. Create Point Cloud of Human Nodes
  const particleCount = 1800;
  const particleGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const baseColor = new THREE.Color(0x94a3b8);
  const emeraldColor = new THREE.Color(0x10b981);
  const crimsonColor = new THREE.Color(0xe11d48);

  const radius = 80;
  for (let i = 0; i < particleCount; i++) {
    // Distribute evenly on sphere using Fibonacci lattice
    const phi = Math.acos(-1 + (2 * i) / particleCount);
    const theta = Math.sqrt(particleCount * Math.PI) * phi;

    const x = radius * Math.cos(theta) * Math.sin(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(phi);

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    // Randomize colors (majority slate, some emerald defended, few crimson alert)
    const rand = Math.random();
    let col = baseColor;
    if (rand > 0.88) col = emeraldColor;
    else if (rand > 0.84) col = crimsonColor;

    colors[i * 3] = col.r;
    colors[i * 3 + 1] = col.g;
    colors[i * 3 + 2] = col.b;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particleMat = new THREE.PointsMaterial({
    size: 2.8,
    vertexColors: true,
    transparent: true,
    opacity: 0.85
  });

  const particleSystem = new THREE.Points(particleGeo, particleMat);
  globeGroup.add(particleSystem);

  // 3. Threat Interception Rings (Glowing Latitude/Longitude pulses)
  const ringGeo = new THREE.RingGeometry(85, 87, 64);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0xe11d48,
    transparent: true,
    opacity: 0.4,
    side: THREE.DoubleSide
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2;
  globeGroup.add(ring);

  // Mouse Interaction with Spring Inertia
  let mouseX = 0, mouseY = 0;
  let targetRotationX = 0, targetRotationY = 0;

  function onMouseMove(e) {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX = (x / rect.width) * 2;
    mouseY = (y / rect.height) * 2;
  }

  container.addEventListener('mousemove', onMouseMove);

  // Resize Handler
  function onResize() {
    if (!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }
  window.addEventListener('resize', onResize);

  // Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Subtle constant rotation + mouse response
    globeGroup.rotation.y += 0.0035;
    globeGroup.rotation.x += 0.001;

    targetRotationY = mouseX * 0.45;
    targetRotationX = mouseY * 0.45;

    globeGroup.rotation.y += (targetRotationY - globeGroup.rotation.y * 0.1) * 0.05;
    globeGroup.rotation.x += (targetRotationX - globeGroup.rotation.x * 0.1) * 0.05;

    // Pulse the ring
    const scale = 1 + Math.sin(elapsedTime * 2.5) * 0.06;
    ring.scale.set(scale, scale, scale);
    ringMat.opacity = 0.25 + Math.sin(elapsedTime * 3) * 0.2;

    renderer.render(scene, camera);
  }

  animate();
}
