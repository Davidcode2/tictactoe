const isWin = () => {
	if (mark.x1 == mark.x2 == mark.x3) return win;
	if (mark.y1 == mark.y2 == mark.y3) return win;
	if ((mark.x1 != mark.x2 != mark.x3)
		&& (mark.y1 != mark.y2 != mark.y3)) return win;
}

const board = (() => {

	const boardArray = (function(boardSize) {
		const point = (x, y) => {
			return { x, y, "set": null};
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

	console.log(boardArray[2]);
	const checkOccupied = (index) => (boardArray[index].set === null) ? false : true;
	const setOccupied = (index, player) => {
		if (checkOccupied(index)) return false;
		boardArray[index].set = player;
	}
	setOccupied(2, "player1");
	setOccupied(2, "player2");
	console.log(boardArray[2]);
	return {
		checkOccupied,
	}
})();

const player = () => {
	const placeMarker = (x, y) => {
	}
}

const game = () => {
	const switchTurn = (currentPlayer) => {
	}
	return {
		switchTurn
	}
}
