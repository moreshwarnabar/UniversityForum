import React, { Component } from 'react';

import CategoryForm from './CategoryForm/CategoryForm';

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
  };

  valueChangedHandler = event => {
    const { name, value } = event.target;
    const updatedFormData = { ...this.state.formData, [name]: value };
    this.setState({ formData: updatedFormData });
  };

  render() {
    return (
      <div className="p-2 border rounded shadow">
        <div className="pl-2 w-100">
          <h3>Create Category</h3>
        </div>
        <div className="p-1 border-top">
          <CategoryForm
            {...this.state.formData}
            radio={this.state.radioChoices}
            changed={this.valueChangedHandler}
          />
        </div>
      </div>
    );
  }
}

export default CreateCategory;
