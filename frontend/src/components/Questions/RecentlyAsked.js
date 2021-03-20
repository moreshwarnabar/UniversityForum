import React from 'react';
import axios from 'axios';

class RecentlyAsked extends React.Component {
  state = {
    isLoading: true,
    questions: [],
    error: null,
  };

  componentDidMount() {
    axios
      .get(
        `http://localhost:8080/forum/questions/recentlyask/${this.props.categoryId}`
      )

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

  render() {
    const { isLoaded, questions } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          {questions.map(item => (
            <div key={item.id} className=" list-group-item">
              <h6 className="card-text" onClick={this.handleClick}>
                {' '}
                {item.description} {item.id.answered}
              </h6>
              <footer className="blockquote-footer text-right">
                {item.askedBy.firstName} {item.askedBy.lastName}
              </footer>
            </div>
          ))}
        </div>
      );
    }
  }
}

export default RecentlyAsked;
