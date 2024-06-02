import {memo} from "react";

type WordsCaseProps = {
    letter: string;
    isLetterDisplayed: boolean;
}

function WordsCase({letter, isLetterDisplayed} : WordsCaseProps) {


    return(
        <button style={{background: "red"}}>
           <p>{!!letter? letter : 0}</p>
        </button>
    )

}

const Case = memo(WordsCase);
export {Case};
