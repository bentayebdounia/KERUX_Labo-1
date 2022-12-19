import {BrowserRouter as Router , Route , Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Login from './login/login'
import Acueil from './Admin/Acueil'; 
import Process from './Agent/process.js';
import AcueilProcess from './test/acueil'
import './App.css';

import TestNet from './test/coupage/TestCoupage'
import Appp from './test/coupage/Appp.js';

function App() {
  return (
    
      
      <Router>
      
          <Switch>
              <Route  path = "/login" exact component ={Login} ></Route>
              <Route  path = "/admin" exact component ={Acueil} ></Route>
              <Route  path = "/process" exact component ={Process} ></Route>
              <Route  path = "/test" exact component ={AcueilProcess} ></Route>
              <Route  path = "/appp" exact component ={Appp} ></Route>

             
          </Switch>
      

      </Router>
      
   
  );
}

export default App;
