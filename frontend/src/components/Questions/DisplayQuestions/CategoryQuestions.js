import React from 'react';

const categoryQuestions = props => {
  const message = props.questions?.length ? null : (
    <div className="mt-3 text-center font-weight-bold">
      <p>
        No questions asked in this category yet! Be the first and ask one now!
      </p>
    </div>
  );

  return (
    <div>
      <div className="card-header ">
        <label>Category Related Question</label>
      </div>
      {props.questions?.map(item => (
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
    </div>
  );
};

export default categoryQuestions;
