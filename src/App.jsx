import { useState } from 'react'
import './App.css'
import { Square } from './components/Square.jsx'
import { TURNS} from './constants.js'
import { checkWinner } from './logic/board'
function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)

  const [winner, setWinner] = useState(null)

  

  const resetGame = ()=>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const updateBoard = (index)=>{
    if(board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
     
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      setWinner(()=>{
        return newWinner
      })
    }
  }

  return (
  <main className='board'>
    <h1>Jogo da Velha</h1>
    <button onClick={resetGame}>Resetar Jogo</button>
    <section className='game'>{
      board.map((_ ,index)=>{
        return(
          <Square 
            key={index} 
            index={index} 
            updateBoard={updateBoard}>
            {board[index]}
          </Square>
        )
      })
    }
    </section>

    <section className='turn'>
      <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
      <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
    </section>

    {
      winner != null && (
        <section className='winner'>
          <div className='text'>
            <h2>
              {
                winner === false ? 'Empate' : 'Ganhou'
              }
            </h2>
            <header className='win'>
              {winner && <Square>{winner}</Square>}
            </header>
            <footer>
              <button onClick={resetGame}>Jogar Novamente</button>
            </footer>
          </div>
        </section>
      ) 
    }

  </main>
  )
}

export default App
