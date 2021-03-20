import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
// import ProfilePage from './containers/ProfilePage/ProfilePage';
// import LoginPage from './containers/LoginPage/LoginPage';
import CategoryPage from './containers/CategoryPage/CategoryPage';
// import AdminPage from './containers/AdminPage/AdminPage';
// import QuestionsPage from './containers/QuestionsPage/QuestionsPage';

class App extends Component {
  render() {
    return (
      <div className="container-fluid px-0 App">
        {/* <Switch>
          <Route path="/admin" component={AdminPage} />
          <Route path="/categories" component={CategoryPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/" component={LoginPage} />
        </Switch> */}
<<<<<<< HEAD

        <ProfilePage />
        
=======
        {/* <QuestionsPage /> */}
        <CategoryPage />
>>>>>>> a16b570cb935da6ca37bebb65efb2a1f12b4fd1c
      </div>
    );
  }
}

export default App;
