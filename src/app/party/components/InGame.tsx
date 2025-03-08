import Letters from "@/component/letters/letters";
import {useEffect} from "react";
import {getWordsDisplay} from "@/lib/services/anagram/display";
import {findAnagram, isMessageUnique} from "@/lib/services/anagram";
import {useGame} from "@/lib/store/game";
import {useMessages} from "@/lib/store/messages";
import {Words} from "@/component/words";
import {FoundWord} from "@/lib/model/message";
import {isGameWon} from "@/lib/services/game/party";


export function InGame() {
    
    const {anagrams, setGameOver ,setFoundedWords, setTimeLevel, letters, fakeLetters, hiddenLetters, level, foundedWords, timeLevel, goToNextLevel} = useGame()
    const {messages} = useMessages();

    const displayWords = getWordsDisplay(anagrams, 10 + (2*level));

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLevel((prev:number) => {
                if(prev <= 1)
                    return 0;
                return prev - 1;
            })
        },1000);
        
        return () => {
            clearInterval(interval);
        }
    }, [setTimeLevel]);

    useEffect(() => {
        const message = messages[messages?.length-1];
        if(anagrams && displayWords) {
            if(findAnagram(message?.message, anagrams))
                if(isMessageUnique(message?.message, foundedWords, displayWords))
                    setFoundedWords((prev: FoundWord[]) => [...prev, {user: message.author, word: message.message}]);
        }
    },[messages]);


    useEffect(() => {
        if(timeLevel === 0) {
            if(isGameWon({ anagrams, foundedWords, displayWords })) {
                goToNextLevel();
            }
            else setGameOver();
        }
    }, [foundedWords, anagrams, displayWords, timeLevel, setGameOver, goToNextLevel]);

    return (
        <div className="container mx-auto my-8" >
            <div>
                <p>Niveau {level}</p>
                <p>{timeLevel}s</p>
            </div>
            {letters && 
                <Letters
                    key={JSON.stringify(letters)}
                    fakeLetters={fakeLetters}
                    hiddenLetters={hiddenLetters}
                    letters={letters}
                />
            }
            {anagrams &&
                <Words
                    foundedWords={foundedWords}
                    wordsToFound={anagrams?.flat()}
                    howToDisplay={displayWords}
                />
            }
        </div>
    )
}