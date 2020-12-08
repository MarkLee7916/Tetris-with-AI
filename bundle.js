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
var grid_1 = require("../models/grid");
var view_1 = require("../views/view");
exports.HEIGHT = 20;
exports.WIDTH = 20;
var state = {
    running: true
};
runGame();
function runGame() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    view_1.initView(readMessageFromView);
                    game_1.initGame(readMessageFromGame);
                    grid_1.initEmptyGrid();
                    _a.label = 1;
                case 1:
                    if (!state.running) return [3 /*break*/, 3];
                    return [4 /*yield*/, game_1.fallingBlock()];
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
}
function readMessageFromView(message, content) {
    switch (message) {
        case 2 /* MoveDown */:
            game_1.moveDown();
            break;
        case 0 /* MoveLeft */:
            game_1.moveLeft();
            break;
        case 1 /* MoveRight */:
            game_1.moveRight();
            break;
        case 3 /* Rotate */:
            game_1.rotatePiece();
            break;
        case 4 /* Hold */:
            game_1.holdTetrimino();
            break;
        default:
            throw "Argument not supported: " + message;
    }
}
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
            view_1.clearNextBlockDOM();
            break;
        case 2 /* FillNextBlockTile */:
            fillNextBlockTileInView(content);
            break;
        case 5 /* ClearHoldBlock */:
            view_1.clearHoldBlockDOM();
            break;
        case 3 /* FillHoldTile */:
            fillHoldBlockTileInView(content);
            break;
        default:
            throw "Argument not supported: " + message;
    }
}
function fillNextBlockTileInView(content) {
    var tile = content;
    view_1.fillNextBlockTileDOM(tile);
}
function fillHoldBlockTileInView(content) {
    var tile = content;
    view_1.fillHoldBlockTileDOM(tile);
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
    state.running = false;
}

},{"../models/game":3,"../models/grid":4,"../views/view":7}],2:[function(require,module,exports){
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
exports.computeOptimalMove = exports.holdTetrimino = exports.moveDown = exports.moveRight = exports.moveLeft = exports.rotatePiece = exports.isGameOver = exports.fallingBlock = exports.initGame = void 0;
var controller_1 = require("../controllers/controller");
var utils_1 = require("../utils");
var grid_1 = require("./grid");
var tetrimino_1 = require("./tetrimino");
var notifyController;
var nextTetrimino = new tetrimino_1.Tetrimino();
var holdingTetrimino;
var currTetrimino;
var currRow;
var currCol;
function initGame(notif) {
    notifyController = notif;
}
exports.initGame = initGame;
function fallingBlock() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, optimalCol, optimalRotations, i;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    currRow = 0;
                    currCol = controller_1.WIDTH / 2;
                    currTetrimino = nextTetrimino;
                    nextTetrimino = new tetrimino_1.Tetrimino();
                    _a = computeOptimalMove(), optimalCol = _a[0], optimalRotations = _a[1];
                    currCol = optimalCol;
                    for (i = 0; i < optimalRotations; i++) {
                        currTetrimino.nextRotation();
                    }
                    renderNextBlock();
                    _b.label = 1;
                case 1:
                    if (!canMoveDown(currTetrimino, currRow, currCol)) return [3 /*break*/, 3];
                    moveDown();
                    return [4 /*yield*/, utils_1.wait()];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 1];
                case 3:
                    updateGridWithBlock();
                    handleLineClears();
                    return [2 /*return*/];
            }
        });
    });
}
exports.fallingBlock = fallingBlock;
function isGameOver() {
    for (var col = 0; col < controller_1.WIDTH; col++) {
        if (grid_1.isFilledAt(0, col)) {
            return true;
        }
    }
    return false;
}
exports.isGameOver = isGameOver;
function rotatePiece() {
    renderClearBlock();
    currTetrimino.nextRotation();
    if (!noCollisions(currTetrimino, currRow, currCol)) {
        currTetrimino.prevRotation();
    }
    renderBlock();
}
exports.rotatePiece = rotatePiece;
function moveLeft() {
    moveBlock(0, -1, function (i) { return currTetrimino.colAt(i) + currCol <= 0; });
}
exports.moveLeft = moveLeft;
function moveRight() {
    moveBlock(0, 1, function (i) { return currTetrimino.colAt(i) + currCol >= controller_1.WIDTH - 1; });
}
exports.moveRight = moveRight;
function moveDown() {
    moveBlock(1, 0, function (i) { return currTetrimino.rowAt(i) + currRow >= controller_1.HEIGHT - 1; });
}
exports.moveDown = moveDown;
function holdTetrimino() {
    if (canHoldTetrimino()) {
        renderClearBlock();
        swapWithHoldingTetrimino();
        renderHoldBlock();
        renderBlock();
    }
}
exports.holdTetrimino = holdTetrimino;
// NEEDS FIXED
function computeOptimalMove() {
    var maxRotation = Number.MIN_SAFE_INTEGER;
    var maxCol = Number.MIN_SAFE_INTEGER;
    var maxVal = Number.MIN_SAFE_INTEGER;
    for (var col = 0; col < controller_1.WIDTH; col++) {
        for (var rotation = 0; rotation < tetrimino_1.Tetrimino.LENGTH; rotation++) {
            var heuristic = computeMoveHeuristic(col, rotation);
            if (heuristic !== null && heuristic > maxVal) {
                maxVal = heuristic;
                maxCol = col;
                maxRotation = rotation;
            }
            // TEMPORARY HACK: REMOVE LATER
            for (var i = 0; i < rotation; i++) {
                currTetrimino.prevRotation();
            }
        }
    }
    return [maxCol, maxRotation];
}
exports.computeOptimalMove = computeOptimalMove;
// NEEDS FIXED
function computeMoveHeuristic(col, rotation) {
    // need deep copy
    var testTetrimino = currTetrimino;
    var row = 0;
    for (var i = 0; i < rotation; i++) {
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
function computeHeuristic(tetrimino, relativeRow, relativeCol) {
    var rating = 0;
    for (var row = 1; row < controller_1.HEIGHT; row++) {
        for (var col = 0; col < controller_1.WIDTH; col++) {
            if (!grid_1.isFilledAt(row, col) && !tetriminoHasCoord(tetrimino, row, col, relativeRow, relativeCol)
                && (grid_1.isFilledAt(row - 1, col) || tetriminoHasCoord(tetrimino, row - 1, col, relativeRow, relativeCol))) {
                rating -= 10;
            }
        }
    }
    return rating - (controller_1.HEIGHT - relativeRow);
}
// NEEDS FIXED
function tetriminoHasCoord(tetrimino, targetRow, targetCol, relativeRow, relativeCol) {
    return tetrimino.tiles().reduce(function (hasCoord, _a) {
        var row = _a[0], col = _a[1];
        return hasCoord || row + relativeRow === targetRow && col + relativeCol === targetCol;
    }, false);
}
function canHoldTetrimino() {
    if (holdingTetrimino === undefined) {
        return noCollisions(nextTetrimino, currRow, currCol);
    }
    else {
        return noCollisions(holdingTetrimino, currRow, currCol);
    }
}
function swapWithHoldingTetrimino() {
    if (holdingTetrimino === undefined) {
        holdingTetrimino = currTetrimino;
        currTetrimino = nextTetrimino;
        nextTetrimino = new tetrimino_1.Tetrimino();
    }
    else {
        var temp = currTetrimino;
        currTetrimino = holdingTetrimino;
        holdingTetrimino = temp;
    }
}
function renderHoldBlock() {
    notifyController(5 /* ClearHoldBlock */, null);
    holdingTetrimino.tiles().forEach(function (_a) {
        var row = _a[0], col = _a[1];
        notifyController(3 /* FillHoldTile */, [row, col]);
    });
}
function noCollisions(tetrimino, row, col) {
    return canMoveBlock(0, 0, function (i) { return tetrimino.rowAt(i) + row >= controller_1.HEIGHT
        || tetrimino.colAt(i) + col < 0 || tetrimino.colAt(i) + col >= controller_1.WIDTH; }, tetrimino, row, col);
}
function renderNextBlock() {
    notifyController(4 /* ClearNextBlock */, null);
    nextTetrimino.tiles().forEach(function (_a) {
        var row = _a[0], col = _a[1];
        notifyController(2 /* FillNextBlockTile */, [row, col]);
    });
}
function moveBlock(rowMove, colMove, edgeGridCondition) {
    if (canMoveBlock(rowMove, colMove, edgeGridCondition, currTetrimino, currRow, currCol)) {
        shiftBlock(rowMove, colMove);
    }
}
function shiftBlock(rowMove, colMove) {
    renderClearBlock();
    currRow += rowMove;
    currCol += colMove;
    renderBlock();
}
function renderClearBlock() {
    currTetrimino.tiles().forEach(function (_a) {
        var row = _a[0], col = _a[1];
        renderClearTile(row + currRow, col + currCol);
    });
}
function renderClearTile(row, col) {
    notifyController(6 /* ClearGridTile */, [row, col]);
}
function renderBlock() {
    currTetrimino.tiles().forEach(function (_a) {
        var row = _a[0], col = _a[1];
        renderTile(row + currRow, col + currCol);
    });
}
function renderTile(row, col) {
    notifyController(1 /* FillGridTile */, [row, col]);
}
function updateGridWithBlock() {
    currTetrimino.tiles().forEach(function (_a) {
        var row = _a[0], col = _a[1];
        grid_1.fillAt(row + currRow, col + currCol);
    });
}
function renderClearRow(row) {
    notifyController(0 /* ReplaceRow */, row);
}
function handleLineClears() {
    for (var row = 0; row < controller_1.HEIGHT; row++) {
        if (isFilledLine(row)) {
            clearLine(row);
        }
    }
}
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
// NEEDS FIXED
function canMoveBlock(rowMove, colMove, edgeGridCondition, tetrimino, row, col) {
    for (var i = 0; i < tetrimino_1.Tetrimino.LENGTH; i++) {
        if (edgeGridCondition(i)) {
            return false;
        }
        if (grid_1.isFilledAt(tetrimino.rowAt(i) + row + rowMove, tetrimino.colAt(i) + col + colMove)) {
            return false;
        }
    }
    return true;
}
function canMoveDown(tetrimino, row, col) {
    return canMoveBlock(1, 0, function (i) { return tetrimino.rowAt(i) + row >= controller_1.HEIGHT - 1; }, tetrimino, row, col);
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
        this.ROTATION_TYPES = 4;
        this.dimensions = utils_1.randomItemFromArray(blockTypes_1.blockTypes);
        this.rotationIndex = utils_1.randomIntBetween(0, this.ROTATION_TYPES);
    }
    Tetrimino.prototype.nextRotation = function () {
        if (this.rotationIndex === this.ROTATION_TYPES - 1)
            this.rotationIndex = 0;
        else
            this.rotationIndex++;
    };
    Tetrimino.prototype.prevRotation = function () {
        if (this.rotationIndex === 0)
            this.rotationIndex = this.ROTATION_TYPES - 1;
        else
            this.rotationIndex--;
    };
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
    Tetrimino.LENGTH = 4;
    return Tetrimino;
}());
exports.Tetrimino = Tetrimino;

},{"../utils":6,"./blockTypes":2}],6:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.deepCopy = exports.wait = exports.randomItemFromArray = exports.randomIntBetween = void 0;
// Generates a random integer whose value lies between lower and upper
function randomIntBetween(lower, upper) {
    return Math.floor(seededRandom() * (upper - lower)) + lower;
}
exports.randomIntBetween = randomIntBetween;
function randomItemFromArray(array) {
    return array[randomIntBetween(0, array.length)];
}
exports.randomItemFromArray = randomItemFromArray;
function wait() {
    var delayTimeInMilliseconds = 20;
    return new Promise(function (resolve) {
        setTimeout(resolve, delayTimeInMilliseconds);
    });
}
exports.wait = wait;
function deepCopy(item) {
    return JSON.parse(JSON.stringify(item));
}
exports.deepCopy = deepCopy;
var seed = 4;
function seededRandom() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

},{}],7:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.fillHoldBlockTileDOM = exports.fillNextBlockTileDOM = exports.clearHoldBlockDOM = exports.clearNextBlockDOM = exports.replaceGridRowDOM = exports.fillGridTileDOM = exports.eraseGridTileDOM = exports.initView = void 0;
var controller_1 = require("../controllers/controller");
var WALL_COLOR = "white";
var PLACEHOLDER = "pink";
var PREVIEW_DISPLAY_SIZE = 4;
var notifyController;
function initView(notif) {
    initGridInDOM();
    initHoldBlockDisplayDOM();
    initNextBlockDisplayDOM();
    initEventListeners();
    notifyController = notif;
}
exports.initView = initView;
function eraseGridTileDOM(_a) {
    var row = _a[0], col = _a[1];
    var tileDOM = getTileInDOM(row, col, "#grid");
    tileDOM.style.backgroundColor = WALL_COLOR;
}
exports.eraseGridTileDOM = eraseGridTileDOM;
function fillGridTileDOM(_a) {
    var row = _a[0], col = _a[1];
    fillTileDOM(row, col, "#grid");
}
exports.fillGridTileDOM = fillGridTileDOM;
function replaceGridRowDOM(row) {
    var gridDOM = getDOMElem("#grid");
    gridDOM.deleteRow(row);
    gridDOM.insertBefore(createEmptyRowInDOM(controller_1.WIDTH), gridDOM.rows[0]);
}
exports.replaceGridRowDOM = replaceGridRowDOM;
function clearNextBlockDOM() {
    clearBlockDOM(PREVIEW_DISPLAY_SIZE, PREVIEW_DISPLAY_SIZE, "#next-block");
}
exports.clearNextBlockDOM = clearNextBlockDOM;
function clearHoldBlockDOM() {
    clearBlockDOM(PREVIEW_DISPLAY_SIZE, PREVIEW_DISPLAY_SIZE, "#hold-block");
}
exports.clearHoldBlockDOM = clearHoldBlockDOM;
function fillNextBlockTileDOM(_a) {
    var row = _a[0], col = _a[1];
    fillTileDOM(row, col, "#next-block");
}
exports.fillNextBlockTileDOM = fillNextBlockTileDOM;
function fillHoldBlockTileDOM(_a) {
    var row = _a[0], col = _a[1];
    fillTileDOM(row, col, "#hold-block");
}
exports.fillHoldBlockTileDOM = fillHoldBlockTileDOM;
function clearBlockDOM(height, width, selector) {
    for (var row = 0; row < height; row++) {
        for (var col = 0; col < width; col++) {
            var tile = getTileInDOM(row, col, selector);
            tile.style.backgroundColor = WALL_COLOR;
        }
    }
}
function fillTileDOM(row, col, selector) {
    var elemDOM = getTileInDOM(row, col, selector);
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
    initGeneric(controller_1.HEIGHT, controller_1.WIDTH, "#grid");
}
function initGeneric(height, width, selector) {
    var elemDOM = getDOMElem(selector);
    for (var row = 0; row < height; row++) {
        elemDOM.append(createEmptyRowInDOM(width));
    }
}
function initEventListeners() {
    document.addEventListener("keydown", dealWithKeyPress);
    getDOMElem("#hold").addEventListener("click", function () { return notifyController(4 /* Hold */, null); });
    getDOMElem("#reset").addEventListener("click", function () { return location.reload(); });
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
    newTile.style.backgroundColor = WALL_COLOR;
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
        throw "Error querying selector " + selector + " ";
    }
    else {
        return elemDOM;
    }
}

},{"../controllers/controller":1}]},{},[1]);
