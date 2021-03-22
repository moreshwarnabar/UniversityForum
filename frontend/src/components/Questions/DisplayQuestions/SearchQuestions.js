import React from 'react';

const searchQuestions = props => {
  const message = props.questions.length ? null : (
    <div className="mt-3 text-center font-weight-bold">
      <p>
        No questions for your search query. Either refine your search or post a
        question!
      </p>
    </div>
  );

  return (
    <React.Fragment>
      <div className="card-header ">
        <label>Search Related Question</label>
        <button
          className="col-sm-2 btn btn-outline-success float-right"
          onClick={props.reset}
        >
          Reset
        </button>
      </div>
      {props.questions.map(item => (
        <div
          key={item.id}
          className="list-group-item"
          onClick={props.select}
          style={{ cursor: 'pointer' }}
          data-id={item.id}
        >
          <h6 className="card-text">
            {item.description} {item.id.answered}
          </h6>
          <footer className="blockquote-footer text-right">
            {item.askedBy.firstName} {item.askedBy.lastName}
          </footer>
        </div>
      ))}
      {message}
    </React.Fragment>
  );
};

export default searchQuestions;
