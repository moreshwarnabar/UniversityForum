import React from 'react';

import styles from './Category.module.css';

const category = props => (
  <div
    className={`col-12 col-md-4 my-2 d-flex justify-content-center ${styles.Category}`}
  >
    <button
      className="btn btn-lg btn-primary btn-block text-uppercase"
      onClick={event => props.click(event, props.categoryName)}
      data-id={props.id}
    >
      {props.categoryName}
    </button>
  </div>
);
export default category;
