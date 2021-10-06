import { useState, useEffect } from 'react';
import { BackButton } from '../../components/back';
import { Button } from '../../components/button';
import './style.scss';

type Players = 'X' | 'O';

export function Cpumode() {
  const [ mark, setMark ] = useState<{ [key: string]: Players }>({});
  const [ playerTurn, setPlayerTurn ] = useState<Players>('X');
  const [ winner, setWinner ] = useState< Players|null >(null);

  const [ turn, setTurn ] = useState<boolean>(true);

  let [ scorePlayerX, setScorePlayerX ] = useState<number>(0);
  let [ scorePlayerO, setScorePlayerO ] = useState<number>(0);


  const getSquares = ( ) => {
    return new Array(9).fill(true);
  };

  const randomMarker = ( max: number ) => {
    let cpuMark = Math.floor(Math.random() * max);

    markCpu(cpuMark)
  }

  const markCpu = ( cpuPlay: number ) => {
    console.log(mark[cpuPlay])
    if( mark[cpuPlay] ){
      randomMarker( 9 )
    }
    else
    {
      setMark( prev => ({ ...prev, [cpuPlay]: 'O' }) );
      setTurn( prev => ( prev ? false : true ));
    }
  }

  const marking = ( index: number ) => {
    if( !mark[index] && !winner && turn ){
      
      setMark( prev => ({ ...prev, [index]: playerTurn }));
      setTurn( prev => ( prev ? false : true ));

      setTimeout( () => randomMarker(9), 800)
    } else {return}
  };

  const getColorsInMark = ( index: number ) => {
    if ( !mark[index] ){return};

    // Pega a marcação de tal posição e retora o que está escrito
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
        setScorePlayerO( scorePlayerO = scorePlayerO + 1 );

        localStorage.setItem('scroreOwithCpu', JSON.stringify(scorePlayerO));
        setTimeout( restartGame, 800)
      }
  };

  const restartGame = () => {
    setMark({})
    setWinner(null);
    setPlayerTurn('X');
  };

  const resetScore = () => {
    setScorePlayerX( 0 );
    localStorage.setItem('scroreXwithCpu', JSON.stringify(0));

    setScorePlayerO( 0 );
    localStorage.setItem('scroreOwithCpu', JSON.stringify(0));

    restartGame();    
  };

  useEffect(() => {
    const existsWinner = getWinner();

    if( existsWinner ){
      setWinner(existsWinner);
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
        <h1 id="player">{playerTurn == 'X' ? 'Sua vez!!' : 'CPU'}</h1>
      </div>

      <div className="pontuation-container">
        <div className="player-pontuation one">
          <h3 id="playerOne-pointer">{ Number(localStorage.getItem('scroreXwithCpu')) || scorePlayerX}</h3>
        </div>
        <div className="player-pontuation two">
          <h3 id="playerTwo-pointer">{ Number(localStorage.getItem('scroreOwithCpu')) || scorePlayerO}</h3>
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