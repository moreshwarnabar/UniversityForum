import React, { Component } from 'react';
import { connect } from 'react-redux';

import PostAnswer from '../../components/Answers/PostAnswer';
import ShowAnswers from '../../components/Answers/ShowAnswers';
import Navbar from '../../components/UI/Navbar/Navbar';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/creators/answers';

class Answer extends Component {
  state = {
    postAnswer: '',
    postError: null,
  };

  componentDidMount() {
    const questionId = this.props.question.id;
    this.props.onPageLoad(questionId);
  }

  postAnswerChangeHandler = event => {
    this.setState({
      postAnswer: event.target.value,
    });
    console.log(this.state.postAnswer);
  };

  postAnswerSubmitHandler = () => {
    const data = {
      question: this.props.question,
      answerBy: this.props.user,
      answer: this.state.postAnswer,
    };
    if (this.validatePostedAnswer()) {
      this.props.onPostAnswer(data);
      this.setState({ postAnswer: '' });
    }
  };

  postAnswerChangeHandler = event => {
    this.setState({
      postAnswer: event.target.value,
    });
  };

  reportHandler = event => {
    const id = event.currentTarget.id;
    const data = {
      id: event.currentTarget.id,
      isReported: true,
    };

    this.props.onReport(data);
  };

  validatePostedAnswer = () => {
    if (
      this.state.postAnswer.trim().length < 5 ||
      this.state.postAnswer.trim().length > 500
    ) {
      const errMsg = 'Your answer must be between 5 and 500 characters';
      this.setState({ postError: errMsg });
      return false;
    } else {
      return true;
    }
  };

  render() {
    const { postAnswer, postError } = this.state;
    const { isFetching, answers, question } = this.props;

    return (
      <React.Fragment>
        <Navbar />
        <div className="container pt-3 bg-light" style={{ opacity: '0.9' }}>
          <PostAnswer
            question={question}
            postAnswer={postAnswer}
            postError={postError}
            postAnswerChangeHandler={this.postAnswerChangeHandler}
            postAnswerSubmitHandler={this.postAnswerSubmitHandler}
          />
          {isFetching ? (
            <div className="w-100 d-flex justify-content-center">
              <Spinner size={200} />
            </div>
          ) : (
            <ShowAnswers answers={answers} reportHandler={this.reportHandler} />
          )}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.login.user,
  question: state.questions.selectedQuestion,
  ...state.answers,
});

const mapDispatchToProps = dispatch => ({
  onPageLoad: id => dispatch(actions.fetchAnswers(id)),
  onPostAnswer: data => dispatch(actions.postAnswer(data)),
  onReport: data => dispatch(actions.reportAnswer(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Answer);
