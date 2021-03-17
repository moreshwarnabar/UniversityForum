import React, { Component } from 'react';
import axios from 'axios';

import CategoryForm from './CategoryForm/CategoryForm';
import * as validations from '../../../../validation/validation';

class CreateCategory extends Component {
  state = {
    formData: {
      name: '',
      facultyAccess: '',
    },
    radioChoices: [
      { id: 'yes', name: 'facultyAccess', value: 'yes' },
      { id: 'no', name: 'facultyAccess', value: 'no' },
    ],
    isValid: false,
    isCreatingCategory: false,
    success: false,
    errors: null,
  };

  createCategoryHandler = event => {
    event.preventDefault();

    const errors = validations.validateCategory(this.state.formData);
    if (Object.keys(errors).length) {
      this.setState({ errors });
      return;
    }

    const data = {
      ...this.state.formData,
      facultyAccess: this.state.formData.facultyAccess === 'yes',
    };
    axios
      .post('http://localhost:8080/forum/category', data)
      .then(response => {
        console.log(response.data.result);
        this.setState({
          formData: this.resetForm(),
          isCreatingCategory: false,
          success: true,
        });
      })
      .catch(({ response }) =>
        this.setState({
          errors: { ...this.state.errors, name: response.data.errorMessage },
        })
      );
  };

  resetForm = () => {
    const resetFormData = {};
    Object.keys(this.state.formData).forEach(key => (resetFormData[key] = ''));
    return resetFormData;
  };

  resetFormHandler = event => {
    event.preventDefault();
    this.setState({ formData: this.resetForm(), errors: null });
  };

  valueChangedHandler = event => {
    const { name, value } = event.target;
    const updatedFormData = { ...this.state.formData, [name]: value.trim() };
    this.setState({ formData: updatedFormData });
  };

  showCategoryFormHandler = () => {
    this.setState({ isCreatingCategory: true, success: false });
  };

  render() {
    const successMessage = this.state.success ? (
      <p>Successfully Created Category</p>
    ) : null;

    return this.state.isCreatingCategory ? (
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
            errors={this.state.errors}
          />
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
          onClick={this.showCategoryFormHandler}
        >
          Create Category
        </button>
      </div>
    );
  }
}

export default CreateCategory;
