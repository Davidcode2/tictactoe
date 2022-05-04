
const player = () => {
	let currentPlayer;
	const placeMarker = (x, y) => {
	}
}

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
	const setOccupied = (index, player, field) => {
		if (checkOccupied(index)) return false;
		boardArray[index].set = player;
		return true;
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
		console.log(htmlFields);
		htmlFields.fieldArray.forEach(elem => {
			console.log(elem);
			boardElement.appendChild(elem);
		});
	}

	return {
		setOccupied,
		htmlFields,
		renderHtmlBoard,
		boardArray
	}
})();

const game = () => {
	const counterFactory = (() => {
		let counter = 0;
		return function() {
			counter++
			console.log(counter);
			return counter;
		}
	})();
	const startGame = () => {
	}
	let currentPlayer = "player1";
	const switchTurn = (currentPlayer) => {
		return (currentPlayer == "player1" ? "player2" : "player1");
	}
	const getPlayer = () => currentPlayer;

	let counter = counterFactory;
	board.htmlFields.fieldArray.forEach(elem => {
		elem.addEventListener('click', () => {
			let count = counter();
			if (!board.setOccupied(elem.id.slice(-1), currentPlayer)) return false;
			elem.classList.add(`marker-${getPlayer()}`);
			if (isWin(currentPlayer)) {
				console.log(`${currentPlayer} won`);
			}
			currentPlayer = switchTurn(getPlayer());
		});
	});
	const isWin = (player) => {
		let marksPlayer = board.boardArray.filter(elem => {
			return elem.set == player;
		});
		if (marksPlayer.length >= 3) {
			console.log(marksPlayer);
			for (let i = 0; i < marksPlayer.length; i++) {
				console.log(marksPlayer.filter(elem => elem.x != marksPlayer[i].x));
				return (marksPlayer.filter(elem => elem.x == marksPlayer[i].x).length == 3)
					|| (marksPlayer.filter(elem => elem.y == marksPlayer[i].y).length == 3)
					|| ((marksPlayer.find(elem => elem.x == 1 && elem.y == 1) && (marksPlayer.filter(elem => elem.x != marksPlayer[i].x).length >= 2)
						&& (marksPlayer.filter(elem => elem.y != marksPlayer[i].y)).length >= 2))
			}
		}
	}
	return Object.assign({}, { board }, { switchTurn }, { startGame }, { getPlayer })
}

let myGame = game();
myGame.board.renderHtmlBoard();
