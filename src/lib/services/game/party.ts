import { FoundWord } from "@/lib/model/message";
import { DisplayWord } from "@/lib/model/display";

export function isGameWon({anagrams, foundedWords, displayWords}: {
    anagrams: string[][],
    foundedWords: FoundWord[],
    displayWords: DisplayWord[]
}) {

    const percentage: number[] = [];
    const wordsFound: string[] = foundedWords.map((word) => word.word);
    anagrams?.forEach((anagram) => {
        anagram.forEach((word) => {
            if(wordsFound.includes(word)){
                const index = word.length
                if(percentage?.[index]) percentage[index]++;
                else percentage[index] = 1;
            }
        })
    });

    displayWords.forEach((word) => {
        const percentValue = percentage[word.wordLength] || 0;
        percentage[word.wordLength] = (percentValue / word.wordDisplay) * 100
    });

    const globalPercentage = percentage.reduce((a, b) => a + b, 0) / displayWords.length;

    return globalPercentage >= 70 ;
}
