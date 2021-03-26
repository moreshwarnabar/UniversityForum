import * as validators from '../validation/validation';

export const validateField = (name, { formErrors, formData }) => {
  const result = validators[`${name}Validation`]({ ...formData[name] });
  const validatedFormData = { ...formData, [name]: result[name] };
  const updatedFormErrors = { ...formErrors, [name]: result.errorMsg };

  const isFormValid = checkFormValidity(validatedFormData);

  return {
    formData: validatedFormData,
    formErrors: updatedFormErrors,
    isFormValid,
  };
};

const checkFormValidity = formData => {
  return Object.values(formData).every(({ isValid }) => isValid);
};

export const resetForm = formData => {
  const resetFormData = {};
  Object.keys(formData).forEach(
    key => (resetFormData[key] = { value: '', isValid: false })
  );
  return resetFormData;
};

export const validateFormBeforeSubmit = ({ formErrors, formData }) => {
  const finalFormErrors = {},
    updatedFormData = {};

  let isFormValid = true;
  Object.keys(formData).forEach(key => {
    const validationResult = validateField(key, { formErrors, formData });
    finalFormErrors[key] = validationResult.formErrors[key];
    updatedFormData[key] = validationResult.formData[key];
    isFormValid = validationResult.isFormValid;
  });

  return {
    formData: updatedFormData,
    formErrors: finalFormErrors,
    isFormValid,
  };
};

export const dataFactory = formData => {
  const data = {};
  for (let [key, { value }] of Object.entries(formData)) {
    data[key] = value;
  }
  return data;
};

export const changeValue = (formData, name, value) => {
  const updatedElData = {
    value,
    isValid: name === 'gender',
  };
  formData[name] = updatedElData;

  return formData;
};
