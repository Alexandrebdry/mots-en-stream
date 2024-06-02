'use client';

import {useAuth} from "@/store/twitch/userContext";
import {TwitchUserDto} from "@/infrastructure/twitch/dto/twitchUserDto";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {parseMessage, TwtichMessage} from "@/infrastructure/twitch/twtichMessage";
import {findAnagram, isMessageUnique} from "@/infrastructure/anagram";
import {getWordsDisplay} from "@/infrastructure/anagram/display";
import {FoundWord} from "@/model/message";
import {Words} from "@/component/words";
import {LettersType} from "@/model/letters";
import Letters from "@/component/letters";
import {DisplayWord} from "@/model/display";

type Words = {
    anagrams: string[][];
} & LettersType


export default function Page() {

    const router = useRouter();

    const { getUser, getToken } = useAuth();
    const user: TwitchUserDto = getUser();
    const {token} = getToken();

    const [messages, setMessages] = useState<TwtichMessage[]>([]);
    const [words, setWords] = useState<Words>({} as Words);
    const [foundWords, setFoundWords] = useState<FoundWord[]>([]);
    const [level, setLevel] = useState<number>(1);
    const baseLetter = 7;

    const displayWords: DisplayWord[] = getWordsDisplay(words?.anagrams, 10 + (2*level));

    useEffect(() => {
        const getWords = async () => {
            const response = await fetch(`/api/anagram?letter=${baseLetter+level}`);
            if(response.ok) {
                const data = await response.json();
                setWords(data);
            }
        };
        getWords();
    },[level]);

    useEffect(() => {
        const message = messages[messages?.length-1];
        if(words?.anagrams && displayWords) {
            if(findAnagram(message?.message, words?.anagrams))
                if(isMessageUnique(message?.message, foundWords, displayWords))
                    setFoundWords((prev) => [...prev, {user: message.author, word: message.message}]);
        }
    },[messages, words?.anagrams]);

    useEffect(() => {

        if(!user?.login && !token) router.push('/');

        const socket = new WebSocket('wss://irc-ws.chat.twitch.tv:443');
        socket.onopen = () => {
            console.log('Connected to Twitch chat');
            socket.send(`PASS oauth:${token}`);
            socket.send(`NICK ${user.login}`);
            socket.send(`JOIN #${user.login}`);

        };

        socket.onmessage = (event) => {
            const message = parseMessage(event.data);
            setMessages(prevMessages => [...prevMessages, message]);
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        socket.onclose = () => {
            console.log('Disconnected from Twitch chat');
        };

        return () => {
            socket.close();
        };

    }, []);


    return (
        <div>
            <h1>Chat en temps réel</h1>
            {words &&
                <>
                    {
                        words?.letters &&
                        <Letters
                            key={JSON.stringify(words.letters)}
                            fakeLetters={words?.fakeLetters}
                            hiddenLetters={words?.hiddenLetters}
                            letters={words?.letters}
                        />
                    }
                    {foundWords &&
                        words?.anagrams &&
                        <Words
                            foundedWords={foundWords}
                            wordsToFound={words?.anagrams?.flat()}
                            howToDisplay={displayWords}
                        />
                    }
                </>
            }
        </div>
    );

}