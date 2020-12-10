import { HEIGHT, WIDTH } from "../controllers/controller";

// The protocol we use to talk to the controller
export const enum ViewMessages {
    MoveLeft,
    MoveRight,
    MoveDown,
    Rotate,
    Hold,
    ToggleAI,
    ChangeSpeed
}

const GRID_BACKGROUND_COLOR = "white";
const ACTIVE_BUTTON_COLOR = "#7FDBFF";
const DEFAULT_BUTTON_COLOR = "white";
const PREVIEW_DISPLAY_SIZE = 4;
const colors = Object.freeze(["#001f3f", "#0074D9", "#7FDBFF", "#39CCCC", "#FF4136", "#FFDC00"]);

let notifyController: (message: ViewMessages, content: any) => void;
let lineClears = 0;

export function initView(notif: (message: ViewMessages, content: any) => void) {
    initGridInDOM();
    initHoldPreviewDisplayDOM();
    initNextPreviewDisplayDOM();
    initStyles();
    initEventListeners();

    notifyController = notif;
}

// Reset a grid tile to the default colour (the background color)
export function eraseGridTileDOM([row, col]: [number, number]) {
    const tileDOM = getTileInDOM(row, col, "#grid");

    tileDOM.style.backgroundColor = GRID_BACKGROUND_COLOR;
}

// Set a grid tile to some tetrimino color
export function fillGridTileDOM([row, col, ID]: [number, number, number]) {
    fillTileGenericDOM(row, col, ID, "#grid");
}

// Get rid of the row and place an empty one on top, simulating a line clear
export function replaceGridRowDOM(row: number) {
    const gridDOM = <HTMLTableElement>getDOMElem("#grid");

    gridDOM.deleteRow(row);
    gridDOM.insertBefore(createEmptyRowInDOM(WIDTH), gridDOM.rows[0]);
    updateLineClearCounter();
}

export function clearNextPreviewDOM() {
    clearGridGenericDOM(PREVIEW_DISPLAY_SIZE, PREVIEW_DISPLAY_SIZE, "#next-block");
}

export function clearHoldPreviewDOM() {
    clearGridGenericDOM(PREVIEW_DISPLAY_SIZE, PREVIEW_DISPLAY_SIZE, "#hold-block");
}

export function fillNextPreviewTileDOM([row, col, ID]: [number, number, number]) {
    fillTileGenericDOM(row, col, ID, "#next-block");
}

export function fillHoldPreviewTileDOM([row, col, ID]: [number, number, number]) {
    fillTileGenericDOM(row, col, ID, "#hold-block");
}

export function gameOverMessage() {
    alert(`Game over. You got ${lineClears} line clears`);
}

function updateLineClearCounter() {
    const lineClearCounter = getDOMElem("#line-clears");

    lineClearCounter.innerHTML = `Line Clears: ${++lineClears}`
}

// Clears some grid, for example the main grid, the next preview or holding preview
function clearGridGenericDOM(height: number, width: number, selector: string) {
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const tile = getTileInDOM(row, col, selector);

            tile.style.backgroundColor = GRID_BACKGROUND_COLOR;
        }
    }
}

// Initialse default styling for some components
function initStyles() {
    const toggleAIButtonDOM = <HTMLButtonElement>getDOMElem("#toggle-ai");

    toggleAIButtonDOM.style.color = ACTIVE_BUTTON_COLOR;
}

// Fills some tile in some grid, for example the main grid, the next preview or holding preview
function fillTileGenericDOM(row: number, col: number, ID: number, selector: string) {
    const elemDOM = getTileInDOM(row, col, selector)

    elemDOM.style.backgroundColor = getColorFromID(ID);
}

function getColorFromID(ID: number) {
    return colors[ID % colors.length];
}

function initHoldPreviewDisplayDOM() {
    initGenericTable(PREVIEW_DISPLAY_SIZE, PREVIEW_DISPLAY_SIZE, "#hold-block");
}

function initNextPreviewDisplayDOM() {
    initGenericTable(PREVIEW_DISPLAY_SIZE, PREVIEW_DISPLAY_SIZE, "#next-block");
}

// Dynamically generate HTML for a plain grid
function initGridInDOM() {
    initGenericTable(HEIGHT, WIDTH, "#grid");
}

// Generic function that takes in a selector for a table and fills it with empty table cells
function initGenericTable(height: number, width: number, selector: string) {
    const elemDOM = getDOMElem(selector);

    for (let row = 0; row < height; row++) {
        elemDOM.append(createEmptyRowInDOM(width));
    }
}

function initEventListeners() {
    document.addEventListener("keydown", dealWithKeyPress);

    getDOMElem("#hold").addEventListener("click", () => notifyController(ViewMessages.Hold, null));
    getDOMElem("#reset").addEventListener("click", () => location.reload());
    getDOMElem("#toggle-ai").addEventListener("click", toggleAI);
    getDOMElem("#speed-toggle").addEventListener("change", updateSpeed);
}

function updateSpeed(event: Event) {
    const speedSlider = <HTMLButtonElement>event.target;
    const newVal = speedSlider.value;

    notifyController(ViewMessages.ChangeSpeed, parseInt(newVal));
}

function toggleAI(event: Event) {
    const toggleAIButtonDOM = <HTMLButtonElement>event.target;

    toggleButtonColor(toggleAIButtonDOM);
    notifyController(ViewMessages.ToggleAI, null);
}

function toggleButtonColor(toggleAIButtonDOM: HTMLButtonElement) {
    if (toggleAIButtonDOM.style.color === DEFAULT_BUTTON_COLOR) {
        toggleAIButtonDOM.style.color = ACTIVE_BUTTON_COLOR;
    } else {
        toggleAIButtonDOM.style.color = DEFAULT_BUTTON_COLOR;
    }
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

    for (let col = 0; col < length; col++) {
        newRow.append(createEmptyTileInDOM());
    }

    return newRow;
}

function createEmptyTileInDOM() {
    const newTile = document.createElement("td");

    newTile.className = "tile";
    newTile.style.backgroundColor = GRID_BACKGROUND_COLOR;

    return newTile;
}

function getTileInDOM(row: number, col: number, selector: string) {
    const gridDOM = <HTMLTableElement>getDOMElem(selector);
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
        throw `Selector ${selector} wasn't found in index.html`;
    } else {
        return <Element>elemDOM;
    }
}