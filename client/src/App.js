import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import {BrowserRouter as Router, Switch, Route,} from "react-router-dom"
import LandingPage from './components/LandingPage';
import MainPage from './components/MainPage';
import Detail from './components/Detail';
import Form from './components/Form'

function App() {
  return (
    <Provider store={store}>
    <Router>
      <Switch > 
      <Route exact path='/' component={LandingPage}/>
      <Route path="/mainpage" component={MainPage}/>
      <Route path="/country/:idPais" component={Detail}/>
      {<Route path="/form" component={Form}/>}
      </Switch>
    </Router>
    </Provider>

  );
}

export default App;
