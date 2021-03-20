import React, { memo } from 'react';

const categoryQuestions = props => (
  <div>
    <div className="card-header ">
      <label>Category Related Question</label>
    </div>
    {props.questions.map(item => (
      <div
        key={item.id}
        className=" list-group-item"
        onClick={props.select}
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
);

export default memo(categoryQuestions);
