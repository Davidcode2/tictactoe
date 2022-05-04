const board = (() => {
	const boardArray = (function(boardSize) {
		const point = (x, y) => {
			return { x, y, "set": null };
		}
		let boardArray = [];
		let counter = 0;
		for (let i = 0; i < boardSize; i++) {
			for (let j = 0; j < boardSize; j++) {
				boardArray[counter] = point(i, j);
				counter++;
			}
		}
		return boardArray;
	})(3);

	const checkOccupied = (index) => (boardArray[index].set === null) ? false : true;
	const setOccupied = (index, player) => {
		if (checkOccupied(index)) return false;
		boardArray[index].set = player;
		return true;
	}
	const resetOccupied = () => {
		boardArray.forEach(elem => elem.set = null);
	}

	const htmlFields = ((boardArray) => {
		let fieldArray = [];
		for (let i = 0; i < boardArray.length; i++) {
			let field = document.createElement("div");
			field.id = `field_${i}`;
			field.classList.add("field");
			fieldArray.push(field);
		}
		return {
			fieldArray
		}
	})(boardArray);

	const renderHtmlBoard = () => {
		const boardElement = document.querySelector(".board");
		htmlFields.fieldArray.forEach(elem => {
			boardElement.appendChild(elem);
		});
	}

	return {
		setOccupied,
		resetOccupied,
		htmlFields,
		renderHtmlBoard,
		boardArray
	}
})();

const game = () => {
	const counterFactory = (initial) => {
		let counter = initial;
		return function() {
			counter++
			console.log(counter);
			return counter;
		}
	}
	const startGame = () => {
		board.renderHtmlBoard();
	}
	let currentPlayer = "player1";
	const switchTurn = (currentPlayer) => {
		return (currentPlayer == "player1" ? "player2" : "player1");
	}
	const getPlayer = () => currentPlayer;

	let counter = counterFactory(0);
	board.htmlFields.fieldArray.forEach(elem => {
		elem.addEventListener('click', () => {
			if (!board.setOccupied(elem.id.slice(-1), currentPlayer)) return false;
			elem.classList.add(`marker-${getPlayer()}`);
			if (isWin(currentPlayer)) {
				console.log(`${currentPlayer} won`);
				displayWinMessage(currentPlayer, 'win');
			} else if (!board.boardArray.find(elem => elem.set == null)) {
				console.log("tied");
				displayWinMessage(currentPlayer, 'tie');
			}
			currentPlayer = switchTurn(getPlayer());
		});
	});

	const displayWinMessage = (player, result) => {
		let main = document.querySelector("main");
		let winMessageDiv = document.createElement('div');
		winMessageDiv.classList.add('wonMessage');
		player.includes("1") ? winMessageDiv.classList.add("p1") : winMessageDiv.classList.add('p2');
		let playerCapitalized = player.slice(0, 1).toUpperCase() + player.slice(1);
		if (result === 'win') {
			winMessageDiv.textContent = `${playerCapitalized} won this game`;
		} else {
			winMessageDiv.textContent = `It's a tie`;
		}
		main.appendChild(winMessageDiv);

		const makeTransparent = (() => {
			let fields = document.querySelectorAll('.field');
			fields.forEach(elem => elem.classList.add('transparent'));
		})()

		const addReplayButton = (() => {
			let main = document.querySelector('main');
			winMessageDiv.addEventListener('click', () => {
				const boardEl = document.querySelector('.board');
				let fields = document.querySelectorAll('.field');
				fields.forEach(elem => {
					elem.classList.remove('transparent', 'marker-player2', 'marker-player1');
				});
				board.resetOccupied();
				boardEl.remove();
				main.removeChild(winMessageDiv);
				let boardDiv = document.createElement('div');
				boardDiv.classList.add('board');
				main.appendChild(boardDiv);
				startGame();
			});
		})();
	}

	const isWin = (player) => {
		let marksPlayer = board.boardArray.filter(elem => {
			return elem.set == player;
		});
		if (marksPlayer.length >= 3) {
			console.log(marksPlayer);
			//for (let i = 0; i < marksPlayer.length; i++) {
			return (marksPlayer.filter(elem => elem.x == 0).length >= 3)
				|| (marksPlayer.filter(elem => elem.x == 1).length >= 3)
				|| (marksPlayer.filter(elem => elem.x == 2).length >= 3)
				|| (marksPlayer.filter(elem => elem.y == 0).length >= 3)
				|| (marksPlayer.filter(elem => elem.y == 1).length >= 3)
				|| (marksPlayer.filter(elem => elem.y == 2).length >= 3)
				||
				(
					(marksPlayer.find(elem => elem.x == 1 && elem.y == 1)
						&&
						(
							(
								(marksPlayer.find(elem => elem.x == 0 && elem.y == 2))
								&& (marksPlayer.find(elem => elem.x == 2 && elem.y == 0))
							)
							||
							(
								(marksPlayer.find(elem => elem.x == 0 && elem.y == 0))
								&& (marksPlayer.find(elem => elem.x == 2 && elem.y == 2))
							)
						)
					)
				)
		}
		//	}
	}
	return Object.assign({}, { board }, { startGame }, { getPlayer })
}

let myGame = game();
myGame.startGame();
