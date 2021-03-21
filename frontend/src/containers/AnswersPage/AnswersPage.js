import React, { Component } from 'react';
import axios from '../../axios-base';

import PostAnswer from '../../components/Answers/PostAnswer';
import ShowAnswers from '../../components/Answers/ShowAnswers';
import Navbar from '../../components/UI/Navbar/Navbar';

class Answer extends Component {
  state = {
    isLoaded: false,
    answers: [],
    error: null,
    postAnswer: '',
  };

  componentDidMount() {
    axios.get('answers/question/1').then(response => {
      console.log(response);
      this.setState({
        answers: response.data.result,
        isLoaded: true,
      });
    });
    console.log(this.state.answers);
  }

  postAnswerChangeHandler = event => {
    this.setState({
      postAnswer: event.target.value,
    });
    console.log(this.state.postAnswer);
  };

  postAnswerSubmitHandler = event => {
    console.log('Submit button click');
    const answerRelatedData = {
      question: {
        id: 11,
      },

      answerBy: {
        id: 1,
      },
      answer: this.state.postAnswer,
    };
    if (this.validatePostedAnswer()) {
      axios
        .post('http://localhost:7071/forum/answers/', answerRelatedData)
        .then(response => {
          console.log(response);
        });
    }
  };

  postAnswerChangeHandler = event => {
    this.setState({
      postAnswer: event.target.value,
    });
    console.log(this.state.postAnswer);
  };

  reportHandler = event => {
    console.log('Report button click');

    console.log(event.currentTarget.id);
    const reportButtonRelatedData = {
      id: event.currentTarget.id,
      isReported: true,
    };

    axios
      .put(`http://localhost:7071/forum/answers/`, reportButtonRelatedData)
      .then(response => {
        console.log(response);
      });
  };

  likeHandler = event => {
    console.log('Like button click');

    console.log(event.currentTarget.id);

    alert(event.currentTarget.id + ' like button click ');
  };

  disLikeHandler = event => {
    console.log('DisLike button click');
    console.log(event.currentTarget.id);
    alert(event.currentTarget.id + ' dislike button click');
  };

  validatePostedAnswer = event => {
    console.log('validate' + this.state.postAnswer.trim().length);
    if (this.state.postAnswer.trim().length < 5) {
      alert('Your answer must be greater than 5 characters');
    } else {
      return true;
    }
  };

  render() {
    const { isLoaded, answers, postAnswer } = this.state;

    return (
      <React.Fragment>
        <Navbar />
        <div className="container pt-3 bg-light" style={{opacity: '0.9'}}>
          <PostAnswer
            postAnswer={this.state.postAnswer}
            postAnswerChangeHandler={this.postAnswerChangeHandler}
            postAnswerSubmitHandler={this.postAnswerSubmitHandler}
          />
          <ShowAnswers
            answers={this.state.answers}
            reportHandler={this.reportHandler}
            likeHandler={this.likeHandler}
            disLikeHandler={this.disLikeHandler}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Answer;
