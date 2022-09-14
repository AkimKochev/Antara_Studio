import gsap from 'gsap';
import Paragraph from '../../animations/Paragraph.js';
import Title from '../../animations/Title.js';
import Button from '../../animations/Button.js';
import {split} from '../../utils/text.js';

export default class Home {
	constructor() {
		this.animateIn();
		this.scrollAnimation();
		this.scroll = 0;

		const element = [...document.querySelectorAll('[data-reveal]')];
		element.forEach((element) => {
			new Paragraph({element});
		});
		const titles = [...document.querySelectorAll('[data-reveal-title]')];
		titles.forEach((title) => {
			// console.log(title);
			new Title({element: title});
		});
		const btns = [...document.querySelectorAll('.navigate__to__svg')];
		btns.forEach((btn) => {
			new Button({element: btn});
		});

		this.titles = [...document.querySelectorAll('.selected__works__item')];
		this.wr = document.querySelector('.selected__works__wrapper');
		this.wr.addEventListener('mouseleave', (e) => {
			this.titles.forEach((el) => (el.style.opacity = 1));
		});
		this.titles.forEach((el) => {
			el.addEventListener('mouseover', (e) => {
				const not = this.titles.filter((e) => e !== el);
				not.forEach((el) => (el.style.opacity = 0.2));
				el.style.opacity = 1;
			});
			el.addEventListener('mouseleave', (e) => {
				this.titles.forEach((el) => (el.style.opacity = 0.2));
			});
		});
	}

	animateIn() {
		const navs = [...document.querySelectorAll('.navigation__item')];
		const logo = document.querySelector('.navigation__logo');

		gsap.from('.circle--bage', {
			opacity: 0,
			delay: 0.7,
			duration: 1,
			scale: 0.5,
		});
		gsap.from('.circle--grey', {
			delay: 1.2,
			opacity: 0,
			duration: 1,
			scale: 0.5,
		});

		const tl = gsap.timeline({
			ease: 'cubic-bezier(0.77, 0, 0.175, 1)',
		});

		tl
			.from(navs, {
				y: -50,
				opacity: 0,
				duration: 1,
				stagger: {
					amount: 0.4,
				},
			})
			.from(
				logo,
				{
					y: -50,
					opacity: 0,
					duration: 1,
				},
				'-=.4'
			);

		const lines = [];
		const titles = [...document.querySelectorAll('.title__item__text')];
		titles.forEach((title) => {
			split({element: title});
			lines.push(...title.querySelectorAll('.line'));
		});
		const first = [...lines[1].querySelectorAll('.char')];
		tl.from(
			[first[11], first[12], first[13]],
			{
				duration: 1,
				stagger: 0.015,
				transform: 'translateY(120%) skew(40deg)',
			},
			'-=1'
		);
		first.splice(11, 3);
		tl.from(
			first,
			{
				duration: 1,
				stagger: 0.015,
				transform: 'translateY(120%) skew(40deg)',
			},
			'-=.95'
		);
		lines.splice(1, 1);
		lines.reverse();

		lines.forEach((line) => {
			tl.from(
				[...line.querySelectorAll('.char')],
				{
					duration: 1,
					stagger: 0.015,
					transform: 'translateY(120%) skew(40deg)',
				},
				'<'
			);
		});

		const spanLines = [];
		const spans = document.querySelectorAll('.title__item__span');
		spans.forEach((span) => {
			split({element: span});
			spanLines.push(...span.querySelectorAll('.line'));
		});

		tl.from(
			spanLines,
			{
				duration: 1,
				stagger: 0.06,
				yPercent: 120,
			},
			'-=.7'
		);

		const lineArrow = document.querySelector('.line-arrow');
		gsap.set(lineArrow, {
			strokeDasharray: 200,
			strokeDashoffset: 200,
		});
		gsap.set(['.l1-arrow', '.l2-arrow'], {
			strokeDasharray: 100,
			strokeDashoffset: 100,
		});
		tl
			.from(
				'.scroll__svg__container',
				{
					opacity: 0,
					duration: 1,
				},
				'-=1.5'
			)
			.from(
				'.scroll__svg__outer',
				{
					duration: 1,
					rotateZ: '60deg',
				},
				'-=1.4'
			);
		tl
			.to(
				lineArrow,
				{
					strokeDashoffset: 0,
				},
				'-=1.2'
			)
			.to(
				['.l1-arrow', '.l2-arrow'],
				{
					duration: 1,
					strokeDashoffset: 0,
				},
				'-=.5'
			);
	}

	handleMouseWheel(event) {
		const outer = document.querySelector('.scroll__svg__outer');
		this.scroll = this.scroll - (event.deltaY / 10) * 2;
		gsap.to(outer, {
			rotateZ: this.scroll,
		});
	}

	scrollAnimation() {
		addEventListener('wheel', this.handleMouseWheel.bind(this));
	}
}

// this.elements.lines.forEach((word, lineIndex) => {
// 	word.style.transition = `transform 1s ${
// 		lineIndex * 0.06
// 	}s cubic-bezier(0.77, 0, 0.175, 1)`;
// 	word.style.transform = 'translateY(120%) rotate(0deg)';
// });
