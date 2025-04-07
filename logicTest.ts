async function processWithDelay(numbers: number[], delayTime: number = 1000): Promise<void> {
    // Validate Input
    if (!Array.isArray(numbers)) {
        throw new Error('Input must be an array.');
    }

    if (!numbers.every(num => typeof num === 'number')) {
        throw new Error('Array must contain only numbers.');
    }

    if (numbers.length === 0) {
        return;
    }

    // Show result with delay time
    for (const number of numbers) {
        console.log(number);

        await new Promise(resolve => setTimeout(resolve, delayTime));
    }
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
const delayTime = 2000;

processWithDelay(numbers, delayTime)
    .then(() => console.log('All numbers processed!'))
    .catch(error => console.error(error));