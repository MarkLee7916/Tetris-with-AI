import {initGame, isGameOver, GameMessages, toggleAI, moveCurrTetriminoLeft, updateDelayTime, moveCurrTetriminoRight, hold, rotateCurrTetrimino, moveCurrTetriminoDown, runTurn} from "../models/game";
import { clearHoldPreviewDOM, clearNextPreviewDOM, eraseGridTileDOM, fillHoldPreviewTileDOM, initView, fillGridTileDOM, replaceGridRowDOM, ViewMessages, fillNextPreviewTileDOM, gameOverMessage } from "../views/view";

export const HEIGHT = 20;
export const WIDTH = 20;

let running = true;

// Main driver function for program
(async function runGame() {
    initView(readMessageFromView);
    initGame((readMessageFromGame));

	while (running) {
        await runTurn();

        if (isGameOver()) {
            gameOver();
        }
    }	
})();

// Callback that executes whenever the view wants to talk to the controller
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
        case ViewMessages.ChangeSpeed:
            updateDelayTimeInGame(content);
            break;
        default:
            throw `Argument not supported: ${message}`;
    }
}

// Callback that executes whenever the game wants to talk to the controller
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
            clearNextPreviewDOM();
            break;
        case GameMessages.FillNextBlockTile:
            fillNextBlockTileInView(content);
            break;
        case GameMessages.ClearHoldBlock:
            clearHoldPreviewDOM();
            break;
        case GameMessages.FillHoldTile:
            fillHoldBlockTileInView(content);
            break;
        default:
            throw `Argument not supported: ${message}`;
    }
}

function updateDelayTimeInGame(content: any) {
    const newTime = <number> content;

    updateDelayTime(newTime);
}

function fillNextBlockTileInView(content: any) {
    const tile = <[number, number]> content;

    fillNextPreviewTileDOM(tile);
}

function fillHoldBlockTileInView(content: any) {
    const tile = <[number, number]> content;

    fillHoldPreviewTileDOM(tile);
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