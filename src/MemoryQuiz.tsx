// @ts-nocheck
import { useState } from "react";
import CardItem from "./CardItem";
import { gql, useMutation } from "@apollo/client";

export type GameState = {
  pair: number[];
  flipped: number[];
};

const UPDATE_GAME_POINTS = gql`
  mutation updateGamePoints ($game_id: Int!, $player_n: Int!) {
    updateGamePoints (game_id: $game_id, player_n: $player_n) {
      game_id
      p1_points
      p2_points
    }
  }
`


const MemoryQuiz = (props: {
  gameID: number;
  cardList: number[];
  setP1P: number;
  setP2P: number;
  turnOwner: number;
  setTurnOwner: React.Dispatch<React.SetStateAction<number>>;
  turnCounter: number;
  setTurnCounter: React.Dispatch<React.SetStateAction<number>>;
}) => {

  const [MQState, setMQState] = useState<GameState>({ pair: [], flipped: [] });

  const [ updateGamePoints ] = useMutation(UPDATE_GAME_POINTS);

  const player_n = props.turnOwner;
  const game_id = props.gameID;

  const switchTurns = () => {
    props.setTurnCounter(prevstate => prevstate + 1);
    props.setTurnOwner((prevstate) => {
      if (prevstate === 1) {
        return 2;
      } else {
        return 1;
      }
    });
  }

  const earnAPoint = () => {
    if (props.turnOwner === 1) {
      props.setP1P((prevstate: number) => prevstate + 1);
    } else {
      props.setP2P((prevstate: number) => prevstate + 1);
    }
    updateGamePoints({ variables: { game_id, player_n } });
  }

  const setCardState = (cardID: number) => {
    if (MQState.flipped.includes(cardID)) return;
    let { pair, flipped } = MQState;
    if (pair.length == 1) {
      if (pair[0] == cardID) {
        console.log("flipo");
        earnAPoint();
        flipped.push(cardID);
      } else {
        switchTurns()
      }
      pair = [];
    } else pair = [cardID];

    setMQState({ pair, flipped });
  };

  const renderedList = props.cardList.map((it, index) => (
    <CardItem
      key={index}
      id={it}
      isFlipped={MQState.flipped.includes(it)}
      setCardState={setCardState}
      turnOwner={props.turnOwner}
      turnCounter={props.turnCounter}
      gameID={props.gameID}
    ></CardItem>
  ));

  return (
    <div className="overflow-hidden memory-quiz mx-auto bg-gray-200 rounded-lg text-gray-900 p-10 grid grid-rows-5 grid-cols-5 gap-4">
      {renderedList}
    </div>
  );
};

export default MemoryQuiz;
