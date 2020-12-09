(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.WIDTH = exports.HEIGHT = void 0;
var game_1 = require("../models/game");
var view_1 = require("../views/view");
exports.HEIGHT = 20;
exports.WIDTH = 20;
var running = true;
// Main driver function for program
(function runGame() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    view_1.initView(readMessageFromView);
                    game_1.initGame((readMessageFromGame));
                    _a.label = 1;
                case 1:
                    if (!running) return [3 /*break*/, 3];
                    return [4 /*yield*/, game_1.runTurn()];
                case 2:
                    _a.sent();
                    if (game_1.isGameOver()) {
                        gameOver();
                    }
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/];
            }
        });
    });
})();
// Callback that executes whenever the view wants to talk to the controller
function readMessageFromView(message, content) {
    switch (message) {
        case 2 /* MoveDown */:
            game_1.moveCurrTetriminoDown();
            break;
        case 0 /* MoveLeft */:
            game_1.moveCurrTetriminoLeft();
            break;
        case 1 /* MoveRight */:
            game_1.moveCurrTetriminoRight();
            break;
        case 3 /* Rotate */:
            game_1.rotateCurrTetrimino();
            break;
        case 4 /* Hold */:
            game_1.hold();
            break;
        case 5 /* ToggleAI */:
            game_1.toggleAI();
            break;
        case 6 /* ChangeSpeed */:
            updateDelayTimeInGame(content);
            break;
        default:
            throw "Argument not supported: " + message;
    }
}
// Callback that executes whenever the game wants to talk to the controller
function readMessageFromGame(message, content) {
    switch (message) {
        case 6 /* ClearGridTile */:
            eraseCoordFromView(content);
            break;
        case 1 /* FillGridTile */:
            renderCoordInView(content);
            break;
        case 0 /* ReplaceRow */:
            replaceRowInView(content);
            break;
        case 4 /* ClearNextBlock */:
            view_1.clearNextPreviewDOM();
            break;
        case 2 /* FillNextBlockTile */:
            fillNextBlockTileInView(content);
            break;
        case 5 /* ClearHoldBlock */:
            view_1.clearHoldPreviewDOM();
            break;
        case 3 /* FillHoldTile */:
            fillHoldBlockTileInView(content);
            break;
        default:
            throw "Argument not supported: " + message;
    }
}
function updateDelayTimeInGame(content) {
    var newTime = content;
    game_1.updateDelayTime(newTime);
}
function fillNextBlockTileInView(content) {
    var tile = content;
    view_1.fillNextPreviewTileDOM(tile);
}
function fillHoldBlockTileInView(content) {
    var tile = content;
    view_1.fillHoldPreviewTileDOM(tile);
}
function replaceRowInView(content) {
    var row = content;
    view_1.replaceGridRowDOM(row);
}
function renderCoordInView(content) {
    var renderCoords = content;
    view_1.fillGridTileDOM(renderCoords);
}
function eraseCoordFromView(content) {
    var eraseCoords = content;
    view_1.eraseGridTileDOM(eraseCoords);
}
function gameOver() {
    running = false;
    view_1.gameOverMessage();
}

},{"../models/game":3,"../views/view":7}],2:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.blockTypes = void 0;
var square = [[[0, 0], [0, 1], [1, 0], [1, 1]],
    [[0, 0], [0, 1], [1, 0], [1, 1]],
    [[0, 0], [0, 1], [1, 0], [1, 1]],
    [[0, 0], [0, 1], [1, 0], [1, 1]]];
var shapeT = [[[0, 0], [0, 1], [0, 2], [1, 1]],
    [[0, 0], [1, 0], [2, 0], [1, 1]],
    [[1, 1], [1, 2], [1, 3], [0, 2]],
    [[1, 1], [0, 2], [1, 2], [2, 2]]];
var line = [[[0, 0], [0, 1], [0, 2], [0, 3]],
    [[0, 0], [1, 0], [2, 0], [3, 0]],
    [[0, 0], [0, 1], [0, 2], [0, 3]],
    [[0, 0], [1, 0], [2, 0], [3, 0]]];
