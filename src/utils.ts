// Generates a random integer whose value lies between lower and upper
export function randomIntBetween(lower: number, upper: number) {
    return Math.floor(Math.random() * (upper - lower)) + lower;
}

export function randomItemFromArray<T>(array: T[]): T {
    return array[randomIntBetween(0, array.length)];
}

export function wait(delayTime: number): Promise<void> {
    return new Promise(resolve => {
        setTimeout(resolve, delayTime);
    });
}