import { useRef } from "react";

import { gql, useMutation } from "@apollo/client";

const CREATE_MOVE = gql`
  mutation createMove (
      $game_id: Int!,
      $turn: Int!,
      $player: Int!,
      $card_number: Int!
    ){
    createMove (createMoveInput: {
      game_id: $game_id,
      turn: $turn,
      player: $player,
      card_number: $card_number
    }) {
      move_id
      game_id
      turn
      player
      card_number
    }
  }
`

const CardItem = (props: {
  id: number,
  isFlipped: boolean,
  setCardState: (cardID: number) => void;
  turnOwner: number,
  turnCounter: number,
  gameID: number,
}) => {

  const [createMove] = useMutation(CREATE_MOVE);

  const theOpacity = props.isFlipped ? '0' : '1' ;

  const divRef = useRef<HTMLDivElement>(null);

  let timeOutID: number;

  return (
    <div 
      className="transition-all duration-500 relative rounded-lg card-item float-left m-1 cursor-pointer w-100 h-100"
      style={{opacity:theOpacity}} 
      onClick={() => {

        const game_id = props.gameID;
        const turn = props.turnCounter;
        const player = props.turnOwner;
        const card_number = props.id + 1;

        createMove({ variables: { game_id, turn, player, card_number } })

        // set card state
        props.setCardState(props.id)

        // hide card with timeout
        divRef.current!.style.display = 'none';
        clearTimeout(timeOutID);
        timeOutID = setTimeout(() => {
          divRef.current!.style.display = 'block';
        }, 1000);
      }}
    >
      <img src={`../public/assets/${props.id + 1}.png`} alt="" />
      {/* <p>{props.id + 1}</p> */}
      <div ref={divRef} className="absolute top-0 left-0 w-full h-full bg-blue-500"></div>

    </div>
  );
};

export default CardItem;