// Generates a random integer whose value lies between lower and upper
export function randomIntBetween(lower: number, upper: number) {
	return Math.floor(seededRandom() * (upper - lower)) + lower;
}

export function randomItemFromArray <T> (array: T[]): T {
    return array[randomIntBetween(0, array.length)];
}

export function wait(): Promise<void> {
    const delayTimeInMilliseconds = 20;

    return new Promise(resolve => {
        setTimeout(resolve, delayTimeInMilliseconds);
    });
}

export function deepCopy <T> (item: T): T {
    return JSON.parse(JSON.stringify(item)); 
}

let seed = 4;
function seededRandom() {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}