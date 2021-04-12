import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import AuthProvider from "./AuthProvider";

class App extends React.Component {

  render() {
    return (
      <Router>
          <AuthProvider>
              <Route path="/" exact={true} component={Home}/>
          </AuthProvider>
      </Router>
    );
  }
}

export default App;
