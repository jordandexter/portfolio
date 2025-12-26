"use client"
import { RefObject, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTransform, useScroll } from 'framer-motion';
import { motion } from 'framer-motion';

interface SpacialEffectProps {
    scrollRef: RefObject<HTMLDivElement | null>
}

export function SpacialEffect({
    scrollRef
}: SpacialEffectProps) {
    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start start", "end start"]
    });

    const scaleScale = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

    const generatePointInScene = () => {
        const bound = 4500;
        const isNegative = Math.random() < 0.5 ? true : false
        let x = Math.random();
        if (isNegative)
            x = x * -1
        x = bound * x;
        return x;
    }

    const addSphere = (scene: any) => {
        const circleGeometry = new THREE.SphereGeometry(5, 5, 5);
        const circleMaterial = new THREE.MeshStandardMaterial({

        })
        const circleMesh = new THREE.Mesh(circleGeometry, circleMaterial)

        const pos = {
            x: generatePointInScene(),
            y: generatePointInScene(),
            z: generatePointInScene(),
        }
        circleMesh.position.set(pos.x, pos.y, pos.z)
        scene.add(circleMesh)
    }

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            50,
            window.innerWidth / window.innerHeight,
            1,
            6000
        );
        camera.position.z = 6400
        const canvas = document.getElementById('spacialeffect')
        if (!canvas) return;

        const renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: true,
        });

        renderer.setSize(window.innerWidth, window.innerHeight)

        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        ambientLight.castShadow = true;
        scene.add(ambientLight)

        const origin = new THREE.Object3D();
        origin.position.set(0, 0, 0)
        scene.add(origin)

        origin.add(camera)
        camera.lookAt(0, 0, 0)


        for (let i: number = 0; i < 1000; i++) {
            addSphere(scene)
        }

        const animate = () => {
            origin.rotation.y += 0.0016
            origin.rotation.x += 0.002
            renderer.render(scene, camera);
            window.requestAnimationFrame(animate)
        };
        animate()
    }, [])
    return (
        <motion.div className="fixed inset-0 overflow-hidden"
            style={{
                backgroundImage: 'linear-gradient(-35deg, #0c9ac540, #000000 70%)',
                opacity: scaleScale
            }}>
            <canvas id="spacialeffect" />
        </motion.div>
    );
}
