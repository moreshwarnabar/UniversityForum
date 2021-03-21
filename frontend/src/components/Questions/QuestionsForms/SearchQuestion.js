import React, { memo } from 'react';

const searchQuestion = props => {
  // console.log('search q render');
  return (
    <form className="w-100 card card-body " style={{ height: 'fit-content' }}>
      <div className="form-group">
        <input
          className={`form-control ${props.error ? 'is-invalid' : null}`}
          id="search"
          type="text"
          value={props.searchQuestion}
          placeholder="Search a Question......"
          onChange={props.searchChange}
          name="postQue"
        />
        <div className="invalid-feedback">Please enter a question</div>
      </div>
      <button
        className="btn btn-outline-success align-self-end"
        onClick={props.searchSubmit}
      >
        Search
      </button>
    </form>
  );
};

export default memo(searchQuestion);
