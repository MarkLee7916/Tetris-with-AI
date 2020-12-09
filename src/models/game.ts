import { HEIGHT, WIDTH } from "../controllers/controller";
import { wait } from "../utils";
import { clearRow, fillAt, initEmptyGrid, isFilledAt } from "./grid";
import { Tetrimino } from "./tetrimino";

// The protocol we use to talk to the controller
export const enum GameMessages {
    ReplaceRow,
    FillGridTile,
    FillNextBlockTile,
    FillHoldTile,
    ClearNextBlock,
    ClearHoldBlock,
    ClearGridTile,
    ClearGrid
}

// Time we wait every time the current tetrimino moves. The lower this number is, the fast the game will flow
let delayTime: number;

// Pass a parameterized message to controller
let notifyController: (message: GameMessages, arg: any) => void;

// Tetrimino that will load after the current one
let nextTetrimino: Tetrimino;

// Tetrimino that player is holding
let holdingTetrimino: Tetrimino;

// The current tetrimino on the screen
let currTetrimino: Tetrimino;

// The relative position of the current tetrimino on the screen
let currRow: number;
let currCol: number;
let isAIRunning: boolean;

// Initialise state needed for game to function
export function initGame(notif: (message: GameMessages, arg: any) => void) {
    holdingTetrimino = new Tetrimino();
    nextTetrimino = new Tetrimino();
    isAIRunning = true;
    delayTime = 500;
    notifyController = notif;

    initEmptyGrid();
    renderHoldPreview();
}

// If AI is running, stop it running, if AI is not running, run it
export function toggleAI() {
    isAIRunning = !isAIRunning;
}

// Simulates the process of a tetrimino being generated, falling and hitting the ground, possibly clearing lines
export async function runTurn() {    
    configureNewTetrimino();

    if (isAIRunning) {
        runAI();
    }

    renderNextPreview();

    await makeCurrTetriminoFall();

    updateGridWithTetrimino(currTetrimino);
	handleLineClears();
}

export function isGameOver() {
	for (let col = 0; col < WIDTH; col++) {
		if (isFilledAt(0, col)) {
            return true;	
        }
    }

	return false;
}

export function rotateCurrTetrimino() {
    rotateTetrimino(currTetrimino);
}

export function moveCurrTetriminoLeft() {
    moveTetriminoLeft(currTetrimino);
}

export function moveCurrTetriminoRight() {
    moveTetriminoRight(currTetrimino);
}

export function moveCurrTetriminoDown() {
    moveTetriminoDown(currTetrimino);
}

export function updateDelayTime(newDelay: number) {
    delayTime = newDelay;
}

// Swap the current tetrimino with the one we're holding, dealing with rendering and failure case
export function hold() {
    if (canHold()) {
        renderClearTetrimino(currTetrimino);

        swapWithHold();

        renderHoldPreview();
        renderTetrimino(currTetrimino);
    }
}

// Simulate the tetrimino falling
async function makeCurrTetriminoFall() {
    while (canMoveTetriminoDown(currTetrimino, currRow, currCol)) {        
        moveTetriminoDown(currTetrimino);
        await wait(delayTime);
    }
}

// Rotate the tetrimino, handling failure cases
function rotateTetrimino(tet: Tetrimino) {
	renderClearTetrimino(tet);
	tet.nextRotation();

	if (!noCollisions(tet, currRow, currCol)) {
        tet.prevRotation();
    }

	renderTetrimino(tet);
}

function moveTetriminoLeft(tet: Tetrimino) {
	moveTetrimino(0, -1, (i: number) => tet.colAt(i) + currCol <= 0, tet);
}

function moveTetriminoRight(tet: Tetrimino) {
	moveTetrimino(0, 1, i => tet.colAt(i) + currCol >= WIDTH - 1, tet);
}

function moveTetriminoDown(tet: Tetrimino) {
	moveTetrimino(1, 0, i => tet.rowAt(i) + currRow  >= HEIGHT - 1, tet);
}

// Return the column and rotation of the best move we can make with the given tetriminoo
function computeOptimalMove(tet: Tetrimino): [number, number] {
    let maxRotation = Number.MIN_SAFE_INTEGER
    let maxCol = Number.MIN_SAFE_INTEGER;
    let maxHeuristic = Number.MIN_SAFE_INTEGER;

    for (let col = 0; col < WIDTH; col++) {
        for (let rotation = 0; rotation < Tetrimino.TILE_COUNT; rotation++) {     
            const heuristic = computeMoveHeuristic(tet, col);  
            
            tet.nextRotation();
            
            if (heuristic !== null && heuristic > maxHeuristic) {
                maxHeuristic = heuristic;
                maxCol = col;
                maxRotation = rotation
            }
        }
    }

    return [maxCol, maxRotation];
}

// Make current tetrimino the one stored in next and generate a new next, resetting row and column
function configureNewTetrimino() {
    currRow = 0;
    currCol = WIDTH / 2;
    currTetrimino = nextTetrimino;
    nextTetrimino = new Tetrimino();
}

// Make the optimal move
function runAI () {
    const [optimalCol, optimalRotations] = computeOptimalMove(currTetrimino);

    currCol = optimalCol

    for (let i = 0; i < optimalRotations; i++) {
        currTetrimino.nextRotation();
    } 
}

// Simulate a piece falling and use it to get the heuristic value for a tetrimino position and its rotation
function computeMoveHeuristic(tet: Tetrimino, col: number): number | null {
    let row = 0; 

    if (!noCollisions(tet, row, col)) {
        return null;
    }

    while (canMoveTetriminoDown(tet, row, col)) {              
        row++;
    }

    return computeHeuristic(tet, row, col);
}

