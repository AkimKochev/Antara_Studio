import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';

import vertex from 'shaders/vertex.glsl';
import fragment from 'shaders/fragment.glsl';

export default class {
	constructor() {
		this.clock = new THREE.Clock();
	}

	update() {
		// requestAnimationFrame(this.update.bind(this));
		this.renderer.render(this.scene, this.camera);
		this.controls.update();
		this.cube.rotation.x += 0.0001;
		this.cube.rotation.y += 0.001;

		this.sphere.rotation.x += 0.0001;
		this.sphere.rotation.y += 0.0001;
		// this.cube.position.set(2, 2, 2);

		const elapsedTime = this.clock.getElapsedTime();
		this.material.uniforms.uTime.value = elapsedTime;
	}

	destroyThreejs(obj) {
		while (obj.children.length > 0) {
			this.destroyThreejs(obj.children[0]);
			obj.remove(obj.children[0]);
		}
		if (obj.geometry) obj.geometry.dispose();

		if (obj.material) {
			//in case of map, bumpMap, normalMap, envMap ...
			Object.keys(obj.material).forEach((prop) => {
				if (!obj.material[prop]) return;
				if (
					obj.material[prop] !== null &&
					typeof obj.material[prop].dispose === 'function'
				)
					obj.material[prop].dispose();
			});
			obj.material.dispose();
		}
	}

	resize() {
		this.width = this.threeCanvas.offsetWidth;
		this.height = this.threeCanvas.offsetHeight;

		this.renderer.setSize(this.width, this.height);
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		this.camera.aspect = this.width / this.height;
		this.camera.updateProjectionMatrix(); // we need this to update the projection
	}
}
