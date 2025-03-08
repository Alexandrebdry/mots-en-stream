import {useEffect, useState} from "react";
import {useGame} from "@/lib/store/game";

export function GameStarting() {

    const {setHasGameStarted} = useGame();

    const [startTimer, setStartTimer] = useState<number>(30);
    useEffect(() => {
        const interval = setInterval(() => {
            setStartTimer((prev) => {
                if(prev <= 1) {
                    setHasGameStarted(true)
                    setStartTimer(30);
                }
                return prev - 1;
            });
        },1000);

        return () => {
            clearInterval(interval);
        }
    }, [setHasGameStarted]);


    return (
        <div className="container mx-auto my-8" >
            <div className="flex  flex-col  gap-8 ">
                <h1 className="text-2xl">Bienvenue sur Anagame, le jeu des anagrames.</h1>
                <p>Les règles sont simples : trouver le maxiumum de mot, attention aux pièges.</p>
                <p>Pour jouer, taper votre message dans le tchat twitch.</p>
                <p>La partie va commencer dans  {startTimer}s</p>
            </div>
        </div>
    )
}