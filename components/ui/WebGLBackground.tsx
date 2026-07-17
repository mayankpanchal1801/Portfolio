"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Ambient WebGL particle field — a slow-rotating acid-lime sphere with
 * a violet dust cloud drifting behind it. Reacts to mouse (parallax)
 * and scroll (camera dolly). Fixed behind all page content.
 *
 * Skipped on prefers-reduced-motion and coarse-pointer devices to save
 * battery / preserve intent.
 */
export default function WebGLBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    const mount = mountRef.current;
    if (!mount) return;

    // ── Scene ─────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0c, 0.006);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // ── Acid particle sphere ──────────────────────────────────
    const sphereCount = 2500;
    const spherePos = new Float32Array(sphereCount * 3);
    for (let i = 0; i < sphereCount; i++) {
      const radius = 25;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      spherePos[i * 3 + 0] = x + (Math.random() - 0.5) * 5;
      spherePos[i * 3 + 1] = y + (Math.random() - 0.5) * 5;
      spherePos[i * 3 + 2] = z + (Math.random() - 0.5) * 5;
    }
    const sphereGeo = new THREE.BufferGeometry();
    sphereGeo.setAttribute("position", new THREE.BufferAttribute(spherePos, 3));
    const sphereMat = new THREE.PointsMaterial({
      size: 0.055,
      color: 0xd6ff3b, // --acid
      transparent: true,
      opacity: 0.42,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const sphereMesh = new THREE.Points(sphereGeo, sphereMat);
    scene.add(sphereMesh);

    // ── Violet dust cloud ─────────────────────────────────────
    const dustCount = 900;
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i++) {
      dustPos[i] = (Math.random() - 0.5) * 120;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 0.022,
      color: 0x6c5ce7, // --violet
      transparent: true,
      opacity: 0.28,
      depthWrite: false,
    });
    const dustMesh = new THREE.Points(dustGeo, dustMat);
    scene.add(dustMesh);

    // ── Interaction state ─────────────────────────────────────
    let targetX = 0;
    let targetY = 0;
    let scrollY = window.scrollY;
    const halfW = () => window.innerWidth / 2;
    const halfH = () => window.innerHeight / 2;

    const onMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX - halfW()) * 0.001;
      targetY = (e.clientY - halfH()) * 0.001;
    };
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // ── Render loop ───────────────────────────────────────────
    const clock = new THREE.Clock();
    let rafId = 0;
    let running = true;

    const tick = () => {
      if (!running) return;
      const t = clock.getElapsedTime();

      sphereMesh.rotation.y = t * 0.05;
      sphereMesh.rotation.x = t * 0.02;
      dustMesh.rotation.y = t * 0.02;

      camera.position.x += (targetX * 5 - camera.position.x) * 0.02;
      camera.position.y += (-targetY * 5 - camera.position.y) * 0.02;
      camera.position.z = 30 - scrollY * 0.005;
      camera.lookAt(scene.position);

      sphereMat.size = 0.055 + Math.sin(t * 2) * 0.02;

      renderer.render(scene, camera);
      rafId = window.requestAnimationFrame(tick);
    };
    tick();

    // ── Cleanup ───────────────────────────────────────────────
    return () => {
      running = false;
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);

      sphereGeo.dispose();
      sphereMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
}
