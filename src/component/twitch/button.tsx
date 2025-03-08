'use client';

type ButtonTwitchProps = {
    onClick :  () => void
}
export default function ButtonTwitch ({onClick} : ButtonTwitchProps ) {

    return (
        <button className="border px-6 py-4 rounded-md" onClick={onClick}>
            Connexion twitch
        </button>
    )
}