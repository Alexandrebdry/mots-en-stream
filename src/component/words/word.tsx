import {Case} from "@/component/words/case";
import {memo} from "react";
import {WordType} from "@/lib/model/word";

function WordsWord(word: WordType) {

    const words = word.message.split('');
    return (
       <div className="min-w-[400px] px-1 py-2 bg-gray-800 border border-orange-500 rounded-xl flex justify-between">
               <div>
                   { word.isFounded && word?.foundBy && (
                       <p>{word?.foundBy}</p>
                       )}
               </div>

           <div className="flex">
               {words.map( (letter :string, index : number) =>
                   <Case letter={letter} key={`${letter}-${index}`} isLetterDisplayed={word.isFounded} />
               )}
           </div>
       </div>
    )
}

const Word = memo(WordsWord);
export {Word};