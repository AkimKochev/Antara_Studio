import gsap from 'gsap';
import Home from './pages/Home/index.js';
import Preloader from './classes/Preloader.js';

class App {
	constructor() {
		this.createPreloader();
	}

	createPreloader() {
		this.preloader = new Preloader();
		this.preloader.once('completed', () => {
			new Home();
		});
	}
}

new App();
