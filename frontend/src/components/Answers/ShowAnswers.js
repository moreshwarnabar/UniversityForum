import React from 'react';
import { Flag, FlagFill } from 'react-bootstrap-icons';

const ShowAnswers = props => {
  return (
    <div className="card border-0">
      {props.answers.map(item => (
        <div className="card my-2" key={item.id}>
          <div className="card-header border-0">
            <p className="mb-0 text-capitalize">
              <span>
                {item.answerBy.firstName} {item.answerBy.lastName}
                {', '}
              </span>
              {item.answerBy.role.toLowerCase()}
            </p>
            <small className="text-muted">{item.answeredOn} </small>
          </div>
          <div className="list-group-item border-top-0">
            <p className="card-text text-justify">{item.answer}</p>

            <button
              className="float-right btn btn-outline-danger "
              id={item.id}
              onClick={props.reportHandler}
              disabled={item.isReported}
            >
              {item.isReported ? <FlagFill /> : <Flag />}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowAnswers;
