// Create grid and add pastel color click behavior; wire radius + gap sliders
document.addEventListener('DOMContentLoaded', () => {
	const container = document.querySelector('.grid-container');

	// create 10x10 = 100 squares
	for (let i = 0; i < 2500; i++) {
		const div = document.createElement('div');
		div.className = 'grid-square';
		container.appendChild(div);
	}

	// helper: random pastel HSL
	function getRandomPastel() {
		const h = Math.floor(Math.random() * 360);
		const s = Math.floor(60 + Math.random() * 20); // 60-80%
		const l = Math.floor(75 + Math.random() * 15); // 75-90%
		return `hsl(${h} ${s}% ${l}%)`;
	}
	//attach mouseover handler to the container (event delegation)
	let isMouseDown = false;

	// start black on mousedown
	container.addEventListener('mousedown', (e) => {
		isMouseDown = true;
		
	});

	// stop on mouseup anywhere
	window.addEventListener('mouseup', () => {
		isMouseDown = false;
	});

	container.addEventListener('mousemove', (e) => {
		const sq = e.target.closest('.grid-square');
		if (!sq || !container.contains(sq)) return;
		if (isMouseDown) {
			sq.style.background = 'black';
		} else {
			sq.style.background = getRandomPastel();
		}
	});
// color change to blue tones on button click
	const colorButton = document.getElementById('colorButton');
	if (colorButton) {
		colorButton.addEventListener('click', () => {
			const squares = container.querySelectorAll('.grid-square');
			squares.forEach(sq => {
				const h = Math.floor(200 + Math.random() * 80); // blue hues
				const s = Math.floor(60 + Math.random() * 20); // 60-80%
				const l = Math.floor(75 + Math.random() * 15); // 75-90%
				sq.style.background = `hsl(${h} ${s}% ${l}%)`;
	
			});
		});
	}
	// clear 5x5 via scroll
	container.addEventListener('wheel', (e) => {
		e.preventDefault();
		const sq = e.target.closest('.grid-square');
		if (!sq || !container.contains(sq)) return;	

		const squares = Array.from(container.querySelectorAll('.grid-square'));
		const index = squares.indexOf(sq);
		const gridSize = Math.sqrt(squares.length); // assuming square grid
		const row = Math.floor(index / gridSize);
		const col = index % gridSize;

		for (let r = row - 2; r <= row + 2; r++) {
			for (let c = col - 2; c <= col + 2; c++) {
				if (r >= 0 && r < gridSize && c >= 0 && c < gridSize) {
					const neighborIndex = r * gridSize + c;
					squares[neighborIndex].style.background = '#eee';
				}
			}
		}
	});
	 
// rotate colors in 9x9 area on right-click
	container.addEventListener('contextmenu', (e) => {
		e.preventDefault();
		const sq = e.target.closest('.grid-square');
		if (!sq || !container.contains(sq)) return;	

		const currentColor = sq.style.background;
		const squares = Array.from(container.querySelectorAll('.grid-square'));
		const index = squares.indexOf(sq);
		const gridSize = Math.sqrt(squares.length); // assuming square grid
		const row = Math.floor(index / gridSize);
		const col = index % gridSize;

		const neighbors = [];
		for (let r = row - 4; r <= row + 4; r++) {
			for (let c = col - 4; c <= col + 4; c++) {
				if (r >= 0 && r < gridSize && c >= 0 && c < gridSize) {
					const neighborIndex = r * gridSize + c;
					if (neighborIndex !== index) {
						neighbors.push(squares[neighborIndex]);
					}
				}
			}
		}

		const colors = neighbors.map(n => n.style.background);
		neighbors.forEach((n, i) => {
			n.style.background = i === 0 ? currentColor : colors[i - 1];
		});
	});
// fill 9x9 area on click
	container.addEventListener('click', (e) => {
		const sq = e.target.closest('.grid-square');
		if (!sq || !container.contains(sq)) return;
		
		const squares = Array.from(container.querySelectorAll('.grid-square'));
		const index = squares.indexOf(sq);
		const gridSize = Math.sqrt(squares.length); // assuming square grid
		const row = Math.floor(index / gridSize);
		const col = index % gridSize;

		for (let r = row - 4; r <= row + 4; r++) {
			for (let c = col - 4; c <= col + 4; c++) {
				if (r >= 0 && r < gridSize && c >= 0 && c < gridSize) {
					const neighborIndex = r * gridSize + c;
					squares[neighborIndex].style.background = getRandomPastel();
				}
			}
		}
	});

	// slider: control border-radius of all squares using CSS variable
	const radiusSlider = document.getElementById('radiusSlider');
	const radiusValue = document.getElementById('radiusValue');
	if (radiusSlider) {
		const setRadius = (v) => {
			container.style.setProperty('--cell-radius', v + 'px');
			if (radiusValue) radiusValue.textContent = v;
		};
		setRadius(radiusSlider.value);
		radiusSlider.addEventListener('input', (e) => setRadius(e.target.value));
	}



	// slider: control gap between squares
	const gapSlider = document.getElementById('gapSlider');
	const gapValue = document.getElementById('gapValue');
	if (gapSlider) {
		const setGap = (v) => {
			container.style.setProperty('--grid-gap', v + 'px');
			if (gapValue) gapValue.textContent = v;
		};
		setGap(gapSlider.value);
		gapSlider.addEventListener('input', (e) => setGap(e.target.value));
	}


// double-click to clear the canvas (set all squares to white)
    container.addEventListener('dblclick', () => {
        const squares = container.querySelectorAll('.grid-square');
		squares.forEach(sq => {
			sq.style.background = '#eee';
		});
	});

	
		});