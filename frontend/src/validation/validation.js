export const usernameValidation = username => {
  const { value } = username;
  let errorMsg = null;

  if (!value.trim().length) {
    errorMsg = 'Please enter a valid username';
  } else if (!value.endsWith('university.com')) {
    errorMsg = 'Username must belong to university domain';
  } else if (value.length > 20) {
    errorMsg = 'Username must be less than 20 characters';
  }
  username.isValid = !errorMsg;

  return { username, errorMsg };
};

export const passwordValidation = password => {
  const { value } = password;
  let errorMsg = null;

  if (!value.trim().length) {
    errorMsg = 'Please enter a valid password';
  } else if (value.length > 15) {
    errorMsg = 'Password must be less than 15 characters';
  }
  password.isValid = !errorMsg;

  return { password, errorMsg };
};

export const firstNameValidation = firstName => {
  const { value } = firstName;
  let errorMsg = null;

  if (!value.trim().length) {
    errorMsg = 'Please enter a valid first name';
  } else if (value.length > 25) {
    errorMsg = 'First name must be less than 25 characters';
  }
  firstName.isValid = !errorMsg;

  return { firstName, errorMsg };
};

export const lastNameValidation = lastName => {
  const { value } = lastName;
  let errorMsg = null;

  if (!value.trim().length) {
    errorMsg = 'Please enter a valid last name';
  } else if (value.length > 25) {
    errorMsg = 'Last name must be less than 25 characters';
  }
  lastName.isValid = !errorMsg;

  return { lastName, errorMsg };
};

export const genderValidation = gender => {
  const { value } = gender;
  let errorMsg = null;

  if (!value.trim().length) {
    errorMsg = 'Please choose an option';
  }
  gender.isValid = !errorMsg;

  return { gender, errorMsg };
};

export const dateOfBirthValidation = dateOfBirth => {
  const { value } = dateOfBirth;
  let errorMsg = null;

  if (!value.trim().length) {
    errorMsg = 'Please enter a valid date';
  }
  dateOfBirth.isValid = !errorMsg;

  return { dateOfBirth, errorMsg };
};

export const roleValidation = role => {
  const { value } = role;
  let errorMsg = null;

  if (!value.trim().length) {
    errorMsg = 'Please choose an option';
  }
  role.isValid = !errorMsg;

  return { role, errorMsg };
};

export const nameValidation = name => {
  const { value } = name;
  let errorMsg = null;

  if (!value.trim().length) {
    errorMsg = 'Please enter a valid name';
  } else if (value.length > 25) {
    errorMsg = 'Name must be less than 25 characters';
  }
  name.isValid = !errorMsg;

  return { name, errorMsg };
};

export const facultyAccessValidation = facultyAccess => {
  const { value } = facultyAccess;
  let errorMsg = null;

  if (!value.trim().length) {
    errorMsg = 'Please choose an option';
  }
  facultyAccess.isValid = !errorMsg;

  return { facultyAccess, errorMsg };
};
