export const validateCategory = formData => {
  const errors = {};

  if (!formData.name.trim().length) {
    errors.name = 'Please enter a valid name';
  }
  if (formData.name.length > 25) {
    errors.name = 'Name must be less than 25 characters';
  }
  if (!formData.facultyAccess.trim().length) {
    errors.facultyAccess = 'Please choose an option';
  }

  return errors;
};

export const validateUserRegistration = formData => {
  const errors = {};

  Object.keys(formData).forEach(key => {
    if (!formData[key].trim().length) {
      errors[key] = `Please enter a valid value`;
    }
  });
  if (formData.firstName.length > 25) {
    errors.firstName = 'First name must be less than 25 characters';
  }
  if (formData.lastName.length > 25) {
    errors.lastName = 'Last name must be less than 25 characters';
  }
  if (formData.username.length > 20) {
    errors.username = 'Username must be less than 20 characters';
  }
  if (formData.password.length > 15) {
    errors.password = 'Password must be less than 15 characters';
  }
  if (
    formData.username.trim.length > 0 &&
    !formData.username.endsWith('university.com')
  ) {
    errors.username = 'Username must belong to university domain';
  }
  if (!formData.gender.trim().length) {
    errors.gender = 'Please choose an option';
  }
  if (!formData.role.trim().length) {
    errors.role = 'Please choose an option';
  }

  return errors;
};

export const validateLogin = formData => {
  const errors = {};

  if (!formData.username.trim().length) {
    errors.username = 'Please enter a valid username';
  }
  if (!errors.username && !formData.username.endsWith('university.com')) {
    errors.username = 'Username must belong to university domain';
  }
  if (formData.username.length > 20) {
    errors.username = 'Username must be less than 20 characters';
  }
  if (!formData.password.trim().length) {
    errors.password = 'Please enter a valid password';
  }
  if (formData.password.length > 15) {
    errors.password = 'Password must be less than 15 characters';
  }

  return errors;
};