var shapeL = [[[0, 0], [1, 0], [2, 0], [2, 1]],
    [[1, 1], [1, 2], [1, 3], [0, 3]],
    [[0, 0], [0, 1], [1, 0], [2, 0]],
    [[0, 0], [1, 0], [1, 1], [1, 2]]];
var mirror = [[[0, 0], [0, 1], [1, 1], [1, 2]],
    [[2, 2], [1, 2], [1, 3], [0, 3]],
    [[1, 1], [1, 2], [0, 2], [0, 3]],
    [[0, 0], [1, 0], [1, 1], [2, 1]]];
exports.blockTypes = [square, shapeT, line, shapeL, mirror];

},{}],3:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.hold = exports.updateDelayTime = exports.moveCurrTetriminoDown = exports.moveCurrTetriminoRight = exports.moveCurrTetriminoLeft = exports.rotateCurrTetrimino = exports.isGameOver = exports.runTurn = exports.toggleAI = exports.initGame = void 0;
var controller_1 = require("../controllers/controller");
var utils_1 = require("../utils");
var grid_1 = require("./grid");
var tetrimino_1 = require("./tetrimino");
// Time we wait every time the current tetrimino moves. The lower this number is, the fast the game will flow
var delayTime;
// Pass a parameterized message to controller
var notifyController;
// Tetrimino that will load after the current one
var nextTetrimino;
// Tetrimino that player is holding
var holdingTetrimino;
// The current tetrimino on the screen
var currTetrimino;
// The relative position of the current tetrimino on the screen
var currRow;
var currCol;
var isAIRunning;
// Initialise state needed for game to function
function initGame(notif) {
    holdingTetrimino = new tetrimino_1.Tetrimino();
    nextTetrimino = new tetrimino_1.Tetrimino();
    isAIRunning = true;
    delayTime = 500;
    notifyController = notif;
    grid_1.initEmptyGrid();
    renderHoldPreview();
}
exports.initGame = initGame;
// If AI is running, stop it running, if AI is not running, run it
function toggleAI() {
    isAIRunning = !isAIRunning;
}
exports.toggleAI = toggleAI;
// Simulates the process of a tetrimino being generated, falling and hitting the ground, possibly clearing lines
function runTurn() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    configureNewTetrimino();
                    if (isAIRunning) {
                        runAI();
                    }
                    renderNextPreview();
                    return [4 /*yield*/, makeCurrTetriminoFall()];
                case 1:
                    _a.sent();
                    updateGridWithTetrimino(currTetrimino);
                    handleLineClears();
                    return [2 /*return*/];
            }
        });
    });
}
exports.runTurn = runTurn;
function isGameOver() {
    for (var col = 0; col < controller_1.WIDTH; col++) {
        if (grid_1.isFilledAt(0, col)) {
            return true;
        }
    }
    return false;
}
exports.isGameOver = isGameOver;
function rotateCurrTetrimino() {
    rotateTetrimino(currTetrimino);
}
exports.rotateCurrTetrimino = rotateCurrTetrimino;
function moveCurrTetriminoLeft() {
    moveTetriminoLeft(currTetrimino);
}
exports.moveCurrTetriminoLeft = moveCurrTetriminoLeft;
function moveCurrTetriminoRight() {
    moveTetriminoRight(currTetrimino);
}
exports.moveCurrTetriminoRight = moveCurrTetriminoRight;
function moveCurrTetriminoDown() {
    moveTetriminoDown(currTetrimino);
}
exports.moveCurrTetriminoDown = moveCurrTetriminoDown;
function updateDelayTime(newDelay) {
    delayTime = newDelay;
}
exports.updateDelayTime = updateDelayTime;
// Swap the current tetrimino with the one we're holding, dealing with rendering and failure case
function hold() {
    if (canHold()) {
        renderClearTetrimino(currTetrimino);
        swapWithHold();
        renderHoldPreview();
        renderTetrimino(currTetrimino);
    }
}
exports.hold = hold;
// Simulate the tetrimino falling
function makeCurrTetriminoFall() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!canMoveTetriminoDown(currTetrimino, currRow, currCol)) return [3 /*break*/, 2];
                    moveTetriminoDown(currTetrimino);
                    return [4 /*yield*/, utils_1.wait(delayTime)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 0];
                case 2: return [2 /*return*/];
            }
        });
    });
}
// Rotate the tetrimino, handling failure cases
function rotateTetrimino(tet) {
    renderClearTetrimino(tet);
    tet.nextRotation();
    if (!noCollisions(tet, currRow, currCol)) {
        tet.prevRotation();
    }
    renderTetrimino(tet);
}
function moveTetriminoLeft(tet) {
    moveTetrimino(0, -1, function (i) { return tet.colAt(i) + currCol <= 0; }, tet);
}
function moveTetriminoRight(tet) {
    moveTetrimino(0, 1, function (i) { return tet.colAt(i) + currCol >= controller_1.WIDTH - 1; }, tet);
}
function moveTetriminoDown(tet) {
    moveTetrimino(1, 0, function (i) { return tet.rowAt(i) + currRow >= controller_1.HEIGHT - 1; }, tet);
}
// Return the column and rotation of the best move we can make with the given tetriminoo
function computeOptimalMove(tet) {
    var maxRotation = Number.MIN_SAFE_INTEGER;
    var maxCol = Number.MIN_SAFE_INTEGER;
    var maxHeuristic = Number.MIN_SAFE_INTEGER;
    for (var col = 0; col < controller_1.WIDTH; col++) {
        for (var rotation = 0; rotation < tetrimino_1.Tetrimino.TILE_COUNT; rotation++) {
            var heuristic = computeMoveHeuristic(tet, col);
            tet.nextRotation();
            if (heuristic !== null && heuristic > maxHeuristic) {
                maxHeuristic = heuristic;
                maxCol = col;
                maxRotation = rotation;
            }
        }
    }
    return [maxCol, maxRotation];
}
// Make current tetrimino the one stored in next and generate a new next, resetting row and column
function configureNewTetrimino() {
    currRow = 0;
    currCol = controller_1.WIDTH / 2;
    currTetrimino = nextTetrimino;
    nextTetrimino = new tetrimino_1.Tetrimino();
}
// Make the optimal move
function runAI() {
    var _a = computeOptimalMove(currTetrimino), optimalCol = _a[0], optimalRotations = _a[1];
    currCol = optimalCol;
    for (var i = 0; i < optimalRotations; i++) {
        currTetrimino.nextRotation();
    }
}
// Simulate a piece falling and use it to get the heuristic value for a tetrimino position and its rotation
function computeMoveHeuristic(tet, col) {
    var row = 0;
    if (!noCollisions(tet, row, col)) {
        return null;
    }
    while (canMoveTetriminoDown(tet, row, col)) {
        row++;
    }
    return computeHeuristic(tet, row, col);
}
// Calculate the heuristic value for a tetrimino position and its rotation
function computeHeuristic(tetrimino, rowPos, colPos) {
    var rating = 0;
    for (var row = 1; row < controller_1.HEIGHT; row++) {
        for (var col = 0; col < controller_1.WIDTH; col++) {
            if (coordHasEmptyHole(tetrimino, row, col, rowPos, colPos)) {
                rating -= 10;
            }
        }
    }
    return rating - (controller_1.HEIGHT - rowPos);
}
// Return true if position has an empty space with a filled piece on top of it
function coordHasEmptyHole(tet, row, col, rowPos, colPos) {
    var isFilledAbove = !grid_1.isFilledAt(row, col) && !tetriminoHasCoord(tet, row, col, rowPos, colPos);
    var isEmptyBelow = grid_1.isFilledAt(row - 1, col) || tetriminoHasCoord(tet, row - 1, col, rowPos, colPos);
    return isFilledAbove && isEmptyBelow;
}
// Return true if a tetriminos coordinates overlap with a given row and column
function tetriminoHasCoord(tetrimino, targRow, targCol, rowPos, colPos) {
    return tetrimino.tiles().some(function (_a) {
        var row = _a[0], col = _a[1];
        return row + rowPos === targRow && col + colPos === targCol;
    });
}
function canHold() {
    return noCollisions(holdingTetrimino, currRow, currCol);
}
// Swap current tetrimino and holding tetrimino, doesn't deal with rendering or error cases
function swapWithHold() {
    var temp = currTetrimino;
    currTetrimino = holdingTetrimino;
    holdingTetrimino = temp;
}
// Tell the controller to update the holding preview with the current holding tetrimino
function renderHoldPreview() {
    notifyController(5 /* ClearHoldBlock */, null);
    holdingTetrimino.tiles().forEach(function (_a) {
        var row = _a[0], col = _a[1];
        notifyController(3 /* FillHoldTile */, [row, col]);
    });
}
// Return true if the given tetrimino doesn't go out of bounds or overlap with another tetrimino
function noCollisions(tetrimino, row, col) {
    return canMoveTetrimino(0, 0, function (i) { return tetrimino.rowAt(i) + row >= controller_1.HEIGHT
        || tetrimino.colAt(i) + col < 0 || tetrimino.colAt(i) + col >= controller_1.WIDTH; }, tetrimino, row, col);
}
// Tell the controller to update the next preview with the next tetrimino
function renderNextPreview() {
    notifyController(4 /* ClearNextBlock */, null);
    nextTetrimino.tiles().forEach(function (_a) {
        var row = _a[0], col = _a[1];
        notifyController(2 /* FillNextBlockTile */, [row, col]);
    });
}
// Move tetrimino, handling error case
function moveTetrimino(rowMove, colMove, edgeGridCondition, tet) {
    if (canMoveTetrimino(rowMove, colMove, edgeGridCondition, tet, currRow, currCol)) {
        shiftTetrimino(rowMove, colMove, tet);
    }
}
// Move tetrimono, doesn't deal with error case
function shiftTetrimino(rowMove, colMove, tet) {
    renderClearTetrimino(tet);
    currRow += rowMove;
    currCol += colMove;
    renderTetrimino(tet);
}
// Tell the controller to clear a tetrimino from the grid
function renderClearTetrimino(tetrimino) {
    tetrimino.tiles().forEach(function (_a) {
        var row = _a[0], col = _a[1];
        renderClearTile(row + currRow, col + currCol);
    });
}
// Tell the controller to clear a tile from the grid
function renderClearTile(row, col) {
    notifyController(6 /* ClearGridTile */, [row, col]);
}
// Tell the controller to render a tetrimino in the grid
function renderTetrimino(tetrimino) {
    tetrimino.tiles().forEach(function (_a) {
        var row = _a[0], col = _a[1];
        renderTile(row + currRow, col + currCol);
    });
}
// Tell the controller to render a tile in the grid
function renderTile(row, col) {
    notifyController(1 /* FillGridTile */, [row, col]);
}
// Update the grid backend with a tetriminos position
function updateGridWithTetrimino(tetrimino) {
    tetrimino.tiles().forEach(function (_a) {
        var row = _a[0], col = _a[1];
        grid_1.fillAt(row + currRow, col + currCol);
    });
}
// Tell the controller to clear a row 
function renderClearRow(row) {
    notifyController(0 /* ReplaceRow */, row);
}
// Detect if we've got a line clear, if we have clear it
function handleLineClears() {
    for (var row = 0; row < controller_1.HEIGHT; row++) {
        if (isFilledLine(row)) {
            clearLine(row);
        }
    }
}
// Detect if we've got a line clear
function isFilledLine(row) {
    for (var col = 0; col < controller_1.WIDTH; col++) {
        if (!grid_1.isFilledAt(row, col)) {
            return false;
        }
    }
    return true;
}
function clearLine(row) {
    grid_1.clearRow(row);
    renderClearRow(row);
}
function canMoveTetrimino(rowMove, colMove, edgeGridCondition, tetrimino, row, col) {
    for (var i = 0; i < tetrimino_1.Tetrimino.TILE_COUNT; i++) {
        if (edgeGridCondition(i)) {
            return false;
        }
        if (grid_1.isFilledAt(tetrimino.rowAt(i) + row + rowMove, tetrimino.colAt(i) + col + colMove)) {
            return false;
        }
    }
    return true;
}
function canMoveTetriminoDown(tetrimino, row, col) {
    return canMoveTetrimino(1, 0, function (i) { return tetrimino.rowAt(i) + row >= controller_1.HEIGHT - 1; }, tetrimino, row, col);
}

},{"../controllers/controller":1,"../utils":6,"./grid":4,"./tetrimino":5}],4:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.fillAt = exports.isFilledAt = exports.clearRow = exports.initEmptyGrid = void 0;
var controller_1 = require("../controllers/controller");
var grid = [];
function initEmptyGrid() {
    for (var row = 0; row < controller_1.HEIGHT; row++) {
        grid.push([]);
        for (var col = 0; col < controller_1.WIDTH; col++) {
            grid[row].push(false);
        }
    }
}
exports.initEmptyGrid = initEmptyGrid;
function clearRow(row) {
    var emptyRow = new Array(controller_1.WIDTH).map(function (elem) { return elem = false; });
    var beforeRow = grid.slice(0, row);
    var afterRow = grid.slice(row + 1, controller_1.HEIGHT);
    grid = [emptyRow].concat(beforeRow.concat(afterRow));
}
exports.clearRow = clearRow;
function isFilledAt(row, col) {
    return grid[row][col];
}
exports.isFilledAt = isFilledAt;
function fillAt(row, col) {
    if (row < 0 || col < 0 || row >= controller_1.HEIGHT || col >= controller_1.WIDTH) {
        throw "Invalid arguments, must be within bounds of grid. Supplied args were row: " + row + " col: " + col;
    }
    grid[row][col] = true;
}
exports.fillAt = fillAt;

},{"../controllers/controller":1}],5:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.Tetrimino = void 0;
var utils_1 = require("../utils");
var blockTypes_1 = require("./blockTypes");
var Tetrimino = /** @class */ (function () {
    function Tetrimino() {
        this.dimensions = utils_1.randomItemFromArray(blockTypes_1.blockTypes);
        this.rotationIndex = utils_1.randomIntBetween(0, Tetrimino.ROTATION_TYPES);
    }
    Tetrimino.prototype.nextRotation = function () {
        if (this.rotationIndex === Tetrimino.ROTATION_TYPES - 1)
            this.rotationIndex = 0;
        else
            this.rotationIndex++;
    };
    Tetrimino.prototype.prevRotation = function () {
        if (this.rotationIndex === 0)
            this.rotationIndex = Tetrimino.ROTATION_TYPES - 1;
        else
            this.rotationIndex--;
    };
    // Return list of coordinates in tetrimino, where a coordinate is a row col pair 
    Tetrimino.prototype.tiles = function () {
        return this.dimensions[this.rotationIndex];
    };
    Tetrimino.prototype.rowAt = function (index) {
        var currentBlock = this.dimensions[this.rotationIndex];
        return currentBlock[index][0];
    };
    Tetrimino.prototype.colAt = function (index) {
        var currentBlock = this.dimensions[this.rotationIndex];
        return currentBlock[index][1];
    };
    // The number of possible rotations a tetrimino could be in
    Tetrimino.ROTATION_TYPES = 4;
    // The number of tiles in a tetrimino
    Tetrimino.TILE_COUNT = 4;
    return Tetrimino;
}());
exports.Tetrimino = Tetrimino;

},{"../utils":6,"./blockTypes":2}],6:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.wait = exports.randomItemFromArray = exports.randomIntBetween = void 0;
// Generates a random integer whose value lies between lower and upper
function randomIntBetween(lower, upper) {
    return Math.floor(seededRandom() * (upper - lower)) + lower;
}
exports.randomIntBetween = randomIntBetween;
function randomItemFromArray(array) {
    return array[randomIntBetween(0, array.length)];
}
exports.randomItemFromArray = randomItemFromArray;
function wait(delayTime) {
    return new Promise(function (resolve) {
        setTimeout(resolve, delayTime);
    });
}
exports.wait = wait;
var seed = 6;
// A deteriministic random number generator, used only in development
function seededRandom() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

},{}],7:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.gameOverMessage = exports.fillHoldPreviewTileDOM = exports.fillNextPreviewTileDOM = exports.clearHoldPreviewDOM = exports.clearNextPreviewDOM = exports.replaceGridRowDOM = exports.fillGridTileDOM = exports.eraseGridTileDOM = exports.initView = void 0;
var controller_1 = require("../controllers/controller");
var GRID_BACKGROUND_COLOR = "white";
var PLACEHOLDER = "pink";
var ACTIVE_BUTTON_COLOR = "#7FDBFF";
var DEFAULT_BUTTON_COLOR = "white";
var PREVIEW_DISPLAY_SIZE = 4;
var notifyController;
var lineClears = 0;
function initView(notif) {
    initGridInDOM();
    initHoldPreviewDisplayDOM();
    initNextPreviewDisplayDOM();
    initStyles();
    initEventListeners();
    notifyController = notif;
}
exports.initView = initView;
// Reset a grid tile to the default colour (the background color)
function eraseGridTileDOM(_a) {
    var row = _a[0], col = _a[1];
    var tileDOM = getTileInDOM(row, col, "#grid");
    tileDOM.style.backgroundColor = GRID_BACKGROUND_COLOR;
}
exports.eraseGridTileDOM = eraseGridTileDOM;
// Set a grid tile to some tetrimino color
function fillGridTileDOM(_a) {
    var row = _a[0], col = _a[1];
    fillTileGenericDOM(row, col, "#grid");
}
exports.fillGridTileDOM = fillGridTileDOM;
// Get rid of the row and place an empty one on top, simulating a line clear
function replaceGridRowDOM(row) {
    var gridDOM = getDOMElem("#grid");
    gridDOM.deleteRow(row);
    gridDOM.insertBefore(createEmptyRowInDOM(controller_1.WIDTH), gridDOM.rows[0]);
    updateLineClearCounter();
}
exports.replaceGridRowDOM = replaceGridRowDOM;
function clearNextPreviewDOM() {
    clearGridGenericDOM(PREVIEW_DISPLAY_SIZE, PREVIEW_DISPLAY_SIZE, "#next-block");
}
exports.clearNextPreviewDOM = clearNextPreviewDOM;
function clearHoldPreviewDOM() {
    clearGridGenericDOM(PREVIEW_DISPLAY_SIZE, PREVIEW_DISPLAY_SIZE, "#hold-block");
}
exports.clearHoldPreviewDOM = clearHoldPreviewDOM;
function fillNextPreviewTileDOM(_a) {
    var row = _a[0], col = _a[1];
    fillTileGenericDOM(row, col, "#next-block");
}
exports.fillNextPreviewTileDOM = fillNextPreviewTileDOM;
function fillHoldPreviewTileDOM(_a) {
    var row = _a[0], col = _a[1];
    fillTileGenericDOM(row, col, "#hold-block");
}
exports.fillHoldPreviewTileDOM = fillHoldPreviewTileDOM;
function gameOverMessage() {
    alert("Game over. You got " + lineClears + " line clears");
}
exports.gameOverMessage = gameOverMessage;
function updateLineClearCounter() {
    var lineClearCounter = getDOMElem("#line-clears");
    lineClearCounter.innerHTML = "Line Clears: " + ++lineClears;
}
// Clears some grid, for example the main grid, the next preview or holding preview
function clearGridGenericDOM(height, width, selector) {
    for (var row = 0; row < height; row++) {
        for (var col = 0; col < width; col++) {
            var tile = getTileInDOM(row, col, selector);
            tile.style.backgroundColor = GRID_BACKGROUND_COLOR;
        }
    }
}
// Initialse default styling for some components
function initStyles() {
    var toggleAIButtonDOM = getDOMElem("#toggle-ai");
    toggleAIButtonDOM.style.color = ACTIVE_BUTTON_COLOR;
}
// Fills some tile in some grid, for example the main grid, the next preview or holding preview
function fillTileGenericDOM(row, col, selector) {
    var elemDOM = getTileInDOM(row, col, selector);
    elemDOM.style.backgroundColor = PLACEHOLDER;
}
function initHoldPreviewDisplayDOM() {
    initGenericTable(PREVIEW_DISPLAY_SIZE, PREVIEW_DISPLAY_SIZE, "#hold-block");
}
function initNextPreviewDisplayDOM() {
    initGenericTable(PREVIEW_DISPLAY_SIZE, PREVIEW_DISPLAY_SIZE, "#next-block");
}
// Dynamically generate HTML for a plain grid
function initGridInDOM() {
    initGenericTable(controller_1.HEIGHT, controller_1.WIDTH, "#grid");
}
// Generic function that takes in a selector for a table and fills it with empty table cells
function initGenericTable(height, width, selector) {
    var elemDOM = getDOMElem(selector);
    for (var row = 0; row < height; row++) {
        elemDOM.append(createEmptyRowInDOM(width));
    }
}
function initEventListeners() {
    document.addEventListener("keydown", dealWithKeyPress);
    getDOMElem("#hold").addEventListener("click", function () { return notifyController(4 /* Hold */, null); });
    getDOMElem("#reset").addEventListener("click", function () { return location.reload(); });
    getDOMElem("#toggle-ai").addEventListener("click", toggleAI);
    getDOMElem("#speed-toggle").addEventListener("change", updateSpeed);
}
function updateSpeed(event) {
    var speedSlider = event.target;
    var newVal = speedSlider.value;
    notifyController(6 /* ChangeSpeed */, parseInt(newVal));
}
function toggleAI(event) {
    var toggleAIButtonDOM = event.target;
    toggleButtonColor(toggleAIButtonDOM);
    notifyController(5 /* ToggleAI */, null);
}
function toggleButtonColor(toggleAIButtonDOM) {
    if (toggleAIButtonDOM.style.color === DEFAULT_BUTTON_COLOR) {
        toggleAIButtonDOM.style.color = ACTIVE_BUTTON_COLOR;
    }
    else {
        toggleAIButtonDOM.style.color = DEFAULT_BUTTON_COLOR;
    }
}
// Map key press onto action
function dealWithKeyPress(keyPress) {
    var leftArrow = 37;
    var upArrow = 38;
    var rightArrow = 39;
    var downArrow = 40;
    var holdKey = 72;
    switch (keyPress.keyCode) {
        case upArrow:
            notifyController(3 /* Rotate */, null);
            break;
        case leftArrow:
            notifyController(0 /* MoveLeft */, null);
            break;
        case rightArrow:
            notifyController(1 /* MoveRight */, null);
            break;
        case downArrow:
            notifyController(2 /* MoveDown */, null);
            break;
        case holdKey:
            notifyController(4 /* Hold */, null);
            break;
    }
}
function createEmptyRowInDOM(length) {
    var newRow = document.createElement("tr");
    newRow.className = "row";
    for (var col = 0; col < length; col++) {
        newRow.append(createEmptyTileInDOM());
    }
    return newRow;
}
function createEmptyTileInDOM() {
    var newTile = document.createElement("td");
    newTile.className = "tile";
    newTile.style.backgroundColor = GRID_BACKGROUND_COLOR;
    return newTile;
}
function getTileInDOM(row, col, selector) {
    var gridDOM = getDOMElem(selector);
    var rowDOM = rowDOMAt(gridDOM, row);
    var tileDOM = colDOMAt(rowDOM, col);
    return tileDOM;
}
function rowDOMAt(gridDOM, row) {
    if (row >= gridDOM.rows.length) {
        throw "Supplied value of row: " + row + " was greater than max row size " + (gridDOM.rows.length - 1);
    }
    return gridDOM.rows[row];
}
function colDOMAt(rowDOM, col) {
    if (col >= rowDOM.cells.length) {
        throw "Supplied value of col: " + col + " was greater than max row size " + (rowDOM.cells.length - 1);
    }
    return rowDOM.cells[col];
}
function getDOMElem(selector) {
    var elemDOM = document.querySelector(selector);
    if (elemDOM === null) {
        throw "Selector " + selector + " wasn't found in index.html";
    }
    else {
        return elemDOM;
    }
}

},{"../controllers/controller":1}]},{},[1]);
