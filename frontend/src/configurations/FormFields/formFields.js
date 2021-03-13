export const inputFactory = (label, config, value = '') => {
  return {
    elementType: 'input',
    label,
    value,
    config,
  };
};

export const radioFactory = (group, choices) => {
  return {
    elementType: 'radio',
    group,
    name: group.toLowerCase(),
    choices,
  };
};

export const selectFactory = (label, options) => {
  return {
    elementType: 'select',
    label,
    id: label.toLowerCase(),
    name: label.toLowerCase(),
    options,
  };
};
