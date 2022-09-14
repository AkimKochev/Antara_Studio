export function split({element, expression = ' '}) {
	const splitted = element.innerHTML.split('<br>');
	const HTML = [];
	splitted.forEach((s) => {
		const el = document.createElement('span');
		const el2 = document.createElement('span');
		el2.innerHTML = s;
		const HTML2 = [];
		el2.innerHTML.split('').forEach((c) => {
			const el3 = document.createElement('span');
			el3.innerHTML = c;
			el3.classList.add('char');
			el3.style.display = c == ' ' ? 'inline' : 'inline-block';
			HTML2.push(el3);
		});
		el2.classList.add('line');
		el2.innerHTML = '';
		HTML2.forEach((c) => {
			el2.insertAdjacentElement('beforeend', c);
		});
		el2.style.display = 'inline-block';
		el.style.display = 'block';
		el.style.paddingInline = '15px';
		el.style.overflow = 'hidden';
		el.insertAdjacentElement('beforeend', el2);
		// console.log(el, s);
		HTML.push(el);
	});

	element.innerHTML = '';
	HTML.forEach((el) => {
		element.insertAdjacentElement('beforeend', el);
	});
	// console.log(splitted);
}
