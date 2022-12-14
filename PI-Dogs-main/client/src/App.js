import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import Home from './Components/Home';
// import LandingPage from './Components/LandingPage';
// import Home from './Components/Home'


function App() {
  return (
    <BrowserRouter>
    <div className="App">
     <Switch>
       <Route exact path='/' component={LandingPage}/>
       <Route path='/home' component={Home}/>
     </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;

