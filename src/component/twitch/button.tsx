'use client';

type ButtonTwitchProps = {
    onClick :  () => void
}
export default function ButtonTwitch ({onClick} : ButtonTwitchProps ) {

    return (
        <button onClick={onClick}>
            Connexion twitch
        </button>
    )
}