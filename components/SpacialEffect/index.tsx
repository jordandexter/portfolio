"use client"
import { useEffect } from 'react';
import * as THREE from 'three';

export function SpacialEffect() {
    const generatePointInScene = () => {
        const bound = 3500;
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


        for (let i: number = 0; i < 600; i++) {
            addSphere(scene)
        }

        const animate = () => {
            origin.rotation.y += 0.0003
            origin.rotation.x += 0.0002
            renderer.render(scene, camera);
            window.requestAnimationFrame(animate)
        };
        animate()
    }, [])
    return (
        <div className="fixed inset-0 overflow-hidden"
            style={{
                backgroundImage: 'linear-gradient(-35deg, #0c9ac540, #000000 70%)'
            }}>
            <canvas id="spacialeffect" />
        </div>
    );
}
