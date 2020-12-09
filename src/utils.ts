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

let seed = 6;
// A deteriministic random number generator, used only in development
function seededRandom() {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}