import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Navbar from '../../components/UI/Navbar/Navbar';
import Registrations from '../../components/Admin/Registrations/Registrations';
import ListUsers from '../../components/Admin/ListUsers/ListUsers';
import ReportedAnswers from '../../components/Admin/ReportedAnswers/ReportedAnswers';
import Links from '../../components/UI/Links/Links';

class AdminPage extends Component {
  state = {
    linkData: [
      { goTo: '', label: 'Registrations' },
      { goTo: '/users', label: 'Users' },
      { goTo: '/answers', label: 'Answers' },
    ],
    index: 0,
  };

  selectHandler = selectedIndex => console.log(selectedIndex);

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="container pt-2 bg-light min-vh-100 d-flex flex-wrap justify-content-center">
          <Links links={this.state.linkData} url={this.props.match.url} />
          <Switch>
            <Route path="/admin/users" component={ListUsers} />
            <Route path="/admin/answers" component={ReportedAnswers} />
            <Route path="/admin" component={Registrations} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default AdminPage;
