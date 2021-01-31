import './App.css';
import Weather from './components/Weather';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import City from './components/City';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Weather />
          </Route>
          <Route exact path="/:id">
            <City />
          </Route>
          <Route exact path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
