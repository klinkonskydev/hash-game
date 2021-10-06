import './style.scss';
import { Home } from "./pages/home";
import { Route, Switch } from 'react-router-dom';
import { Options } from './pages/Options';
import { Cpumode } from './pages/cpumode';


export function App() {
  return (
    <Switch>
      <Route path="/" exact component={Options} />

      <Route path="/singleplayer" exact component={Home} />
      <Route path="/cpumode" exact component={Cpumode} />
    </Switch>
  );
};