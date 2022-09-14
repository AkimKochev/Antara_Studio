import Animation from '../classes/Animation.js';
import gsap from 'gsap';

export default class Button extends Animation {
	constructor({element}) {
		// const lines = [];
		const circle = element.querySelector('.navigate__svg__container');
		const arrow = element.querySelector('.navigate__svg__arrow');

		super({
			element,
			elements: {circle, arrow},
		});
		this.onResize();

		if ('IntersectionObserver' in window) {
			this.animateOut();
		}
	}

	animateOut() {
		super.animateOut();

		gsap.to(this.elements.circle, {
			opacity: 0,
			x: -50,
			transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
		});
		gsap.to(this.elements.arrow, {
			opacity: 0,
			x: 50,
			transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
		});
	}

	animateIn() {
		super.animateIn();

		gsap.to(this.elements.circle, {
			opacity: 1,
			x: 0,
			transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
		});
		gsap.to(this.elements.arrow, {
			opacity: 1,
			x: 0,
			transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
		});
	}

	onResize() {}
}
