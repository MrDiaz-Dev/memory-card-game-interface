// @ts-nocheck
import { useState } from "react";
import "./App.css";
import MemoryQuiz from "./MemoryQuiz";
import _ from "lodash";
import { gql, useMutation } from "@apollo/client";

const CREATE_GAME = gql`
  mutation createGame($p1_points: Int!, $p2_points: Int!) {
    createGame (gameInput: {
      p1_points: $p1_points,
      p2_points: $p2_points
    }) {
      game_id
    }
  }
`

function App() {
  const [startGame, setStartGame] = useState(false);
  const [player1Points, setPlayer1Points] = useState(0);
  const [player2Points, setPlayer2Points] = useState(0);
  const [turnOwner, setTurnOwner] = useState(1);
  const [turnCounter, setTurnCounter] = useState(1);
  const [cardListState, setCardListState] = useState([]);
  const [gameID, setGameID] = useState(null);

  const [ createGame ] = useMutation(CREATE_GAME);
  
  console.log(player1Points, " and ", typeof player2Points);

  const p1_points = parseInt(player1Points);
  const p2_points = parseInt(player2Points);

  // generate the list of memory cards
  var cardList = [];

  const setCards = () => {
    for (let i = 0; i < 12; i++) {
      cardList.push(i, i);
    }
    setCardListState([
      ...cardListState,
      _.shuffle(cardList)
    ]);
    setTimeout(() => {
      console.log('espera');
    }, 1000);
    // console.log('cardliststate',cardListState);
  };

  return (
    <>
      <h1 className="font-bold text-2xl my-4">5X5 Memory Card Game</h1>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <a
          onClick={async () => {
            let gameIDAux = await createGame({ variables: { p1_points, p2_points } });
            setGameID(gameIDAux.data.createGame.game_id);
            setCards()
            setStartGame(true);
          }} 
          className={`${
            startGame && "hidden"
          } block py-2 px-4 text-white font-medium bg-yellow-600 duration-150 hover:bg-yellow-500 active:bg-yellow-700 rounded-lg`}
          hidden
        >
          Start Game
        </a>
      </div>

      {startGame && (
        <div className="App flex flex-col items-center justify-top p-4">
          <div className="grid grid-cols-5 gap-9">
            <div>
              <h1 className="font-bold text-9xl my-18">{player1Points}</h1>
              <h1 className="font-bold text-2xl my-4">PLAYER-1</h1>
            </div>

            <br />

            <div>
              <h1 className="font-bold text-1xl my-4">TURN NUMBER</h1>
              <h1 className="font-bold text-6xl my-5">{turnCounter}</h1>
              <h1 className="font-bold text-2xl my-4">{`PLAY PLAYER-${turnOwner}`}</h1>
            </div>

            <br />

            <div>
              <h1 className="font-bold text-9xl my-18">{player2Points}</h1>
              <h1 className="font-bold text-2xl my-4">PLAYER-2</h1>
            </div>
          </div>

          <MemoryQuiz
            cardList={cardListState[0]}
            setP1P={setPlayer1Points}
            setP2P={setPlayer2Points}
            turnOwner={turnOwner}
            setTurnOwner={setTurnOwner}
            setTurnCounter={setTurnCounter}
            gameID={gameID}
          />
        </div>
      )}
    </>
  );
}

export default App;
