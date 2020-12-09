// Generates a random integer whose value lies between lower and upper
export function randomIntBetween(lower: number, upper: number) {
	return Math.floor(seededRandom() * (upper - lower)) + lower;
}

export function randomItemFromArray <T> (array: T[]): T {
    return array[randomIntBetween(0, array.length)];
}

export function wait(delayTime: number): Promise<void> {
    return new Promise(resolve => {
        setTimeout(resolve, delayTime);
    });
}

export function lastChar(str: string) {
    return str[str.length - 1];
}

export function sliceLastChar(str: string) {
    return str.slice(0, str.length - 1);
}

let seed = 6;
function seededRandom() {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}