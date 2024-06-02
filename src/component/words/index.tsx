import { useMemo } from "react";
import { Word } from "@/component/words/word";
import { WordType } from "@/model/word";
import { FoundWord } from "@/model/message";
import { DisplayWord } from "@/model/display";

type WordsProps = {
    wordsToFound: string[];
    foundedWords: FoundWord[];
    howToDisplay?: DisplayWord[];
};

function Words({ wordsToFound, foundedWords }: WordsProps) {

    const words: WordType[] = useMemo(() => {
        return wordsToFound.reduce((acc, word) => {
            const foundWord = foundedWords.find((foundWord) => foundWord.word === word);
            if(!!foundWord)
                acc.push({
                    message: word,
                    isFounded: !!foundWord,
                    foundBy: foundWord?.user,
                });
            return acc;
        }, [] as WordType[]);
    }, [wordsToFound, foundedWords]);



    return (
        words.map((word: WordType, key: number) =>
            <Word key={`${word?.message}-${key}`} message={word?.message} isFounded={word?.isFounded} foundBy={word?.foundBy} />
        )
    );
}

export { Words };
