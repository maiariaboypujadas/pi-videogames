
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import {Form, Home, LandingPage, Detail} from './views';
import { Route } from 'react-router-dom';


function App() {


  const location = useLocation();
  return (
    <div className="App">
      <div className='image'>
      <h1 className='Title'>WELCOME</h1>
      <h2 className='Title'>Ready to find your videogame?</h2>
      {location.pathname !== "/" && <NavBar/> }
      <Route exact path="/" component={LandingPage}/> 
      <Route path="/home" component={Home}/>
      <Route path="/create" component={Form}/>
      <Route path="/detail/:id" component={Detail} />
  
      </div>
    </div>
  );
}

export default App;