// Calculate the heuristic value for a tetrimino position and its rotation
function computeHeuristic(tetrimino: Tetrimino, rowPos: number, colPos: number) {
    let rating = 0;

    for (let row = 1; row < HEIGHT; row++) {
        for (let col = 0; col < WIDTH; col++) {
            if (coordHasEmptyHole(tetrimino, row, col, rowPos, colPos)) {
                rating -= 10;
            }
        }
    }

    return rating - (HEIGHT - rowPos);
}

// Return true if position has an empty space with a filled piece on top of it
function coordHasEmptyHole(tet: Tetrimino, row: number, col: number, rowPos: number, colPos: number) {
    const isFilledAbove = !isFilledAt(row, col) && !tetriminoHasCoord(tet, row, col, rowPos, colPos) 
    const isEmptyBelow = isFilledAt(row - 1, col) || tetriminoHasCoord(tet, row - 1, col, rowPos, colPos);

    return isFilledAbove && isEmptyBelow;
}

// Return true if a tetriminos coordinates overlap with a given row and column
function tetriminoHasCoord(tetrimino: Tetrimino, targRow: number, targCol: number, rowPos: number, colPos: number) {
    return tetrimino.tiles().some(([row, col]) => row + rowPos === targRow && col + colPos === targCol);
}

function canHold() {
    return noCollisions(holdingTetrimino, currRow, currCol);
}

// Swap current tetrimino and holding tetrimino, doesn't deal with rendering or error cases
function swapWithHold() {
    const temp = currTetrimino;

    currTetrimino = holdingTetrimino;
    holdingTetrimino = temp;
}

// Tell the controller to update the holding preview with the current holding tetrimino
function renderHoldPreview() {
    notifyController(GameMessages.ClearHoldBlock, null);

    holdingTetrimino.tiles().forEach(([row, col]) => {
        notifyController(GameMessages.FillHoldTile, [row, col]);
    });
}

// Return true if the given tetrimino doesn't go out of bounds or overlap with another tetrimino
function noCollisions(tetrimino: Tetrimino, row: number, col: number) {
    return canMoveTetrimino(0, 0, i => tetrimino.rowAt(i) + row >= HEIGHT 
        || tetrimino.colAt(i) + col < 0 || tetrimino.colAt(i) + col >= WIDTH, 
           tetrimino, row, col);
}

// Tell the controller to update the next preview with the next tetrimino
function renderNextPreview() {
   notifyController(GameMessages.ClearNextBlock, null);

   nextTetrimino.tiles().forEach(([row, col]) => {
        notifyController(GameMessages.FillNextBlockTile, [row, col]);
    });
}

// Move tetrimino, handling error case
function moveTetrimino(rowMove: number, colMove: number, edgeGridCondition: (input: number) => boolean, tet: Tetrimino) {
	if (canMoveTetrimino(rowMove, colMove, edgeGridCondition, tet, currRow, currCol)) { 
        shiftTetrimino(rowMove, colMove, tet);
    }
}

// Move tetrimono, doesn't deal with error case
function shiftTetrimino(rowMove: number, colMove: number, tet: Tetrimino) {
	renderClearTetrimino(tet);
	
    currRow += rowMove;
    currCol += colMove;

	renderTetrimino(tet);
}

// Tell the controller to clear a tetrimino from the grid
function renderClearTetrimino(tetrimino: Tetrimino) {
	tetrimino.tiles().forEach(([row, col]) => {
        renderClearTile(row + currRow, col + currCol);
    });
}

// Tell the controller to clear a tile from the grid
function renderClearTile(row: number, col: number) {
    notifyController(GameMessages.ClearGridTile, [row, col]);
}

// Tell the controller to render a tetrimino in the grid
function renderTetrimino(tetrimino: Tetrimino) {
	tetrimino.tiles().forEach(([row, col]) => {
        renderTile(row + currRow, col + currCol);
    });
}

// Tell the controller to render a tile in the grid
function renderTile(row: number, col: number) {
    notifyController(GameMessages.FillGridTile, [row, col]);
}

// Update the grid backend with a tetriminos position
function updateGridWithTetrimino(tetrimino: Tetrimino) {
    tetrimino.tiles().forEach(([row, col]) => {
        fillAt(row + currRow, col + currCol);
    });
}
// Tell the controller to clear a row 
function renderClearRow(row: number) {
    notifyController(GameMessages.ReplaceRow, row);
}

// Detect if we've got a line clear, if we have clear it
function handleLineClears() {
	for (let row = 0; row < HEIGHT; row++) {
		if (isFilledLine(row)) {
            clearLine(row);
        }
    }
}

// Detect if we've got a line clear
function isFilledLine(row: number) {
	for (let col = 0; col < WIDTH; col++) {
		if (!isFilledAt(row, col)) {
            return false;
        }
    }
		
	return true;
}

function clearLine(row: number) {
    clearRow(row);

    renderClearRow(row);
}

function canMoveTetrimino(rowMove: number, colMove: number, 
                          edgeGridCondition: (input: number) => boolean, 
                          tetrimino: Tetrimino, 
                          row: number, col: number) {

	for (let i = 0; i < Tetrimino.TILE_COUNT; i++) {
		if (edgeGridCondition(i)) {
            return false;
        }

        if (isFilledAt(tetrimino.rowAt(i) + row + rowMove, tetrimino.colAt(i) + col + colMove)) {
            return false;
        }
    }		

	return true;
}

function canMoveTetriminoDown(tetrimino: Tetrimino, row: number, col: number) { 
	return canMoveTetrimino(1, 0, (i: number) => tetrimino.rowAt(i) + row  >= HEIGHT - 1, tetrimino, row, col);
}




