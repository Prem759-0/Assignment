import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../lib/ThemeContext';
import { X, RotateCcw, ZoomIn, ZoomOut, Sun } from 'lucide-react';
import * as THREE from 'three';

const CHARACTER_1 = "https://media.base44.com/images/public/6a0c0fa74b1d8be3ed6a3a2a/c377483d3_generated_a2efaeb7.png";

export default function Character3DViewer({ onClose }) {
  const { theme } = useTheme();
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const [lightIntensity, setLightIntensity] = useState(1.2);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(theme.bg);
    scene.fog = new THREE.Fog(theme.bg, 8, 20);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set(0, 0.5, 4.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    mount.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, lightIntensity * 1.5);
    keyLight.position.set(3, 4, 3);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(theme.primary.replace('#', '0x') || 0x7c3aed, lightIntensity, 8);
    fillLight.position.set(-2, 1, 2);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0x00ffcc, lightIntensity * 0.6, 6);
    rimLight.position.set(0, 2, -3);
    scene.add(rimLight);

    const accentLight = new THREE.PointLight(0xccff00, lightIntensity * 0.8, 5);
    accentLight.position.set(2, -1, 2);
    scene.add(accentLight);

    // Floor plane
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.MeshStandardMaterial({ color: 0x111118, roughness: 0.9, metalness: 0.1 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.6;
    floor.receiveShadow = true;
    scene.add(floor);

    // Character plane with texture
    const loader = new THREE.TextureLoader();
    loader.load(CHARACTER_1, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      const aspect = texture.image.width / texture.image.height;
      const geo = new THREE.PlaneGeometry(2.4 * aspect, 2.4);

      // Custom shader material for rim glow
      const mat = new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        alphaTest: 0.05,
        side: THREE.DoubleSide,
        roughness: 0.3,
        metalness: 0.1,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.castShadow = true;
      mesh.position.set(0, 0.1, 0);
      scene.add(mesh);
      sceneRef.current = { mesh, keyLight, fillLight, rimLight, accentLight };
      setIsLoaded(true);
    });

    // Particle field
    const particleGeo = new THREE.BufferGeometry();
    const count = 180;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) positions[i] = (Math.random() - 0.5) * 12;
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particleGeo,
      new THREE.PointsMaterial({ color: 0xccff00, size: 0.025, transparent: true, opacity: 0.5 })
    );
    scene.add(particles);

    // Orbit ring
    const ringGeo = new THREE.TorusGeometry(1.6, 0.008, 8, 80);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.35 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.2;
    scene.add(ring);

    // Mouse drag rotate
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let rotY = 0, rotX = 0;

    const onDown = (e) => { isDragging = true; prevMouse = { x: e.clientX, y: e.clientY }; };
    const onUp = () => { isDragging = false; };
    const onMove = (e) => {
      if (!isDragging || !sceneRef.current) return;
      const dx = e.clientX - prevMouse.x;
      const dy = e.clientY - prevMouse.y;
      rotY += dx * 0.008;
      rotX += dy * 0.004;
      rotX = Math.max(-0.5, Math.min(0.5, rotX));
      sceneRef.current.mesh.rotation.y = rotY;
      sceneRef.current.mesh.rotation.x = rotX;
      ring.rotation.y = rotY * 0.4;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    // Touch
    const onTouchStart = (e) => { isDragging = true; prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };
    const onTouchMove = (e) => {
      if (!isDragging || !sceneRef.current) return;
      const dx = e.touches[0].clientX - prevMouse.x;
      const dy = e.touches[0].clientY - prevMouse.y;
      rotY += dx * 0.008;
      sceneRef.current.mesh.rotation.y = rotY;
      ring.rotation.y = rotY * 0.4;
      prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    mount.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('mousemove', onMove);
    mount.addEventListener('touchstart', onTouchStart, { passive: true });
    mount.addEventListener('touchend', onUp);
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    // Animate
    let frame;
    let t = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      t += 0.016;
      particles.rotation.y += 0.0015;
      ring.rotation.z += 0.002;
      if (!isDragging && sceneRef.current) {
        sceneRef.current.mesh.rotation.y += (0 - sceneRef.current.mesh.rotation.y) * 0.02;
      }
      if (sceneRef.current) {
        sceneRef.current.fillLight.intensity = lightIntensity * (1 + 0.15 * Math.sin(t * 1.2));
        sceneRef.current.accentLight.intensity = lightIntensity * (0.8 + 0.15 * Math.cos(t * 0.9));
      }
      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frame);
      mount.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('mousemove', onMove);
      mount.removeEventListener('touchstart', onTouchStart);
      mount.removeEventListener('touchend', onUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [theme.bg, lightIntensity]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6"
      style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(16px)', animation: 'fadeIn 0.2s ease' }}>

      <div className="relative w-full max-w-4xl rounded-3xl overflow-hidden"
        style={{ background: '#0d0d14', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 40px 120px rgba(0,0,0,0.8)', height: 'min(600px, 90vh)' }}>

        {/* Header bar */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-5 py-3"
          style={{ background: 'linear-gradient(to bottom, rgba(13,13,20,0.95), transparent)' }}>
          <div>
            <p className="text-white font-black text-sm tracking-tight">Neon Wanderer <span className="text-white/30 font-medium text-xs">— 3D Viewer</span></p>
            <p className="text-white/30 text-[10px] font-bold tracking-widest uppercase">Drag to rotate · Pinch to zoom</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Canvas mount */}
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              <p className="text-white/40 text-xs font-bold tracking-widest uppercase">Loading 3D Scene</p>
            </div>
          </div>
        )}

        {/* Controls bar */}
        <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between px-5 py-3"
          style={{ background: 'linear-gradient(to top, rgba(13,13,20,0.95), transparent)' }}>
          <div className="flex items-center gap-2">
            <Sun className="w-3.5 h-3.5 text-white/40" />
            <input
              type="range" min="0.3" max="2.5" step="0.1"
              value={lightIntensity}
              onChange={(e) => setLightIntensity(parseFloat(e.target.value))}
              className="w-24 accent-[#ccff00] cursor-pointer"
            />
            <span className="text-white/30 text-[10px] font-mono">{lightIntensity.toFixed(1)}x</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/20 text-[10px] font-bold tracking-widest uppercase">Edition #001 / 184</span>
          </div>
        </div>
      </div>
    </div>
  );
}
