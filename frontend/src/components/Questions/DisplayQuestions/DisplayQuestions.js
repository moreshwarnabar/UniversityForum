import React, { memo } from 'react';

import SearchQuestions from './SearchQuestions';
import CategoryQuestions from './CategoryQuestions';

const displayQuestions = props => (
  <div className="container">
    <div className="card mb-3">
      <div>
        {props.showSearch ? (
          <SearchQuestions
            reset={props.reset}
            questions={props.search}
            select={props.click}
          />
        ) : (
          <CategoryQuestions questions={props.category} select={props.click} />
        )}
      </div>
    </div>
  </div>
);

export default memo(displayQuestions);
