import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/creators/questions';
import Navbar from '../../components/UI/Navbar/Navbar';
import UnansweredQuestions from '../../components/Questions/UnansweredQuestion';
import SearchQuestion from '../../components/Questions/QuestionsForms/SearchQuestion';
import PostQuestion from '../../components/Questions/QuestionsForms/PostQuestion';
import DisplayQuestions from '../../components/Questions/DisplayQuestions/DisplayQuestions';
import Spinner from '../../components/UI/Spinner/Spinner';

class QuestionsPage extends Component {
  state = {
    searchQuestion: '',
    postQuestion: '',
    showSearchQuestions: false,
    searchError: false,
    postError: false,
  };

  componentDidMount() {
    const id = this.props.category.id;
    this.props.onPageLoad(id);
  }

  componentDidUpdate() {
    const { category, onPageLoad, isFetching, currentCategory } = this.props;
    const id = category.id;

    if (currentCategory !== id && !isFetching) {
      onPageLoad(id);
    }
    if (currentCategory !== id && this.state.showSearchQuestions) {
      this.setState({ showSearchQuestions: false });
    }
  }

  componentWillUnmount() {
    this.setState({ showSearchQuestions: false });
  }

  handleClick = event => {
    const questionId = +event.target.closest('.list-group-item').dataset.id;
    const question = this.props.questions.find(que => que.id === questionId);
    const url = this.props.match.url;

    console.log(question);
    this.props.onSelectQuestion(question);
    this.props.history.push(`${url}/${question.description}`);
  };

  searchQuestionChangeHandler = event => {
    this.setState({
      searchQuestion: event.target.value,
    });
  };

  searchQuestionSubmitHandler = event => {
    event.preventDefault();
    if (!this.state.searchQuestion.trim().length) {
      this.setState({ searchError: true });
      return;
    }

    const id = this.props.category.id;
    const data = { id, search: this.state.searchQuestion };

    this.props.onSearch(data);
    this.setState({
      showSearchQuestions: true,
      searchError: false,
      searchQuestion: '',
    });
  };

  postQuestionChangeHandler = event => {
    this.setState({
      postQuestion: event.target.value,
    });
  };

  postQuestionSubmitHandler = event => {
    event.preventDefault();

    if (!this.state.postQuestion.trim().length) {
      this.setState({ postError: true });
      return;
    }

    const data = {
      description: this.state.postQuestion,
      askedBy: this.props.user,
      category: {
        id: this.props.category.id,
      },
    };

    this.props.onPost(data);
    this.setState({ postQuestion: '', postError: false });
  };

  resetSubmitHandler = event => {
    event.preventDefault();
    this.setState({ showSearchQuestions: false });
  };

  render() {
    const {
      isCatFetching,
      questions,
      searchQuestions,
      isSearchFetching,
    } = this.props;

    return (
      <React.Fragment>
        <Navbar />
        <div className="container pt-3 bg-light min-vh-100">
          <div
            className="mb-3 text-center text-uppercase"
            style={{ height: '50px' }}
          >
            <h2>{this.props.category.name}</h2>
          </div>
          <div className="row" style={{ minHeight: '400px' }}>
            <div className="col-lg-4 d-flex align-items-center">
              {isCatFetching ? (
                <div className="w-100 d-flex justify-content-center">
                  <Spinner loading={true} size={150} />
                </div>
              ) : (
                <UnansweredQuestions
                  questions={questions}
                  clicked={this.handleClick}
                />
              )}
            </div>

            <div
              className="col-lg-8 d-flex flex-wrap align-items-center"
              style={{ height: '375px' }}
            >
              <SearchQuestion
                searchQuestion={this.state.searchQuestion}
                searchChange={this.searchQuestionChangeHandler}
                searchSubmit={this.searchQuestionSubmitHandler}
                error={this.state.searchError}
              />
              <PostQuestion
                postQuestion={this.state.postQuestion}
                postChange={this.postQuestionChangeHandler}
                postSubmit={this.postQuestionSubmitHandler}
                error={this.state.postError}
              />
            </div>
          </div>
          <div className="row justify-content-center">
            {isCatFetching || isSearchFetching ? (
              <div className="mt-3">
                <Spinner loading={true} size={250} />
              </div>
            ) : (
              <DisplayQuestions
                search={searchQuestions}
                category={questions}
                showSearch={this.state.showSearchQuestions}
                click={this.handleClick}
                reset={this.resetSubmitHandler}
              />
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.login.user,
  category: state.category.selectedCategory,
  ...state.questions,
});

const mapDispatchToProps = dispatch => ({
  onPageLoad: id => dispatch(actions.fetchQuestions(id)),
  onSearch: data => dispatch(actions.fetchSearch(data)),
  onPost: data => dispatch(actions.postQuestion(data)),
  onSelectQuestion: data => dispatch(actions.selectQuestion(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsPage);
