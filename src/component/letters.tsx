import React, { useState, useEffect } from 'react';
import {LettersType} from "@/model/letters" ;



const Letters: React.FC<LettersType> = ({ letters, fakeLetters, hiddenLetters }) => {

    const [displayedLetters, setDisplayedLetters] = useState<string[]>(letters.split(''));

    useEffect(() => {
        const interval = setInterval(() => {
            // Générer un nouvel ordre aléatoire pour les lettres affichées
            const shuffledLetters = shuffleArray(displayedLetters);
            setDisplayedLetters(shuffledLetters);
        }, 5000); // Changer les lettres toutes les 5 secondes

        return () => clearInterval(interval); // Nettoyer l'intervalle lors du démontage du composant
    }, [displayedLetters]);

    // Fonction pour mélanger un tableau
    const shuffleArray = (array: string[]) => {
        const newArray = array.slice(); // Créer une copie du tableau pour éviter les effets de bord
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Échanger les éléments
        }
        return newArray;
    };

    return (
        <div>
            {displayedLetters.map((letter, index) => (
                <span key={index}>{letter}</span>
            ))}
        </div>
    );
};

export default Letters;