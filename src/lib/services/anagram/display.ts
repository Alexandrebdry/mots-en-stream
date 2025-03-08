import { DisplayWord } from "@/lib/model/display";


export function getWordsDisplay(words: string[][], maxWord: number): DisplayWord[]  {
    if(!words) return [];
    const max: number = maxWord > 21 ? 21 : maxWord;
    const wordCounts = calculateWordCounts(words);
    const minFourLengthWords = Math.ceil(0.4 * max);
    const fourLengthWordsToAdd = Math.min(wordCounts[4] || 0, minFourLengthWords);

    const wordsToDisplay: DisplayWord[] = [
        { wordLength: 4, wordDisplay: fourLengthWordsToAdd }
    ];

    const wordsRemaining = max - fourLengthWordsToAdd;
    const lengths = getWordLengths(wordCounts);

    const remainingPercentages = calculateRemainingPercentages(lengths.length, max, fourLengthWordsToAdd);

    let totalAddedWords = distributeWords(wordsToDisplay, wordCounts, lengths, remainingPercentages, wordsRemaining, max);

    adjustWordCount(wordsToDisplay, wordCounts, max, totalAddedWords);

    return wordsToDisplay;
}


function calculateWordCounts(words: string[][]): number[] {
    const wordCounts: number[] = [];
    for (const wordList of words) {
        for (const word of wordList) {
            const wordLength = word.length;
            if (!wordCounts[wordLength]) {
                wordCounts[wordLength] = 0;
            }
            wordCounts[wordLength]++;
        }
    }
    return wordCounts;
}

function getWordLengths(wordCounts: number[]): number[] {
    const lengths = [];
    for (let i = 5; i < wordCounts.length; i++) {
        if (wordCounts[i]) {
            lengths.push(i);
        }
    }
    return lengths;
}

function calculateRemainingPercentages(numLengths: number, max: number, fourLengthWordsToAdd: number): number[] {
    const remainingPercentages: number[] = [];
    if (max > 14) {
        // Distribuer de manière égale si max > 14
        return Array(numLengths).fill(1 / numLengths);
    } else {
        // Utiliser la méthode de distribution originale
        let sumPercentages = 0;
        for (let i = 0; i < numLengths; i++) {
            const percentage = (numLengths - i) / (numLengths * (numLengths + 1) / 2);
            sumPercentages += percentage;
            remainingPercentages.push(percentage);
        }
        // Ajuster les pourcentages pour que la somme soit égale au pourcentage restant
        const remainingPercentage = 1 - fourLengthWordsToAdd / max;
        for (let i = 0; i < numLengths; i++) {
            remainingPercentages[i] = remainingPercentages[i] / sumPercentages * remainingPercentage;
        }
    }
    return remainingPercentages;
}


function distributeWords(
    wordsToDisplay: DisplayWord[],
    wordCounts: number[],
    lengths: number[],
    remainingPercentages: number[],
    wordsRemaining: number,
    max: number
): number {
    let totalAddedWords = wordsToDisplay[0].wordDisplay;
    for (let i = 0; i < lengths.length; i++) {
        if (totalAddedWords >= max) break; // Si on a déjà ajouté le nombre maximum de mots, arrêter
        const length = lengths[i];
        const wordsToAdd = Math.min(wordCounts[length], Math.ceil(remainingPercentages[i] * max));
        wordsToDisplay.push({ wordLength: length, wordDisplay: wordsToAdd });
        totalAddedWords += wordsToAdd;
        wordsRemaining -= wordsToAdd;
    }
    return totalAddedWords;
}


function adjustWordCount(
    wordsToDisplay: DisplayWord[],
    wordCounts: number[],
    max: number,
    totalAddedWords: number
) {
    if (totalAddedWords < max) {
        let remainingWords = max - totalAddedWords;
        for (let i = 0; i < wordsToDisplay.length && remainingWords > 0; i++) {
            const length = wordsToDisplay[i].wordLength;
            const maxAdd = wordCounts[length] - wordsToDisplay[i].wordDisplay;
            const wordsToAdd = Math.min(maxAdd, remainingWords);
            wordsToDisplay[i].wordDisplay += wordsToAdd;
            remainingWords -= wordsToAdd;
        }
    }
    if (totalAddedWords > max) {
        for (let i = wordsToDisplay.length - 1; i >= 0 && totalAddedWords > max; i--) {
            const excess = totalAddedWords - max;
            const reduceBy = Math.min(wordsToDisplay[i].wordDisplay, excess);
            wordsToDisplay[i].wordDisplay -= reduceBy;
            totalAddedWords -= reduceBy;
        }
    }
}