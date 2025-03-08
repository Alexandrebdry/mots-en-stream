import {memo} from "react";

type WordsCaseProps = {
    letter: string;
    isLetterDisplayed: boolean;
}

function WordsCase({letter, isLetterDisplayed} : WordsCaseProps) {


    return(
        <button className="w-[50px] text-center border-orange-300 rounded border">
           <p>{isLetterDisplayed? letter : "?"}</p>
        </button>
    )

}

const Case = memo(WordsCase);
export {Case};
