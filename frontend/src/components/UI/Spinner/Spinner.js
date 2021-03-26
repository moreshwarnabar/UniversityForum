import React from 'react';
import { ClipLoader } from 'react-spinners';

const spinner = props => (
  <ClipLoader loading={props.loading} size={props.size} />
);
export default spinner;
