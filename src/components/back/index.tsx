import { Link } from "react-router-dom";
import arrowIMG from '../../assets/arrow.svg';

import './style.scss';

export interface Props {
  chield: string;
}

export function BackButton(){
  return (
    <Link to="/">
      <button className="button-back">
        <img src={arrowIMG} alt="" />
      </button>
    </Link>
  );
}