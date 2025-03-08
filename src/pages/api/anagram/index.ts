
import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import {countTotalAnagrams, generateAnagrams, generateRandomString} from "@/lib/services/anagram";
import {selectRandomLetter, selectRandomLetterNotInWord} from "@/lib/services/anagram/letters";


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {

        const {hidden, fake, letter} = req.query ;
        const hiddenCount = parseInt(hidden as string) || 0;
        const fakeCount = parseInt(fake as string) || 0;
        const letterCount = parseInt(letter as string) || 10;


        const filePath = path.join(process.cwd(), 'public', 'words.json');
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        let anagrams: string[][] = [];
        let attempts = 0;
        let letters = "";

        while (countTotalAnagrams(anagrams) < 12 && attempts < 10) {
            letters = generateRandomString(letterCount);
            anagrams = generateAnagrams(data, letters);
            attempts++;
        }

        if (countTotalAnagrams(anagrams) >= 12) {
            const hiddenLetters: string[] = [];
            const fakeLetters: string[] = [];

            for (let i = 0; i < hiddenCount; i++) {
                hiddenLetters.push(selectRandomLetter(letters));
            }

            for (let i = 0; i < fakeCount; i++) {
                fakeLetters.push(selectRandomLetterNotInWord(letters));
            }

            res.status(200).json({ anagrams, letters, hiddenLetters, fakeLetters });
        } else {
            res.status(500).json({ error: 'Impossible de trouver suffisamment d\'anagrammes après plusieurs tentatives.' });
        }
    } else {
        res.status(405).json({ error: 'Méthode non autorisée.' });
    }
}