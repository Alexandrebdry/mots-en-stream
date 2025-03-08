import React, { useState, useEffect } from 'react';
import { LettersType } from "@/lib/model/letters";
import "./styles.css"

const shuffleArray = (array: string[]) => {
    const newArray = array.slice();
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

const Letters: React.FC<LettersType> = ({ letters, fakeLetters, hiddenLetters }) => {

    const [displayedLetters, setDisplayedLetters] = useState<string[]>(letters.split(''));
    const [animationKey, setAnimationKey] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {

            const shuffledLetters = shuffleArray(displayedLetters);
            setDisplayedLetters(shuffledLetters);
            setAnimationKey(prevKey => prevKey + 1);
        }, 10000);

        return () => clearInterval(interval);
    }, [displayedLetters]);




    const isFakeLetter = (letter: string, fakeLetters: string[]) => {
        return fakeLetters.includes(letter);
    }

    const isHiddenLetter = (letter: string, hiddenLetters: string[]) => {
        return hiddenLetters.includes(letter);
    }

    return (
        <div className="flex gap-8 flex-col items-center justify-center w-full">
            <h1 className="text-2xl">Les lettres</h1>
            <div className="flex gap-8">
                {displayedLetters.map((letter, index) => {
                    const isFake = isFakeLetter(letter, fakeLetters);
                    const isHidden = isHiddenLetter(letter, hiddenLetters);

                    return (
                        <p
                            className={`letter border w-[50px] text-center border-orange-500 rounded py-4 ${isHidden && 'bg-amber-600'}` }
                            key={`${animationKey}-${index}`}
                        >
                            {isHidden ? "?" : letter.toUpperCase()}
                        </p>
                    );
                })}
            </div>
        </div>
    );
};

export default Letters;
