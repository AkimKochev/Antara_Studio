export default class {
	constructor({element, elements}) {
		this.element = element;
		this.elements = elements;
		this.target = this.element;

		if ('IntersectionObserver' in window) {
			this.createObserver();

			this.animateOut();
		} else {
			this.animateIn();
		}
	}

	createObserver() {
		this.observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (!this.isVisible && entry.isIntersecting) {
					this.animateIn();
				} else {
					// this.animateOut();
				}
			});
		}).observe(this.target);
	}

	animateIn() {
		this.isVisible = true;
	}

	animateOut() {
		this.isVisible = false;
	}
}
