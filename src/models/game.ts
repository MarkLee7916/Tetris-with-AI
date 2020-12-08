import { HEIGHT, WIDTH } from "../controllers/controller";
import { deepCopy, wait } from "../utils";
import { clearRow, fillAt, isFilledAt } from "./grid";
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

let notifyController: (message: GameMessages, arg: any) => void;

let nextTetrimino: Tetrimino = new Tetrimino();
let holdingTetrimino: Tetrimino;
let currTetrimino: Tetrimino;

let currRow: number;
let currCol: number;

export function initGame(notif: (message: GameMessages, arg: any) => void) {
    notifyController = notif;
}

export async function fallingBlock() {    
    currRow = 0;
    currCol = WIDTH / 2;
    currTetrimino = nextTetrimino;
    nextTetrimino = new Tetrimino();

    // PUT AI CODE OUTSIDE OF THIS FUNCTION LATER
    const [optimalCol, optimalRotations] = computeOptimalMove();
    currCol = optimalCol;

    for (let i = 0; i < optimalRotations; i++) {
        currTetrimino.nextRotation();
    } 

    renderNextBlock();

    while (canMoveDown(currTetrimino, currRow, currCol)) {        
        moveDown();
        await wait();
    }

    updateGridWithBlock();
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

export function rotatePiece() {
	renderClearBlock();
	currTetrimino.nextRotation();

	if (!noCollisions(currTetrimino, currRow, currCol)) {
        currTetrimino.prevRotation();
    }

	renderBlock();
}

export function moveLeft() {
	moveBlock(0, -1, (i: number) => currTetrimino.colAt(i) + currCol <= 0);
}

export function moveRight() {
	moveBlock(0, 1, i => currTetrimino.colAt(i) + currCol >= WIDTH - 1);
}

export function moveDown() {
	moveBlock(1, 0, i => currTetrimino.rowAt(i) + currRow  >= HEIGHT - 1);
}

export function holdTetrimino() {
    if (canHoldTetrimino()) {
        renderClearBlock();

        swapWithHoldingTetrimino();

        renderHoldBlock();
        renderBlock();
    }
}

// NEEDS FIXED
export function computeOptimalMove(): [number, number] {
    let maxRotation = Number.MIN_SAFE_INTEGER
    let maxCol = Number.MIN_SAFE_INTEGER;
    let maxVal = Number.MIN_SAFE_INTEGER;

    for (let col = 0; col < WIDTH; col++) {
        for (let rotation = 0; rotation < Tetrimino.LENGTH; rotation++) {   
            const heuristic = computeMoveHeuristic(col, rotation);
            
            if (heuristic !== null && heuristic > maxVal) {
                maxVal = heuristic;
                maxCol = col;
                maxRotation = rotation
            }

            // TEMPORARY HACK: REMOVE LATER
            for (let i = 0; i < rotation; i++) {
                currTetrimino.prevRotation();
            }
        }
    }

    return [maxCol, maxRotation];
}

// NEEDS FIXED
function computeMoveHeuristic(col: number, rotation: number): number| null {
    // need deep copy
    const testTetrimino = currTetrimino;
    let row = 0; 

    for (let i = 0; i < rotation; i++) {
        testTetrimino.nextRotation();     
    }

    if (!noCollisions(testTetrimino, row, col)) {
        return null;
    }

    while (canMoveDown(testTetrimino, row, col)) {              
        row++;
    }

    return computeHeuristic(testTetrimino, row, col);
}

// NEEDS FIXED
function computeHeuristic(tetrimino: Tetrimino, relativeRow: number, relativeCol: number) {
    let rating = 0;

    for (let row = 1; row < HEIGHT; row++) {
        for (let col = 0; col < WIDTH; col++) {
            if (!isFilledAt(row, col) && !tetriminoHasCoord(tetrimino, row, col, relativeRow, relativeCol) 
            && (isFilledAt(row - 1, col) || tetriminoHasCoord(tetrimino, row - 1, col, relativeRow, relativeCol))) {
                rating -= 10;
            }
        }
    }

    return rating - (HEIGHT - relativeRow);
}

// NEEDS FIXED
function tetriminoHasCoord(tetrimino: Tetrimino, targetRow: number, targetCol: number, relativeRow: number, relativeCol: number) {
    return tetrimino.tiles().reduce((hasCoord, [row, col]) => hasCoord || row + relativeRow === targetRow && col + relativeCol === targetCol, false);
}

function canHoldTetrimino() {
    if (holdingTetrimino === undefined) {
        return noCollisions(nextTetrimino, currRow, currCol);
    } else {
        return noCollisions(holdingTetrimino, currRow, currCol);
    }
}

function swapWithHoldingTetrimino() {
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

function renderHoldBlock() {
    notifyController(GameMessages.ClearHoldBlock, null);

    holdingTetrimino.tiles().forEach(([row, col]) => {
        notifyController(GameMessages.FillHoldTile, [row, col]);
    });
}

function noCollisions(tetrimino: Tetrimino, row: number, col: number) {
    return canMoveBlock(0, 0, i => tetrimino.rowAt(i) + row >= HEIGHT 
        || tetrimino.colAt(i) + col < 0 || tetrimino.colAt(i) + col >= WIDTH, 
           tetrimino, row, col);
}

function renderNextBlock() {
   notifyController(GameMessages.ClearNextBlock, null);

   nextTetrimino.tiles().forEach(([row, col]) => {
        notifyController(GameMessages.FillNextBlockTile, [row, col]);
    });
}

function moveBlock(rowMove: number, colMove: number, edgeGridCondition: (input: number) => boolean) {
	if (canMoveBlock(rowMove, colMove, edgeGridCondition, currTetrimino, currRow, currCol)) { 
        shiftBlock(rowMove, colMove);
    }
}

function shiftBlock(rowMove: number, colMove: number) {
	renderClearBlock();
	
    currRow += rowMove;
    currCol += colMove;

	renderBlock();
}

function renderClearBlock() {
	currTetrimino.tiles().forEach(([row, col]) => {
        renderClearTile(row + currRow, col + currCol);
    });
}

function renderClearTile(row: number, col: number) {
    notifyController(GameMessages.ClearGridTile, [row, col]);
}

function renderBlock() {
	currTetrimino.tiles().forEach(([row, col]) => {
        renderTile(row + currRow, col + currCol);
    });
}

function renderTile(row: number, col: number) {
    notifyController(GameMessages.FillGridTile, [row, col]);
}

function updateGridWithBlock() {
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
function canMoveBlock(rowMove: number, colMove: number, 
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

function canMoveDown(tetrimino: Tetrimino, row: number, col: number) { 
	return canMoveBlock(1, 0, (i: number) => tetrimino.rowAt(i) + row  >= HEIGHT - 1, tetrimino, row, col);
}