import { useState, useEffect, useCallback } from 'react';
import { BackButton } from '../../components/back';
import { Button } from '../../components/button';
import './style.scss';

type Players = 'X' | 'O';

export function Cpumode() {
  const [ mark, setMark ] = useState<{ [key: string]: Players }>({});
  const [ winner, setWinner ] = useState< Players|boolean >(false);
  const [ hasClicked, setHasClicked ] = useState<boolean>(false);
  const [ playerTurn, setPlayerTurn ] = useState<Players>('X');
  let [ scorePlayerX, setScorePlayerX ] = useState<number>(0);
  let [ scoreCpu, setscoreCpu ] = useState<number>(0);
  let [ counter, setCounter ] = useState<number>(0);
  let [ turn, setTurn ] = useState<boolean>(true);
  let [ index, setIndex ] = useState<number>(0);
  
  


  const getSquares = ( ) => {
    return new Array(9).fill(true);
  };

  const marking = ( index: number ) => {
    if( !mark[index] && !winner && turn ){
      setMark( prev => ({ ...prev, [index]: playerTurn }));
      setTurn( prev => ( prev ? false : true ));

      setIndex(index);
      setHasClicked(true);
    } else {return}
  };

  const randomMarker = ( index: number ) => {
    if( winner === 'X' || winner === 'O') return;

    if( winner === false && Object.keys(mark).length !== 9 ){
      let randomNumber = Math.floor(Math.random() * 9);
      
      if( randomNumber !== index && mark[randomNumber] !== 'X' && mark[randomNumber] !== 'O' ){
        setMark( prev => ({ ...prev, [randomNumber]: 'O' }) );
        setTurn( prev => ( prev ? false : true ));

      } else 
      {
        randomMarker( index )
      }
    }
  };

  const getColorsInMark = ( index: number ) => {
    if ( !mark[index] ){return};

    return mark[index];
  };

  const getWinner = ( ) => {
    const victoryLiners = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],

      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      
      [1, 4, 7],
      [2, 5, 8],
    ];

    for( const line of victoryLiners){
      const [a, b, c] = line;

      if( mark[a] && mark[a] === mark[b] && mark[a] === mark[c]){
        saveResults(mark[a]);
        setHasClicked(false)
        return mark[a]; 
      }
    }
  };

  const saveResults = ( value: string ) => {
      if( value === 'X'){
        setScorePlayerX( scorePlayerX = scorePlayerX + 1 );
        
        localStorage.setItem('scroreXwithCpu', JSON.stringify(scorePlayerX));
        setTimeout( restartGame, 800)
      }
      
      if( value === 'O'){
        setscoreCpu( scoreCpu = scoreCpu + 1 );

        localStorage.setItem('scroreOwithCpu', JSON.stringify(scoreCpu));
        setTimeout( restartGame, 800)
      }
  };

  const restartGame = () => {
    setCounter(0)
    setHasClicked(false)
    setTurn(true)
    setWinner(false);
    setMark({})
    setPlayerTurn('X');
  };

  const resetScore = () => {
    setScorePlayerX( 0 );
    localStorage.setItem('scroreXwithCpu', JSON.stringify(0));

    setscoreCpu( 0 );
    localStorage.setItem('scroreOwithCpu', JSON.stringify(0));

    restartGame();
  };

  useEffect(() => {
    setCounter( 1 );

    let existsWinner = getWinner();
    if( existsWinner ){setWinner(existsWinner)} 

    if( !existsWinner ) {
      if( Object.keys(mark).length === 9 ){
        restartGame()
      }

      if( Object.keys(mark).length < 9 ){

        if( counter === 1 && hasClicked ){
          setHasClicked(false)
          setTimeout( () => randomMarker( index ), 300)
        }
      }
    }

  }, [mark]);

  useEffect( () => {
    if( localStorage.getItem('scroreXwithCpu') ) {
      const value = Number(localStorage.getItem('scroreXwithCpu'))
      setScorePlayerX(value);
    };
  
    if( localStorage.getItem('scroreOwithCpu') ) {
      const value = Number(localStorage.getItem('scroreOwithCpu'))
      setScorePlayerX(value);
    };
  }, [])

  return (
    <>
      <BackButton />
      
      <div className="player" id="player-container">
        <h1 id="player">{ turn ? 'Sua vez!!' : 'CPU' }</h1>
      </div>

      <div className="pontuation-container">
        <div className="player-pontuation one">
          <h3 id="playerOne-pointer">{ Number(localStorage.getItem('scroreXwithCpu')) || scorePlayerX}</h3>
        </div>
        <div className="player-pontuation two">
          <h3 id="playerTwo-pointer">{ Number(localStorage.getItem('scroreOwithCpu')) || scoreCpu}</h3>
        </div>
      </div>

      <div className={`poupout ${ winner ? 'actived' : ''}`} id="poupout">
        <h3 id="winner-poupout">O jogador {winner} ganhou!!</h3>
      </div>

      <main>
        <div className="buttons">
          <Button function={restartGame}>
            Restart
          </Button>

          <Button function={resetScore}>
            Reset score
          </Button>
        </div>

        <div className="container" id="container">
          {getSquares().map( (_, index) => (
            <div className="square" onClick={() => marking(index)} key={index}>
              <h1 className={getColorsInMark(index)}>{mark[index]}</h1>
            </div>
          ))}
        </div>
      </main>

      <footer>
        <h3>&copy;klinkonskydev</h3>
      </footer>
    </>
  );
};