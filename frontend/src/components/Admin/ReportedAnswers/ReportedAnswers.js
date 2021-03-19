import React, { Component } from 'react';
import { connect } from 'react-redux';

import AnswersTable from './AnswersTable/AnswersTable';
import Pagination from '../../UI/Pagination/Pagination';
import ModalWindow from '../../UI/ModalWindow/ModalWindow';
import * as actions from '../../../store/actions/reportedAnswers';

class ReportedAnswers extends Component {
  state = {
    showModal: false,
    modalData: null,
    selectedAnswer: null,
  };

  deleteAnswerHandler = () => {
    const data = this.state.selectedAnswer.id;

    this.props.onDeleteAnswer(data);
    this.modalCloseHandler();
  };

  removeReportHandler = () => {
    const id = this.state.selectedAnswer.id;
    const data = { id, isReported: false };

    this.props.onRemoveReport(data);
    this.modalCloseHandler();
  };

  modalViewHandler = event => {
    const id = +event.target.dataset.answerid;
    const selectedAnswer = { ...this.props.answers.find(ans => ans.id === id) };

    const modalData = {};
    modalData.title = (
      <React.Fragment>
        <h4 style={{ fontFamily: 'Montserrat' }}>
          {selectedAnswer.question.description}
        </h4>
        <p
          className="m-0"
          style={{ fontSize: '10px', fontFamily: 'Montserrat' }}
        >
          <strong>Posted On: </strong>
          {selectedAnswer.question.askedOn}
        </p>
      </React.Fragment>
    );
    modalData.content = (
      <React.Fragment>
        <p style={{ fontFamily: 'Montserrat' }}>{selectedAnswer.answer}</p>
        <div style={{ fontFamily: 'Montserrat', fontSize: '13px' }}>
          <p className="m-0">
            {selectedAnswer.answerBy.firstName +
              ' ' +
              selectedAnswer.answerBy.lastName}
            , {selectedAnswer.answerBy.role}
          </p>
          <p className="m-0">{selectedAnswer.answeredOn}</p>
        </div>
      </React.Fragment>
    );
    modalData.btnLabels = { cancel: 'Remove Report', proceed: 'Delete' };

    this.setState({ showModal: true, modalData, selectedAnswer });
  };

  modalCloseHandler = () => {
    this.setState({ showModal: false, modalData: null, selectedAnswer: null });
  };

  pageChangeHandler = event => {
    const parent = event.target.closest('.btn');
    const next = +parent.dataset.goto;

    this.props.onPageChange(next);
  };

  componentDidMount() {
    this.props.onFetchReports();
  }

  render() {
    return (
      <div className="row m-0 justify-content-center align-self-start align-items-center w-100">
        <div className="container p-2 border rounded shadow bg-light">
          <ModalWindow
            showModal={this.state.showModal}
            closeModal={this.modalCloseHandler}
            cancel={this.removeReportHandler}
            proceed={this.deleteAnswerHandler}
            {...this.state.modalData}
          />

          <div>
            <h3>Reported Answers</h3>
          </div>
          <div className="pt-3 border-top table-responsive">
            <AnswersTable
              answers={this.props.toDisplay}
              clicked={this.modalViewHandler}
              isNoReports={this.props.isAnswersEmpty}
            />
          </div>
          <div className="d-flex justify-content-between">
            <Pagination
              {...this.props.pagination}
              clicked={this.pageChangeHandler}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.reportedAnswers,
});

const mapDispatchToProps = dispatch => ({
  onFetchReports: () => dispatch(actions.fetchReports()),
  onRemoveReport: data => dispatch(actions.removeReport(data)),
  onDeleteAnswer: data => dispatch(actions.deleteAnswer(data)),
  onPageChange: page => dispatch(actions.changeAnswersPage(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportedAnswers);
