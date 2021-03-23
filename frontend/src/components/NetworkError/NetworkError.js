import React from 'react';
import { connect } from 'react-redux';

import ModalWindow from '../UI/ModalWindow/ModalWindow';
import { onHide } from '../../store/actions/creators/networkError';

const networkError = props => {
  return (
    <ModalWindow
      showModal={props.isError}
      closeModal={props.onHide}
      {...props.error}
    />
  );
};

const mapStateToProps = state => ({ ...state.networkError });

const mapDispatchToProps = dispatch => ({ onHide: () => dispatch(onHide()) });

export default connect(mapStateToProps, mapDispatchToProps)(networkError);
