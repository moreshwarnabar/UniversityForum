import React, { Component } from 'react';

import './App.css';
import CategoryPage from './container/CategoryPage/CategoryPage';


class App extends Component {
  render() {
    return (
      <div className="App">
          {/* <LoginPage />  */}
        <CategoryPage />
      </div>
    );
  }
}

export default App;
