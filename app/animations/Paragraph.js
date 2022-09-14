import Animation from '../classes/Animation.js';
import gsap from 'gsap';
import {split} from '../utils/text.js';

export default class Paragraph extends Animation {
	constructor({element}) {
		const lines = [];

		const paragraphs = [...element.querySelectorAll('p, h2, h3, h4, h5, span')];
		if (paragraphs.length) {
			paragraphs.forEach((element) => {
				split({element});
				lines.push(...element.querySelectorAll('.line'));
			});
		}
		if (!paragraphs.length) {
			split({element});

			lines.push(...element.querySelectorAll('.line'));
		}

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
			word.style.transition = `transform 1s ${
				lineIndex * 0.06
			}s cubic-bezier(0.77, 0, 0.175, 1)`;
			word.style.transform = 'translateY(120%) rotate(0deg)';
		});
	}

	animateIn() {
		super.animateIn();

		this.elements.lines.forEach((word, lineIndex) => {
			word.style.transition = `transform 1s ${
				lineIndex * 0.06
			}s cubic-bezier(0.77, 0, 0.175, 1)`;
			word.style.transform = 'translateY(0%) rotate(0)';
		});
	}

	onResize() {}
}
