import React, { Component, memo } from 'react';

import * as paginationConfig from '../../config/paginationConfigs';
import Pagination from '../UI/Pagination/Pagination';

class UnansweredQuestions extends Component {
  state = {
    unansweredQuestions: null,
    toDisplay: null,
    pagination: {
      per: 3,
      current: 1,
      last: 1,
    },
  };

  pageChangeHandler = event => {
    const parent = event.target.closest('.btn');
    const next = +parent.dataset.goto;
    const { unansweredQuestions, pagination } = this.state;

    const toDisplay = paginationConfig.pageContentSlicer(
      unansweredQuestions,
      next,
      pagination.per
    );

    this.setState({ toDisplay, pagination: { ...pagination, current: next } });
  };

  componentDidMount() {
    const unanswered = this.props.questions.filter(
      question => !question.answered
    );
    const paginationResult = paginationConfig.initPagination(
      unanswered,
      this.state.pagination
    );

    this.setState({ unansweredQuestions: unanswered, ...paginationResult });
  }

  render() {
    return this.state.toDisplay ? (
      <div className="form-group card">
        <div className="card-header">
          <h5>Un-Answered Question</h5>
        </div>
        {this.state.toDisplay
          .filter(item => !item.answered)
          .map(item => {
            return (
              <div
                key={item.id}
                className=" list-group-item"
                onClick={this.props.clicked}
                style={{ cursor: 'pointer' }}
              >
                <p className="card-text">{item.description}</p>
                <footer className="blockquote-footer text-right">
                  {item.askedBy.firstName} {item.askedBy.lastName}
                </footer>
              </div>
            );
          })}
        <div className="m-2 d-flex justify-content-between">
          <Pagination
            {...this.state.pagination}
            clicked={this.pageChangeHandler}
          />
        </div>
      </div>
    ) : (
      <div>Loading...</div>
    );
  }
}

export default memo(UnansweredQuestions);
