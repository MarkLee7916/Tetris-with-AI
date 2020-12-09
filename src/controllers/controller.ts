import { fall, initGame, isGameOver, GameMessages, moveCurrTetriminoLeft, moveCurrTetriminoRight, moveCurrTetriminoDown, hold, toggleAI, rotateCurrTetrimino} from "../models/game";
import { clearHoldBlockDOM, clearNextBlockDOM, eraseGridTileDOM, fillHoldBlockTileDOM, initView, fillGridTileDOM, replaceGridRowDOM, ViewMessages, fillNextBlockTileDOM, gameOverMessage } from "../views/view";

export const HEIGHT = 20;
export const WIDTH = 20;

let running = true;

(async function runGame() {
    initView(readMessageFromView);
    initGame(readMessageFromGame);

	while (running) {
        await fall();

        if (isGameOver()) {
            gameOver();
        }
    }	
})();

function readMessageFromView(message: ViewMessages, content: any) {
    switch (message) {
        case ViewMessages.MoveDown:
            moveCurrTetriminoDown();
            break;
        case ViewMessages.MoveLeft:
            moveCurrTetriminoLeft();
            break;
        case ViewMessages.MoveRight:
            moveCurrTetriminoRight();
            break;
        case ViewMessages.Rotate:
            rotateCurrTetrimino();
            break;
        case ViewMessages.Hold:
            hold();
            break;
        case ViewMessages.ToggleAI:
            toggleAI();
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
    running = false;
    gameOverMessage();
}