import EventEmitter from 'events';
import gsap from 'gsap';

export default class Preloader extends EventEmitter {
	constructor() {
		super();
		this.parent = document.querySelector('.preloader');

		this.length = 0;
		this.loadAssets();
	}

	loadAssets() {
		this.images = document.querySelector('img');
		this.total = this.images.length - 1;

		setTimeout(() => {
			if (this.images.complete) {
				this.onLoad();
			} else {
				this.images.addEventListener('load', this.onLoad.bind(this));
				this.images.addEventListener('error', function () {
					alert('error');
				});
			}
		}, '500');
	}

	onLoad() {
		this.allLoaded();
	}

	destroy() {
		this.parent.remove();
	}

	allLoaded() {
		console.log(`asas`);
		const tl = gsap.timeline({
			onComplete: () => {
				this.destroy();
				this.emit('completed');
			},
			duration: 1.5,
			ease: 'power3.out',
		});

		tl.to(this.parent, {
			y: '-110%',
		});
	}
}
