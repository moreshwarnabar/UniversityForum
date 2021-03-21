import React, { Component, memo } from 'react';

import * as paginationConfig from '../../config/paginationConfigs';
import Pagination from '../UI/Pagination/Pagination';

class UnansweredQuestions extends Component {
  state = {
    unansweredQuestions: null,
    toDisplay: [],
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
    const unanswered = this.props.questions?.filter(
      question => !question.answered
    );
    const paginationResult = paginationConfig.initPagination(
      unanswered,
      this.state.pagination
    );

    this.setState({ unansweredQuestions: unanswered, ...paginationResult });
  }

  render() {
    const message = this.state.toDisplay.length ? null : (
      <div className="mt-3 text-center font-weight-bold">
        <p className="px-2">All questions answered... or were none asked?</p>
      </div>
    );

    return this.state.toDisplay ? (
      <div className="form-group card align-self-start">
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
                <p className="card-text mb-0">{item.description}</p>
                <footer className="blockquote-footer text-right">
                  {item.askedBy.firstName} {item.askedBy.lastName}
                </footer>
              </div>
            );
          })}
        {message ? (
          message
        ) : (
          <div className="m-2 d-flex justify-content-between">
            <Pagination
              {...this.state.pagination}
              clicked={this.pageChangeHandler}
            />
          </div>
        )}
      </div>
    ) : (
      <div>Loading...</div>
    );
  }
}

export default memo(UnansweredQuestions);
