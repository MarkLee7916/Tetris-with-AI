import { HEIGHT, WIDTH} from "../controllers/controller";

let grid: boolean[][] = [];

export function initEmptyGrid() {
    for (let row = 0; row < HEIGHT; row++) {
		grid.push([]);
		for (let col = 0; col < WIDTH; col++) {
            grid[row].push(false);		
        }
	}
}

export function clearRow(row: number) {
    const emptyRow = new Array(WIDTH).map(elem => elem = false);
	const beforeRow = grid.slice(0, row);
	const afterRow = grid.slice(row + 1, HEIGHT);

	grid = [emptyRow].concat(beforeRow.concat(afterRow));
}

export function isFilledAt(row: number, col: number) {
	return grid[row][col];
}

export function fillAt(row: number, col: number) {
	if (row < 0 || col < 0 || row >= HEIGHT || col >= WIDTH) {
		throw `Invalid arguments, must be within bounds of grid. Supplied args were row: ${row} col: ${col}`;
	}

	grid[row][col] = true;
}
