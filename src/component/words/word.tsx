import {Case} from "@/component/words/case";
import {memo} from "react";
import {WordType} from "@/model/word";

function WordsWord(word: WordType) {

    const words = word.message.split('');
    const pseudo = word?.foundBy?.split('');
    return (
       <div>
           {word?.isFounded && pseudo &&
               <div>
                   {pseudo.map( (letter :string, index : number) =>
                       <Case letter={letter} key={`${letter}-${index}`} isLetterDisplayed={word.isFounded} />
                   )}
               </div>
           }
           <div>
               {words.map( (letter :string, index : number) =>
                   <Case letter={letter} key={`${letter}-${index}`} isLetterDisplayed={word.isFounded} />
               )}
           </div>
       </div>
    )
}

const Word = memo(WordsWord);
export {Word};