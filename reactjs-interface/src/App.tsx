import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MemoryQuiz from './MemoryQuiz';
import _ from 'lodash';

function App() {
  
  // generate the list of memory cards
  const cardList = []
  
  for (let i = 0; i < 12; i++) {
    cardList.push(i,i);  
  }

  return (
    <div className='App flex flex-col items-center justify-top p-4'>
      <h1 className='font-bold text-2xl my-4'>
        5X5 Memory Card Game
      </h1>
      <MemoryQuiz cardList={_.shuffle(cardList)}/>
    </div>
  )
}

export default App
