import { HEIGHT, WIDTH } from "../controllers/controller";
import { wait } from "../utils";
import { clearRow, fillAt, initEmptyGrid, isFilledAt } from "./grid";
import { Tetrimino } from "./tetrimino";

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

const delayTime = 0;

let notifyController: (message: GameMessages, arg: any) => void;
let nextTetrimino: Tetrimino;
let holdingTetrimino: Tetrimino;
let currTetrimino: Tetrimino;
let currRow: number;
let currCol: number;
let isAIRunning: boolean;

export function initGame(notif: (message: GameMessages, arg: any) => void) {
    initEmptyGrid();

    nextTetrimino = new Tetrimino();
    isAIRunning = true;
    notifyController = notif;
}

export function toggleAI() {
    isAIRunning = isAIRunning ? false : true;
}

export async function fall() {    
    configureNewTetrimino();

    if (isAIRunning) {
        runAI();
    }

    renderNextPreview();

    while (canMoveTetriminoDown(currTetrimino, currRow, currCol)) {        
        moveCurrTetriminoDown();
        await wait(delayTime);
    }

    updateGridWithTetrimino();
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
	renderClearTetrimino();
	currTetrimino.nextRotation();

	if (!noCollisions(currTetrimino, currRow, currCol)) {
        currTetrimino.prevRotation();
    }

	renderTetrimino();
}

export function moveCurrTetriminoLeft() {
	moveCurrTetrimino(0, -1, (i: number) => currTetrimino.colAt(i) + currCol <= 0);
}

export function moveCurrTetriminoRight() {
	moveCurrTetrimino(0, 1, i => currTetrimino.colAt(i) + currCol >= WIDTH - 1);
}

export function moveCurrTetriminoDown() {
	moveCurrTetrimino(1, 0, i => currTetrimino.rowAt(i) + currRow  >= HEIGHT - 1);
}

export function hold() {
    if (canHold()) {
        renderClearTetrimino();

        swapWithHold();

        renderHoldPreview();
        renderTetrimino();
    }
}

export function computeOptimalMove(): [number, number] {
    let maxRotation = Number.MIN_SAFE_INTEGER
    let maxCol = Number.MIN_SAFE_INTEGER;
    let maxHeuristic = Number.MIN_SAFE_INTEGER;

    for (let col = 0; col < WIDTH; col++) {
        for (let rotation = 0; rotation < Tetrimino.LENGTH; rotation++) {     
            const heuristic = computeMoveHeuristic(col);  
            
            currTetrimino.nextRotation();
            
            if (heuristic !== null && heuristic > maxHeuristic) {
                maxHeuristic = heuristic;
                maxCol = col;
                maxRotation = rotation
            }
        }
    }

    return [maxCol, maxRotation];
}

function configureNewTetrimino() {
    currRow = 0;
    currCol = WIDTH / 2;
    currTetrimino = nextTetrimino;
    nextTetrimino = new Tetrimino();
}

function runAI () {
    const [optimalCol, optimalRotations] = computeOptimalMove();

    currCol = optimalCol

    for (let i = 0; i < optimalRotations; i++) {
        currTetrimino.nextRotation();
    } 
}


function computeMoveHeuristic(col: number): number | null {
    let row = 0; 

    if (!noCollisions(currTetrimino, row, col)) {
        return null;
    }

    while (canMoveTetriminoDown(currTetrimino, row, col)) {              
        row++;
    }

    return computeHeuristic(currTetrimino, row, col);
}

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
function coordHasEmptyHole(tetrimino: Tetrimino, row: number, col: number, rowPos: number, colPos: number) {
    const isFilledAbove = !isFilledAt(row, col) && !tetriminoHasCoord(tetrimino, row, col, rowPos, colPos) 
    const isEmptyBelow = isFilledAt(row - 1, col) || tetriminoHasCoord(tetrimino, row - 1, col, rowPos, colPos);

    return isFilledAbove && isEmptyBelow;
}

function tetriminoHasCoord(tetrimino: Tetrimino, targRow: number, targCol: number, rowPos: number, colPos: number) {
    return tetrimino.tiles().some(([row, col]) => row + rowPos === targRow && col + colPos === targCol);
}

function canHold() {
    if (holdingTetrimino === undefined) {
        return noCollisions(nextTetrimino, currRow, currCol);
    } else {
        return noCollisions(holdingTetrimino, currRow, currCol);
    }
}

function swapWithHold() {
    if (holdingTetrimino === undefined) {
        holdingTetrimino = currTetrimino;
        currTetrimino = nextTetrimino;
        nextTetrimino = new Tetrimino();
    } else {
        const temp = currTetrimino;

        currTetrimino = holdingTetrimino;
        holdingTetrimino = temp;
    }
}

function renderHoldPreview() {
    notifyController(GameMessages.ClearHoldBlock, null);

    holdingTetrimino.tiles().forEach(([row, col]) => {
        notifyController(GameMessages.FillHoldTile, [row, col]);
    });
}

function noCollisions(tetrimino: Tetrimino, row: number, col: number) {
    return canMoveTetrimino(0, 0, i => tetrimino.rowAt(i) + row >= HEIGHT 
        || tetrimino.colAt(i) + col < 0 || tetrimino.colAt(i) + col >= WIDTH, 
           tetrimino, row, col);
}

function renderNextPreview() {
   notifyController(GameMessages.ClearNextBlock, null);

   nextTetrimino.tiles().forEach(([row, col]) => {
        notifyController(GameMessages.FillNextBlockTile, [row, col]);
    });
}

function moveCurrTetrimino(rowMove: number, colMove: number, edgeGridCondition: (input: number) => boolean) {
	if (canMoveTetrimino(rowMove, colMove, edgeGridCondition, currTetrimino, currRow, currCol)) { 
        shiftCurrTetrimino(rowMove, colMove);
    }
}

function shiftCurrTetrimino(rowMove: number, colMove: number) {
	renderClearTetrimino();
	
    currRow += rowMove;
    currCol += colMove;

	renderTetrimino();
}

function renderClearTetrimino() {
	currTetrimino.tiles().forEach(([row, col]) => {
        renderClearTile(row + currRow, col + currCol);
    });
}

function renderClearTile(row: number, col: number) {
    notifyController(GameMessages.ClearGridTile, [row, col]);
}

function renderTetrimino() {
	currTetrimino.tiles().forEach(([row, col]) => {
        renderTile(row + currRow, col + currCol);
    });
}

function renderTile(row: number, col: number) {
    notifyController(GameMessages.FillGridTile, [row, col]);
}

function updateGridWithTetrimino() {
    currTetrimino.tiles().forEach(([row, col]) => {
        fillAt(row + currRow, col + currCol);
    });
}

function renderClearRow(row: number) {
    notifyController(GameMessages.ReplaceRow, row);
}

function handleLineClears() {
	for (let row = 0; row < HEIGHT; row++) {
		if (isFilledLine(row)) {
            clearLine(row);
        }
    }
}

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

// NEEDS FIXED
function canMoveTetrimino(rowMove: number, colMove: number, 
                          edgeGridCondition: (input: number) => boolean, 
                          tetrimino: Tetrimino, 
                          row: number, col: number) {

	for (let i = 0; i < Tetrimino.LENGTH; i++) {
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