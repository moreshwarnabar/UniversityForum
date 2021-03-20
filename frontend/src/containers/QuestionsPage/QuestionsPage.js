import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import RecentlyAsked from '../../components/Questions/RecentlyAsked';

class QuestionsPage extends Component {
  state = {
    isLoaded: false,
    questions: [],
    error: null,
    searchQuestion: '',
    searchRelatedQue: [],
    postQuestion: '',
    resetButton: '',
  };

  componentDidMount() {
    const id = this.props.categoryId;
    console.log(id);
    axios
      .get(`http://localhost:8080/forum/questions/all/${id}`)
      .then(response => {
        console.log(response);
        this.setState({
          questions: response.data.result,
          isLoaded: true,
        });
      });
    console.log(this.state.questions);
  }

  handleClick() {
    alert('Answer Page');
  }

  searchQuestionChangeHandler = event => {
    this.setState({
      searchQuestion: event.target.value,
    });
    console.log(this.state.searchQuestion);
  };

  searchQuestionSubmitHandler = event => {
    event.preventDefault();
    const id = this.props.categoryId;
    axios
      .get(
        `http://localhost:8080/forum/questions/filter/${this.state.searchQuestion}/${id}`
      )
      .then(response => {
        console.log(response);
        this.setState({
          searchRelatedQue: response.data.result,
          isLoaded: true,
        });
      });
    console.log(this.state.searchRelatedQue);
  };

  postQuestionChangeHandler = event => {
    this.setState({
      postQuestion: event.target.value,
    });
    console.log(this.state.postQuestion);
  };

  postQuestionSubmitHandler = event => {
    event.preventDefault();
    console.log('Submit button click');
    const questionRelatedData = {
      description: this.state.postQuestion,
      askedBy: {
        id: 2,
      },
      category: {
        id: this.props.categoryId,
      },
    };
    axios
      .post('http://localhost:8080/forum/questions', questionRelatedData)
      .then(response => {
        console.log(response);
        this.setState({ postQuestion: '' });
      });
  };

  resetSubmitHandler = event => {
    this.setState({ searchRelatedQue: '' });
  };

  render() {
    const { isLoaded, questions, searchRelatedQue } = this.state;

    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <br />
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-4 ">
                <div className="form-group card">
                  <div className=" card-header">
                    <label>Recently ask Question</label>
                  </div>
                  <RecentlyAsked categoryId={this.props.categoryId} />
                </div>

                <div className="form-group card">
                  <div className="card-header">
                    <label>UnAnswered Question</label>
                  </div>
                  {questions
                    .filter(item => !item.answered)
                    .map(item => {
                      return (
                        <div key={item.id} className=" list-group-item">
                          <h6 className="card-text" onClick={this.handleClick}>
                            {' '}
                            {item.description} {item.id.answered}
                          </h6>
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
                    {searchRelatedQue.length ? (
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
                        {searchRelatedQue.map(item => (
                          <div key={item.id} className=" list-group-item">
                            <h6
                              className="card-text"
                              onClick={this.handleClick}
                            >
                              {' '}
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
                        {questions.map(item => (
                          <div key={item.id} className=" list-group-item">
                            <h6
                              className="card-text"
                              onClick={this.handleClick}
                            >
                              {' '}
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
      );
    }
  }
}

const mapStateToProps = state => ({
  categoryId: state.category.selectedCategory,
});

export default connect(mapStateToProps)(QuestionsPage);
