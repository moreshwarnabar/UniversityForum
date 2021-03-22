import React from 'react';

const PostAnswer = props => {
  const {
    askedBy: { firstName, lastName, role },
    askedOn,
  } = props.question;

  return (
    <div className="card post-que my-3">
      <div className="card-header">
        <h3 className="text-uppercase">{props.question.description}</h3>
        <div>
          <p
            className="text-capitalize mb-0"
            style={{ fontSize: '15px' }}
          >{`${firstName} ${lastName}, ${role.toLowerCase()}`}</p>
          <small className="text-muted mb-0">{askedOn}</small>
        </div>
      </div>
      <div className="card-body">
        <div className="form-group">
          <textarea
            className={`col-sm-12 form-control ${
              props.postError ? 'is-invalid' : null
            }`}
            rows="5"
            placeholder="post a answer"
            value={props.postAnswer}
            onChange={props.postAnswerChangeHandler}
          ></textarea>
          <div className="invalid-feedback">{props.postError}</div>
        </div>
        <button
          className=" btn btn-outline-success btn float-right"
          onClick={props.postAnswerSubmitHandler}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
export default PostAnswer;
