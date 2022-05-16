import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Routes,
    Link
} from "react-router-dom";
import './App.css';
import FormControlled from "./components/FormControlled";


function App() {
  return (
      <>

          <div className="conteiner-fluid">
              <div className="row">
                  <div className="col-lg-5 col-md-5">

                  </div>
                  <div className="col-lg-2 col-md-2 mt-5">
                      <FormControlled />
                  </div>
              </div>
          </div>
          <div>

          </div>
          {/*<Router>*/}
              {/*<div>*/}
                  {/*<nav>*/}
                      {/*<ul>*/}
                          {/*<li>*/}
                              {/*/!*<Link to="/">Home</Link>*!/*/}
                              {/*<Route path="/home" component={Home} />*/}
                          {/*</li>*/}
                          {/*<li>*/}
                              {/*/!*<Link to="/cadastro">Cadastro</Link>*!/*/}
                              {/*<Route path="/cadastro" component={Cadastro} />*/}
                          {/*</li>*/}
                          {/*<li>*/}
                              {/*/!*<Link to="/login">Login</Link>*!/*/}
                              {/*<Route path="/login" component={Login} />*/}
                          {/*</li>*/}
                      {/*</ul>*/}
                  {/*</nav>*/}
              {/*</div>*/}
          {/*</Router>*/}
      </>
  );

}

export default App;
