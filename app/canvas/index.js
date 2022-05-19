import * as THREE from 'three';
import Threejs from './About/index.js';
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js';
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js';
import gsap from 'gsap';

export default class Canvas {
	constructor({template}) {
		this.template = template;
	}
}
