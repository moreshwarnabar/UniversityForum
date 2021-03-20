import React, { Component } from 'react';
import { connect } from 'react-redux';

// import RecentlyAsked from '../../components/Questions/RecentlyAsked';
import * as actions from '../../store/actions/creators/questions';
import Navbar from '../../components/UI/Navbar/Navbar';

class QuestionsPage extends Component {
  state = {
    isLoaded: false,
    questions: [],
    error: null,
    searchQuestion: '',
    searchRelatedQue: [],
    postQuestion: '',
    resetButton: '',
    showSearchQuestions: false,
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
    const id = this.props.categoryId;
    const data = { id, search: this.state.searchQuestion };

    this.props.onSearch(data);
    this.setState({ showSearchQuestions: true });
  };

  postQuestionChangeHandler = event => {
    this.setState({
      postQuestion: event.target.value,
    });
    console.log(this.state.postQuestion);
  };

  postQuestionSubmitHandler = event => {
    event.preventDefault();
    const data = {
      description: this.state.postQuestion,
      askedBy: this.props.user,
      category: {
        id: this.props.categoryId,
      },
    };

    this.props.onPost(data);
    this.setState({ postQuestion: '' });
  };

  resetSubmitHandler = event => {
    this.setState({ showSearchQuestions: false });
  };

  render() {
    const { isFetching, questions, searchQuestions } = this.props;

    return (
      <React.Fragment>
        <Navbar />

        {isFetching ? (
          <div>Loading...</div>
        ) : (
          <div>
            <br />
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-4 ">
                  {/* <div className="form-group card">
                  <div className=" card-header">
                    <label>Recently ask Question</label>
                  </div>
                  <RecentlyAsked categoryId={this.props.categoryId} />
                </div> */}

                  <div className="form-group card">
                    <div className="card-header">
                      <label>UnAnswered Question</label>
                    </div>
                    {questions
                      .filter(item => !item.answered)
                      .map(item => {
                        return (
                          <div
                            key={item.id}
                            className=" list-group-item"
                            onClick={this.handleClick}
                            style={{ cursor: 'pointer' }}
                          >
                            <h6 className="card-text">{item.description}</h6>
                            <footer className="blockquote-footer text-right">
                              {item.askedBy.firstName} {item.askedBy.lastName}
                            </footer>
                          </div>
                        );
                      })}
                  </div>
                </div>

                <div className="col-sm-8">
                  <form className=" card card-body">
                    <div className="row">
                      <input
                        className="col-sm-10 form-control input-sm panel-body"
                        id="search"
                        type="text"
                        value={this.state.searchQuestion}
                        placeholder="Search a Question......"
                        onChange={this.searchQuestionChangeHandler}
                        name="postQue"
                      />
                      <button
                        className="col-sm-2 btn btn-outline-success"
                        onClick={this.searchQuestionSubmitHandler}
                      >
                        Search
                      </button>
                    </div>
                  </form>
                  <br></br>

                  <div className="form-group postQuestion card">
                    <div className="card-header ">
                      <label>Post a Question</label>
                    </div>
                    <div className=" card-body ">
                      <div className="row">
                        <input
                          className="col-sm-10 form-control input-sm panel-body"
                          id="post"
                          type="text"
                          placeholder="post a question...."
                          value={this.state.postQuestion}
                          onChange={this.postQuestionChangeHandler}
                          name="postQue"
                        />
                        <button
                          className="col-sm-2 btn btn-outline-success"
                          onClick={this.postQuestionSubmitHandler}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="form-group questionAns card">
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
                </div>
              </div>
            </div>
          </div>
        )}
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
