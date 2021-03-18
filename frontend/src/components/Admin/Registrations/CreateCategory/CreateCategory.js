import React, { Component } from 'react';
import { connect } from 'react-redux';

import CategoryForm from './CategoryForm/CategoryForm';
import * as validators from '../../../../validation/validation';
import * as categoryActions from '../../../../store/actions/actions';

class CreateCategory extends Component {
  state = {
    formData: {
      name: { value: '', isValid: false },
      facultyAccess: { value: '', isValid: false },
    },
    radioChoices: [
      { id: 'yes', name: 'facultyAccess', value: 'true' },
      { id: 'no', name: 'facultyAccess', value: 'false' },
    ],
    isFormValid: false,
    formErrors: null,
  };

  valueChangedHandler = event => {
    const { name, value } = event.target;

    const updatedFormData = { ...this.state.formData };
    const updatedElData = {
      value,
      isValid: name === 'gender',
    };
    updatedFormData[name] = updatedElData;

    this.setState({ formData: updatedFormData });
  };

  onBlurHandler = event => {
    const { name } = event.target;
    console.log(name);
    const { formErrors, formData } = this.state;
    const validationResult = this.validateField(name, formErrors, formData);
    this.setState({ ...validationResult });
  };

  validateField = (name, formErrors, formData) => {
    const result = validators[`${name}Validation`]({ ...formData[name] });
    const validatedFormData = { ...formData, [name]: result[name] };
    const updatedFormErrors = { ...formErrors, [name]: result.errorMsg };

    // check if valid detail
    const isFormValid = this.checkFormValidity(validatedFormData);

    return {
      formData: validatedFormData,
      formErrors: updatedFormErrors,
      isFormValid,
    };
  };

  checkFormValidity = formData => {
    return Object.values(formData).every(({ isValid }) => isValid);
  };

  createCategoryHandler = event => {
    event.preventDefault();
    const { formData, formErrors } = this.state;
    const finalFormErrors = {},
      updatedFormData = {};

    let isFormValid = true;
    Object.keys(formData).forEach(key => {
      const validationResult = this.validateField(key, formErrors, formData);
      finalFormErrors[key] = validationResult.formErrors[key];
      updatedFormData[key] = validationResult.formData[key];
      isFormValid = validationResult.isFormValid;
    });

    if (!isFormValid) {
      this.setState({
        formData: updatedFormData,
        formErrors: finalFormErrors,
        isFormValid,
      });
      return;
    }

    const data = {};
    for (let [key, { value }] of Object.entries(formData)) {
      data[key] = value;
    }

    this.props.onSubmit(data);
    this.setState({ formData: this.resetForm() });
  };

  resetForm = () => {
    const resetFormData = {};
    Object.keys(this.state.formData).forEach(
      key => (resetFormData[key] = { value: '', isValid: false })
    );
    return resetFormData;
  };

  resetFormHandler = event => {
    event.preventDefault();
    this.setState({ formData: this.resetForm() });
    this.props.onReset();
  };

  render() {
    const successMessage = this.props.isSuccess ? (
      <p className="text-success mb-3">Successfully Created Category</p>
    ) : null;

    return this.props.isCreatingCategory ? (
      <div
        className="p-2 col border rounded shadow bg-light"
        style={{ height: 'fit-content' }}
      >
        <div className="pl-2 w-100">
          <h3>Create Category</h3>
        </div>
        <div className="p-1 border-top">
          <CategoryForm
            {...this.state.formData}
            radio={this.state.radioChoices}
            changed={this.valueChangedHandler}
            reset={this.resetFormHandler}
            submit={this.createCategoryHandler}
            formErrors={this.state.formErrors}
            blur={this.onBlurHandler}
          />
        </div>
        <div className="mt-3">
          <p className="text-danger text-center" style={{ fontSize: '14px' }}>
            {this.props.errors}
          </p>
        </div>
      </div>
    ) : (
      <div
        className="d-flex flex-column justify-content-center align-items-center bg-light border rounded shadow-lg"
        style={{ width: '100%', minHeight: '38vh' }}
      >
        {successMessage}
        <button
          className="btn btn-primary btn-lg"
          type="button"
          onClick={() => this.props.onShow()}
        >
          Create Category
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.createCategory,
});

const mapDispatchToProps = dispatch => ({
  onShow: () => dispatch(categoryActions.showCategoryForm()),
  onReset: () => dispatch(categoryActions.resetCategoryForm()),
  onSubmit: data => dispatch(categoryActions.categoryCreation(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateCategory);
