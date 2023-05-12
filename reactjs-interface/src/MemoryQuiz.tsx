import { useState } from "react";
import CardItem from "./CardItem";

export type GameState = {
  pair:number[],
  flipped:number[]
}

const MemoryQuiz = ( props:{ cardList:number[] } ) => {
  
  console.log('render quiz');
  
  const [MQState, setMQState] = useState<GameState>({pair:[], flipped:[]});

  const setCardState = (cardID:number) => {
    
    if (MQState.flipped.includes(cardID)) return;
    let {pair, flipped} = MQState;
    if (pair.length == 1) {
      if (pair[0] == cardID) {
        flipped.push(cardID);
      }
      pair = [];
    }
    else pair = [cardID];

    setMQState({ pair, flipped });

  }

  const renderedList = props.cardList.map((it, index) => (

    <CardItem key={index} id={it} isFlipped={MQState.flipped.includes(it)} setCardState={setCardState} ></CardItem>

  ));

  return (
    <div className="overflow-hidden memory-quiz mx-auto bg-gray-200 rounded-lg text-gray-900 p-10 grid grid-rows-5 grid-cols-5 gap-4">
      {renderedList}
    </div>
  );
};

export default MemoryQuiz;