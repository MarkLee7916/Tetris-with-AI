import { randomIntBetween, randomItemFromArray } from "../utils";
import { blockTypes } from "./blockTypes";

export class Tetrimino {
    // Represents shape of tetrimino
    private readonly dimensions: number[][][];

    // Which rotation we're on
    private rotationIndex: number;

    // The number of possible rotations a tetrimino could be in
    private static readonly ROTATION_TYPES = 4;

    // The number of tiles in a tetrimino
    public static readonly TILE_COUNT = 4;

    // Allows us consistently act on the same block (i.e keeping block the same colour)
    private readonly ID;

    constructor() {
        this.dimensions = randomItemFromArray(blockTypes);
        this.rotationIndex = randomIntBetween(0, Tetrimino.ROTATION_TYPES);
        this.ID = randomIntBetween(0, Tetrimino.ROTATION_TYPES * Tetrimino.TILE_COUNT);
    }

    public nextRotation() {
        if (this.rotationIndex === Tetrimino.ROTATION_TYPES - 1)
            this.rotationIndex = 0;
        else
            this.rotationIndex++;
    }

    public prevRotation() {
        if (this.rotationIndex === 0)
            this.rotationIndex = Tetrimino.ROTATION_TYPES - 1;
        else
            this.rotationIndex--;
    }

    public getID() {
        return this.ID;
    }

    // Return list of coordinates in tetrimino, where a coordinate is a row col pair 
    public tiles(): number[][] {
        return this.dimensions[this.rotationIndex];
    }

    public rowAt(index: number): number {
        const currentBlock = this.dimensions[this.rotationIndex];

        return currentBlock[index][0];
    }

    public colAt(index: number): number {
        const currentBlock = this.dimensions[this.rotationIndex];

        return currentBlock[index][1];
    }
}