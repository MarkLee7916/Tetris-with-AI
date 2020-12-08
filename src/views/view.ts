import { HEIGHT, WIDTH } from "../controllers/controller";

export const enum ViewMessages {
    MoveLeft,
    MoveRight,
    MoveDown,
    Rotate,
    Hold
}

const WALL_COLOR = "white";
const PLACEHOLDER = "pink";
const PREVIEW_DISPLAY_SIZE = 4;

let notifyController: (message: ViewMessages, content: any) => void;

export function initView(notif: (message: ViewMessages, content: any) => void) {
    initGridInDOM();
    initHoldBlockDisplayDOM();
    initNextBlockDisplayDOM();
    initEventListeners();

    notifyController = notif;
}

export function eraseGridTileDOM([row, col]: [number, number]) {
    const tileDOM = getTileInDOM(row, col, "#grid");

    tileDOM.style.backgroundColor = WALL_COLOR;
}

export function fillGridTileDOM([row, col]: [number, number]) {
    fillTileDOM(row, col, "#grid");
}

export function replaceGridRowDOM(row: number) {
    const gridDOM = <HTMLTableElement> getDOMElem("#grid");

    gridDOM.deleteRow(row);
	gridDOM.insertBefore(createEmptyRowInDOM(WIDTH), gridDOM.rows[0]);
}

export function clearNextBlockDOM() {
    clearBlockDOM(PREVIEW_DISPLAY_SIZE, PREVIEW_DISPLAY_SIZE, "#next-block");
}

export function clearHoldBlockDOM() {
    clearBlockDOM(PREVIEW_DISPLAY_SIZE, PREVIEW_DISPLAY_SIZE, "#hold-block");
}

export function fillNextBlockTileDOM([row, col]: [number, number]) {
    fillTileDOM(row, col, "#next-block");
}

export function fillHoldBlockTileDOM([row, col]: [number, number]) {
    fillTileDOM(row, col, "#hold-block");
}

function clearBlockDOM(height: number, width: number, selector: string) {
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const tile = getTileInDOM(row, col, selector);

            tile.style.backgroundColor = WALL_COLOR;
        }
    }
}

function fillTileDOM(row: number, col: number, selector: string) {
    const elemDOM = getTileInDOM(row, col, selector)

    elemDOM.style.backgroundColor = PLACEHOLDER;
}

function initHoldBlockDisplayDOM() {
    initGeneric(PREVIEW_DISPLAY_SIZE, PREVIEW_DISPLAY_SIZE, "#hold-block");
}

function initNextBlockDisplayDOM() {
    initGeneric(PREVIEW_DISPLAY_SIZE, PREVIEW_DISPLAY_SIZE, "#next-block");
}

// Dynamically generate HTML for a plain grid
function initGridInDOM() {
    initGeneric(HEIGHT, WIDTH, "#grid");
}

function initGeneric(height: number, width: number, selector: string) {
    const elemDOM = getDOMElem(selector);

	for (let row = 0; row < height; row++) {
		elemDOM.append(createEmptyRowInDOM(width));
	}
}

function initEventListeners() {
    document.addEventListener("keydown", dealWithKeyPress);

    getDOMElem("#hold").addEventListener("click", () => notifyController(ViewMessages.Hold, null));
    getDOMElem("#reset").addEventListener("click", () => location.reload());
}

// Map key press onto action
function dealWithKeyPress(keyPress: KeyboardEvent) {
	const leftArrow = 37;
	const upArrow = 38;
	const rightArrow = 39;
    const downArrow = 40;
    const holdKey = 72;

	switch (keyPress.keyCode) {
		case upArrow:
			notifyController(ViewMessages.Rotate, null);
			break;
		case leftArrow:
			notifyController(ViewMessages.MoveLeft, null);
			break;
		case rightArrow:
			notifyController(ViewMessages.MoveRight, null);
			break;
		case downArrow:
			notifyController(ViewMessages.MoveDown, null);
            break;
        case holdKey:
            notifyController(ViewMessages.Hold, null);
            break;
	}
}

function createEmptyRowInDOM(length: number) {
    const newRow = document.createElement("tr");
    
	newRow.className = "row";

	for (let col = 0; col < length; col++)  {        
		newRow.append(createEmptyTileInDOM());
	}

	return newRow;
}

function createEmptyTileInDOM() {
	const newTile = document.createElement("td");

	newTile.className = "tile";
	newTile.style.backgroundColor = WALL_COLOR;

	return newTile;
}

function getTileInDOM(row: number, col: number, selector: string) {
    const gridDOM = <HTMLTableElement> getDOMElem(selector);
    const rowDOM = rowDOMAt(gridDOM, row);
    const tileDOM = colDOMAt(rowDOM, col);

    return tileDOM;
}

function rowDOMAt(gridDOM: HTMLTableElement, row: number) {
    if (row >= gridDOM.rows.length) {
        throw `Supplied value of row: ${row} was greater than max row size ${gridDOM.rows.length - 1}`;
    }

    return gridDOM.rows[row];
}

function colDOMAt(rowDOM: HTMLTableRowElement, col: number) {
    if (col >= rowDOM.cells.length) {
        throw `Supplied value of col: ${col} was greater than max row size ${rowDOM.cells.length - 1}`;
    }

    return rowDOM.cells[col];
}

function getDOMElem(selector: string) {
    const elemDOM: Element | null = document.querySelector(selector);

    if (elemDOM === null) {
        throw `Error querying selector ${selector} `
    } else {
        return <Element> elemDOM;
    }
}