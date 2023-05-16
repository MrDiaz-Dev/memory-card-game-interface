
import React from 'react';
import { gql, useQuery } from "@apollo/client";

const GET_GAMES = gql`
  query {
    getGames {
      game_id
      p1_points
      p2_points
      date
      getMoves {
        move_id
        player
        card_number
        turn
      }
    }
  }
`;

const Records = async () => {

  const queryResult = useQuery(GET_GAMES);

  const gamesRecords = queryResult.data.getGames;

  return (
    <>
      <h1>Records</h1>
      {
        // gamesRecords.map((element: any) => {
        //   <>
        //     <p>`Game ID: ${element.game_id} - Player 1 Points: ${element.p1_points} - Player 2 Points: ${element.p2_points} - Date of the game: ${element.date}`</p>
        //     <a
        //       // onClick={() => {
        //       // }} 
        //       className={`block py-2 px-4 text-white font-medium bg-yellow-600 duration-150 hover:bg-yellow-500 active:bg-yellow-700 rounded-lg`}
        //     >
        //       Show Moves
        //     </a>
        //   </>;
        // })
      }
    </>
  );
};

export default Records;