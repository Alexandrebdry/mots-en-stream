export function selectRandomLetter(word: string): string {
    const randomIndex = Math.floor(Math.random() * word.length);
    return word[randomIndex];
}

export function selectRandomLetterNotInWord(word: string): string {
    const allLetters = 'abcdefghijklmnopqrstuvwxyz';
    const wordLetters = new Set(word);
    const availableLetters = allLetters.split('').filter(letter => !wordLetters.has(letter));

    if (availableLetters.length === 0) {
        throw new Error('Toutes les lettres sont présentes dans le mot.');
    }

    const randomIndex = Math.floor(Math.random() * availableLetters.length);
    return availableLetters[randomIndex];
}