import {FoundWord} from "@/model/message";
import {DisplayWord} from "@/model/display";

export function generateAnagrams(wordList: string[], letters: string): string[][] {
    const anagrams: Record<number, Set<string>> = {};

    for (const word of wordList) {
        const normalizedWord = removeAccents(word);
        if (normalizedWord.length > 3 && !normalizedWord.includes('-') && isAnagram(normalizedWord, letters)) {
            const length = normalizedWord.length;
            if (!anagrams[length]) {
                anagrams[length] = new Set();
            }
            anagrams[length].add(normalizedWord);
        }
    }

    const result: string[][] = [];
    for (const length in anagrams) {
        if (anagrams.hasOwnProperty(length)) {
            result.push(Array.from(anagrams[length]));
        }
    }

    return result;
}

export function generateRandomString(length: number): string {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';

    if (length > characters.length) {
        throw new Error('La longueur demandée dépasse le nombre de caractères uniques disponibles.');
    }

    const availableCharacters = characters.split('');

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * availableCharacters.length);
        result += availableCharacters[randomIndex];
        availableCharacters.splice(randomIndex, 1); // Supprimer le caractère utilisé
    }

    return result;
}

function removeAccents(word: string): string {
    return word.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}


function isAnagram(word: string, letters: string): boolean {
    const letterCounts: Record<string, number> = countLetters(letters);
    const wordLetterCounts: Record<string, number> = countLetters(word);

    for (const letter of Object.keys(wordLetterCounts)) {
        if (!(letter in letterCounts) || wordLetterCounts[letter] > letterCounts[letter]) {
            return false;
        }
    }

    return true;
}

function countLetters(word: string): Record<string, number> {
    const letterCounts: Record<string, number> = {};

    for (const letter of word) {
        if (letter in letterCounts) {
            letterCounts[letter]++;
        } else {
            letterCounts[letter] = 1;
        }
    }

    return letterCounts;
}


export function countTotalAnagrams(anagrams:string[][]): number {
    let total = 0;
    for (const length in anagrams) {
        if (anagrams.hasOwnProperty(length)) {
            total += anagrams[length].length;
        }
    }
    return total;
}

export function findAnagram(word: string, anagrams:string[][]): boolean {
    const nbLetter: number = word?.length;
    let anagramIndex: string = "0";

    for(const index  in anagrams) {
        const anagram = anagrams[Number(index)];
        if(nbLetter === anagram[0]?.length) {
            anagramIndex = index;
            break;
        }
    }
    return  anagrams[Number(anagramIndex)].includes(word);
}

export function isMessageUnique(message: string, foundWords: FoundWord[], displayWords: DisplayWord[]): boolean {
    const foundWordsList = foundWords.map(foundWord => foundWord.word);
    foundWordsList.sort((a, b) => a.length - b.length);

    const groupedWords: string[][] = [];
    foundWordsList.forEach(word => {
        const length = word.length;
        if (!groupedWords[length]) {
            groupedWords[length] = [];
        }
        groupedWords[length].push(word);
    });

    const messageLength: number = message.length;
    const wordsOfSameLength = groupedWords[messageLength] || [];

    if (wordsOfSameLength.length >= (displayWords.find(item => item.wordLength === messageLength)?.wordDisplay || 0)) {
        return false;
    }

    return !wordsOfSameLength.includes(message);
}