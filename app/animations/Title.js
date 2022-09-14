import Animation from '../classes/Animation.js';
import gsap from 'gsap';
import {split} from '../utils/text.js';

export default class Title extends Animation {
	constructor({element}) {
		const lines = [];

		// console.log(element);
		const paragraphs = [...element.querySelectorAll('h1')];
		if (paragraphs.length) {
			paragraphs.forEach((element) => {
				split({element});
				// console.log(lines);
				lines.push(...element.querySelectorAll('.char'));
			});
		}
		if (!paragraphs.length) {
			split({element});

			lines.push(...element.querySelectorAll('.char'));
		}
		// console.log(lines);

		super({
			element,
			elements: {lines},
		});

		this.onResize();

		if ('IntersectionObserver' in window) {
			this.animateOut();
		}
	}

	animateOut() {
		super.animateOut();

		this.elements.lines.forEach((word, lineIndex) => {
			word.style.transition = `transform 2s ${
				lineIndex * 0.04
			}s cubic-bezier(0.77, 0, 0.175, 1)`;
			word.style.transform = 'translateY(120%) skew(30deg)';
		});
	}

	animateIn() {
		super.animateIn();

		this.elements.lines.forEach((word, lineIndex) => {
			word.style.transition = `transform 2s ${
				lineIndex * 0.04
			}s cubic-bezier(0.77, 0, 0.175, 1)`;
			word.style.transform = 'translateY(0%) skew(0)';
		});
	}

	onResize() {}
}
