import React, { memo } from 'react';

const postQuestion = props => (
  <div className="w-100 form-group card" style={{ height: 'fit-content' }}>
    <div className="card-header ">
      <h5>Post a Question</h5>
    </div>
    <div className="card-body d-flex flex-column">
      <div className="form-group">
        <input
          className={`form-control ${props.error ? 'is-invalid' : null}`}
          id="post"
          type="text"
          placeholder="post a question...."
          value={props.postQuestion}
          onChange={props.postChange}
          name="postQue"
        />
        <div className="invalid-feedback">Please enter a question</div>
      </div>
      <button
        className="btn btn-outline-success align-self-end"
        onClick={props.postSubmit}
      >
        Submit
      </button>
    </div>
  </div>
);

export default memo(postQuestion);
