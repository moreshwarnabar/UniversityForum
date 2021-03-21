import React from 'react';

const PostAnswer = props => (
  <div className="card post-que my-3">
    <div className="card-header">
      <h3 className="text-uppercase">Q: what is process</h3>
    </div>
    <div className="card-body">
      <div className="form-group">
        <textarea
          className="col-sm-12 form-control"
          rows="5"
          placeholder="post a answer"
          value={props.postAnswer}
          onChange={props.postAnswerChangeHandler}
        ></textarea>
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
export default PostAnswer;
