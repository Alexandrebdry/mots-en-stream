import {useMemo} from "react";
import { Word } from "@/component/words/word";
import { WordType } from "@/lib/model/word";
import { FoundWord } from "@/lib/model/message";
import { DisplayWord } from "@/lib/model/display";

type WordsProps = {
    wordsToFound: string[];
    foundedWords: FoundWord[];
    howToDisplay?: DisplayWord[];
};

function Words({ wordsToFound, foundedWords, howToDisplay }: WordsProps) {

    const words: WordType[] = useMemo(() => {
        return wordsToFound.reduce((acc, word) => {
            const foundWord = foundedWords.find((foundWord) => foundWord.word === word);
            if(!!foundWord)
                acc.push({
                    message: word,
                    isFounded: true,
                    foundBy: foundWord?.user,
                });
            else acc.push({
                message: word,
                isFounded: false,
                foundBy: ""
            });
            return acc;
        }, [] as WordType[]);
    }, [wordsToFound, foundedWords]);

    const groupedWords = useMemo(() => {
        const grouped = words.reduce((acc, word) => {
            const wordLength = word.message.length;
            if (!acc[wordLength]) {
                acc[wordLength] = [];
            }
            acc[wordLength].push(word);
            return acc;
        }, {} as { [key: number]: WordType[] });

        return Object.values(grouped);
    }, [words]);

    return (
        <div className="mt-8 flex justify-center gap-4">
            {
                howToDisplay && howToDisplay?.length > 0 && howToDisplay.map((display, index) => {

                    //TODO - fix prb affichage
                    return (
                        <div className="flex flex-col gap-2" key={`${display.wordDisplay}-${index}`}>
                            {
                                groupedWords?.[index]?.map((word: WordType, key: number) => {
                                    if(key < display.wordDisplay)
                                        if(word.message.length === display.wordLength)
                                            return (
                                                <Word key={`${word?.message}-${key}-${index}`} message={word?.message} isFounded={word?.isFounded} foundBy={word?.foundBy} />
                                            )
                                }
                            )}
                        </div>
                    )

                })
            }
        </div>
    );
}

export { Words };
