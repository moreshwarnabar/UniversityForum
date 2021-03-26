import React from 'react';
import * as Icons from 'react-bootstrap-icons';

const pagination = props => {
  const { current, last } = props;

  return (
    <React.Fragment>
      <button
        className="btn btn-primary btn-sm"
        type="button"
        data-goto={current - 1}
        onClick={props.clicked}
        disabled={current <= 1}
      >
        <Icons.CaretLeftFill />
      </button>
      <span className="font-weight-bold" style={{padding: '3px 0'}}>{current}</span>
      <button
        className="btn btn-primary btn-sm"
        type="button"
        data-goto={current + 1}
        onClick={props.clicked}
        disabled={current >= last}
      >
        <Icons.CaretRightFill />
      </button>
    </React.Fragment>
  );
};

export default pagination;
