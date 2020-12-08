import { fallingBlock, initGame, isGameOver, GameMessages, moveLeft, rotatePiece as rotateTetrimino, moveRight, moveDown, holdTetrimino} from "../models/game";
import { initEmptyGrid } from "../models/grid";
import { clearHoldBlockDOM, clearNextBlockDOM, eraseGridTileDOM, fillHoldBlockTileDOM, initView, fillGridTileDOM, replaceGridRowDOM, ViewMessages, fillNextBlockTileDOM } from "../views/view";

export const HEIGHT = 20;
export const WIDTH = 20;

interface State {
    running: boolean
}

const state: State = {
    running: true
}

runGame();

async function runGame() {
    initView(readMessageFromView);
    initGame(readMessageFromGame);
    initEmptyGrid();

	while (state.running) {
        await fallingBlock();

        if (isGameOver()) {
            gameOver();
        }
    }	
}

function readMessageFromView(message: ViewMessages, content: any) {
    switch (message) {
        case ViewMessages.MoveDown:
            moveDown();
            break;
        case ViewMessages.MoveLeft:
            moveLeft();
            break;
        case ViewMessages.MoveRight:
            moveRight();
            break;
        case ViewMessages.Rotate:
            rotateTetrimino();
            break;
        case ViewMessages.Hold:
            holdTetrimino();
            break;
        default:
            throw `Argument not supported: ${message}`;
    }
}

function readMessageFromGame(message: GameMessages, content: any) {
    switch (message) {
        case GameMessages.ClearGridTile:
            eraseCoordFromView(content);
            break;
        case GameMessages.FillGridTile:
            renderCoordInView(content);
            break;
        case GameMessages.ReplaceRow:
            replaceRowInView(content);
            break;
        case GameMessages.ClearNextBlock:
            clearNextBlockDOM();
            break;
        case GameMessages.FillNextBlockTile:
            fillNextBlockTileInView(content);
            break;
        case GameMessages.ClearHoldBlock:
            clearHoldBlockDOM();
            break;
        case GameMessages.FillHoldTile:
            fillHoldBlockTileInView(content);
            break;
        default:
            throw `Argument not supported: ${message}`;
    }
}

function fillNextBlockTileInView(content: any) {
    const tile = <[number, number]> content;

    fillNextBlockTileDOM(tile);
}

function fillHoldBlockTileInView(content: any) {
    const tile = <[number, number]> content;

    fillHoldBlockTileDOM(tile);
}

function replaceRowInView(content: any) {
    const row = <number> content;    

    replaceGridRowDOM(row);
}

function renderCoordInView(content: any) {
    const renderCoords = <[number, number]> content;
            
    fillGridTileDOM(renderCoords);
}

function eraseCoordFromView(content: any) {
    const eraseCoords = <[number, number]> content;

    eraseGridTileDOM(eraseCoords);
}

function gameOver() {
	state.running = false;
}