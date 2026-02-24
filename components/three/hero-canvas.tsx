"use client";

import { useEffect, useRef } from "react";

export function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let disposed = false;
    const isLowPower = window.innerWidth < 768 || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const heroEnabled = process.env.NEXT_PUBLIC_3D_HERO !== "false";
    if (isLowPower || !heroEnabled) return;

    async function init() {
      if (!mountRef.current) return;

      const THREE = await import("three");
      if (disposed || !mountRef.current) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, mountRef.current.clientWidth / 380, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(mountRef.current.clientWidth, 380);
      mountRef.current.appendChild(renderer.domElement);

      const sphere = new THREE.Mesh(new THREE.SphereGeometry(6, 24, 24), new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: true }));
      const stars = new THREE.Points(
        new THREE.BufferGeometry().setFromPoints(Array.from({ length: 180 }, () => new THREE.Vector3((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30))),
        new THREE.PointsMaterial({ color: 0xa855f7, size: 0.08 })
      );

      scene.add(sphere);
      scene.add(stars);
      camera.position.z = 16;

      let raf = 0;
      const animate = () => {
        sphere.rotation.y += 0.004;
        sphere.rotation.x += 0.002;
        stars.rotation.y -= 0.0008;
        renderer.render(scene, camera);
        raf = requestAnimationFrame(animate);
      };
      animate();

      const onResize = () => {
        if (!mountRef.current) return;
        camera.aspect = mountRef.current.clientWidth / 380;
        camera.updateProjectionMatrix();
        renderer.setSize(mountRef.current.clientWidth, 380);
      };
      window.addEventListener("resize", onResize);

      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
      };
    }

    let cleanup: (() => void) | undefined;
    init().then((fn) => {
      cleanup = fn;
    });

    return () => {
      disposed = true;
      cleanup?.();
      mountRef.current?.replaceChildren();
    };
  }, []);

  return <div ref={mountRef} className="h-[380px] w-full" aria-hidden />;
}
