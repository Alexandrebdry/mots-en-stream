'use client';

import {createContext, ReactNode, useCallback, useContext, useEffect, useState} from "react";
import {FoundWord} from "@/lib/model/message";
import {DisplayWord} from "@/lib/model/display";
import {getWordsDisplay} from "@/lib/services/anagram/display";

type GameContextType = {
    level: number;
    hiddenLetters: string[];
    fakeLetters: string[];
    letters: string;
    anagrams: string[][];
    foundedWords: FoundWord[];
    timeLevel: number;
    displayWords: DisplayWord[];
    goToNextLevel: () => void;
    setFoundedWords: any;
    setTimeLevel: any;
    hasGameStarted: boolean;
    setHasGameStarted: (hasGameStarted: boolean) => void;
    setGameOver: () => void;
}

const GameContext = createContext<GameContextType>({} as GameContextType);

export function GameProvider({children}: { children: ReactNode }) {

    const baseLetter = 8;

    const [hiddenLetters, setHiddenLetters] = useState<string[]>([]);
    const [fakeLetters, setFakeLetters] = useState<string[]>([]);
    const [letters, setLetters] = useState<string>("");
    const [anagrams, setAnagrams] = useState<string[][]>([]);
    const [level, setLevel] = useState<number>(1);
    const [hasGameStarted, setHasGameStarted] = useState<boolean>(false);

    const [timeLevel, setTimeLevel] = useState<number>(120);
    const [foundedWords, setFoundedWords] = useState<FoundWord[]>([]);

    const displayWords: DisplayWord[] = getWordsDisplay(anagrams, 10 + (2*level));

    const setGameOver = useCallback(() => {
        setLevel(1);
        setHasGameStarted(false);
        setFoundedWords([]);
        setTimeLevel(120);
    }, []);

    const goToNextLevel = useCallback(() => {
        setLevel((lvl) => lvl + 1);
        setFoundedWords([]);
        setTimeLevel(120);
    },[])

    useEffect(() => {
        const getWords = async () => {

            const searchParams = new URLSearchParams();
            searchParams.set("letter", String(baseLetter+level));
            if(level > 1) {
                if(level/2 >= 1) searchParams.set("hidden", String(level/2));
                if(level/4 >= 1) searchParams.set("fake", String(level/4));
            }

            const response = await fetch(`/api/anagram?letter=${searchParams.toString()}`);
            if(response.ok) {
                const data = await response.json();
                setAnagrams(data.anagrams);
                setLetters(data.letters);
                setHiddenLetters(data.hiddenLetters);
                setFakeLetters(data.fakeLetters);

            }
        };
        getWords();
    },[level]);

    return <GameContext.Provider value={{hiddenLetters, setGameOver ,goToNextLevel,setTimeLevel ,setFoundedWords, hasGameStarted, setHasGameStarted,  fakeLetters, letters, level, anagrams, timeLevel, displayWords, foundedWords}}>
        {children}
    </GameContext.Provider>

}

export const useGame = () => useContext(GameContext);