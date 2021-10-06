import './style.scss';

export function Button(props) {
  return (
    <button className="button" id="restart" onClick={props.function}>
      {props.children}
      <span></span>
    </button>
  );
}