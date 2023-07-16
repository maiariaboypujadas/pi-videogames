
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import {Form, Home, LandingPage, Detail, About} from './views';
import { Route } from 'react-router-dom';
function App() {


  const location = useLocation();
  return (
    <div className="App">
      <div className='image'>
      <h1 className='Title'>WELCOME</h1>
      {location.pathname !== "/" && <NavBar/> }
      <Route exact path="/" component={LandingPage}/> 
      <Route path="/home" component={Home}/>
      <Route path="/create" component={Form}/>
      <Route path="/about" component={About} />
      <Route path="/detail/:id" component={Detail} />
  
      </div>
    </div>
  );
}

export default App;
