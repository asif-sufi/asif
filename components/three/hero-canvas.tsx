"use client";

import { useEffect, useRef } from "react";

export function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let disposed = false;

    async function init() {
      if (!mountRef.current || window.innerWidth < 768 || navigator.hardwareConcurrency < 4) return;

      const THREE = await import("three");
      if (disposed || !mountRef.current) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, mountRef.current.clientWidth / 380, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
      renderer.setSize(mountRef.current.clientWidth, 380);
      mountRef.current.appendChild(renderer.domElement);

      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(6, 20, 20),
        new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: true })
      );
      scene.add(sphere);
      camera.position.z = 16;

      const animate = () => {
        sphere.rotation.y += 0.005;
        sphere.rotation.x += 0.003;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };

      animate();
    }

    init();
    return () => {
      disposed = true;
      mountRef.current?.replaceChildren();
    };
  }, []);

  return <div ref={mountRef} className="h-[380px] w-full" aria-hidden />;
}
