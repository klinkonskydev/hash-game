import { Button } from "../../components/button";
import { Link } from 'react-router-dom';

import './style.scss'

export function Options(){
  return (
    <div className="container-options">
      <Link to="/singleplayer">
        <Button>
          Modo 1x1
        </Button>
      </Link>

      <Link to="/cpumode">
        <Button>
          Modo 1xCPU
        </Button>
      </Link>
    </div>
  )
}