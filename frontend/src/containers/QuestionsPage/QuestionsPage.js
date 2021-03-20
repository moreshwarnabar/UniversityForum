import React, { Component } from 'react';
import { connect } from 'react-redux';

// import RecentlyAsked from '../../components/Questions/RecentlyAsked';
import * as actions from '../../store/actions/creators/questions';
import Navbar from '../../components/UI/Navbar/Navbar';
import UnansweredQuestions from '../../components/Questions/UnansweredQuestion';
import SearchQuestion from '../../components/Questions/QuestionsForms/SearchQuestion';
import PostQuestion from '../../components/Questions/QuestionsForms/PostQuestion';
import DisplayQuestions from '../../components/Questions/DisplayQuestions/DisplayQuestions';

class QuestionsPage extends Component {
  state = {
    searchQuestion: '',
    postQuestion: '',
    showSearchQuestions: false,
    searchError: false,
    postError: false,
  };

  componentDidMount() {
    const id = this.props.categoryId;
    this.props.onPageLoad(id);
  }

  handleClick() {
    alert('Answer Page');
  }

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

    const id = this.props.categoryId;
    const data = { id, search: this.state.searchQuestion };

    this.props.onSearch(data);
    this.setState({ showSearchQuestions: true, searchError: false });
  };

  postQuestionChangeHandler = event => {
    this.setState({
      postQuestion: event.target.value,
    });
    console.log(this.state.postQuestion);
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
        id: this.props.categoryId,
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
    const { isFetching, questions, searchQuestions } = this.props;

    return (
      <React.Fragment>
        <Navbar />

        <div className="container pt-3 bg-light">
          <div className="row" style={{ minHeight: '400px' }}>
            <div className="col-lg-4 ">
              {/* <div className="form-group card">
                  <div className=" card-header">
                    <label>Recently ask Question</label>
                  </div>
                  <RecentlyAsked categoryId={this.props.categoryId} />
                </div> */}
              <UnansweredQuestions
                questions={questions}
                clicked={this.handleClick}
              />
            </div>

            <div
              className="col-lg-8 d-flex flex-wrap align-items-center"
              style={{ height: '375px' }}
            >
              {/* <form className="card card-body mb-3">
                  <div className="form-group">
                    <input
                      className="form-control"
                      id="search"
                      type="text"
                      value={this.state.searchQuestion}
                      placeholder="Search a Question......"
                      onChange={this.searchQuestionChangeHandler}
                      name="postQue"
                    />
                  </div>
                  <button
                    className="col-sm-2 btn btn-outline-success align-self-end"
                    onClick={this.searchQuestionSubmitHandler}
                  >
                    Search
                  </button>
                </form>

                <div className="form-group card">
                  <div className="card-header ">
                    <h5>Post a Question</h5>
                  </div>
                  <div className="card-body d-flex flex-column">
                    <div className="form-group">
                      <input
                        className="form-control"
                        id="post"
                        type="text"
                        placeholder="post a question...."
                        value={this.state.postQuestion}
                        onChange={this.postQuestionChangeHandler}
                        name="postQue"
                      />
                    </div>
                    <button
                      className="col-sm-2 btn btn-outline-success align-self-end"
                      onClick={this.postQuestionSubmitHandler}
                    >
                      Submit
                    </button>
                  </div>
                </div> */}
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
          {isFetching ? (
            <div>Loading...</div>
          ) : (
            <div className="row">
              <DisplayQuestions
                search={searchQuestions}
                category={questions}
                showSearch={this.state.showSearchQuestions}
                click={this.handleClick}
                reset={this.resetSubmitHandler}
              />
            </div>
          )}
          {/* <div className="container">
                <div className="card mb-3">
                  <div>
                    {this.state.showSearchQuestions ? (
                      <div>
                        <div className="card-header ">
                          <label>Search Related Question</label>
                          <button
                            className="col-sm-2 btn btn-outline-success float-right"
                            onClick={this.resetSubmitHandler}
                          >
                            Reset
                          </button>
                        </div>
                        {searchQuestions.map(item => (
                          <div
                            key={item.id}
                            className=" list-group-item"
                            onClick={this.handleClick}
                            style={{ cursor: 'pointer' }}
                          >
                            <h6 className="card-text">
                              {item.description} {item.id.answered}
                            </h6>
                            <footer className="blockquote-footer text-right">
                              {item.askedBy.firstName} {item.askedBy.lastName}
                            </footer>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div>
                        <div className="card-header ">
                          <label>Category Related Question</label>
                        </div>
                        {this.props.questions.map(item => (
                          <div
                            key={item.id}
                            className=" list-group-item"
                            onClick={this.handleClick}
                            style={{ cursor: 'pointer' }}
                          >
                            <h6 className="card-text">
                              {item.description} {item.id.answered}
                            </h6>
                            <footer className="blockquote-footer text-right">
                              {item.askedBy.firstName} {item.askedBy.lastName}
                            </footer>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div> */}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.login.user,
  categoryId: state.category.selectedCategory,
  ...state.questions,
});

const mapDispatchToProps = dispatch => ({
  onPageLoad: id => dispatch(actions.fetchQuestions(id)),
  onSearch: data => dispatch(actions.fetchSearch(data)),
  onPost: data => dispatch(actions.postQuestion(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsPage);
