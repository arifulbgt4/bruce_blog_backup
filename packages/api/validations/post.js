const Validator = require('validator');
const isEmpty = require('./is-empty');

exports.validatePostInput = (data) => {
  const errors = {};
  const newData = { ...data };

  newData.title = !isEmpty(data.title) ? data.title : '';
  newData.body = !isEmpty(data.body) ? data.body : '';

  if (!Validator.isLength(newData.title, { min: 1, max: 300 })) {
    errors.title = 'Post must be between 1 and 300 characters';
  }

  if (Validator.isEmpty(newData.title)) {
    errors.title = 'Title is required';
  }

  if (Validator.isEmpty(newData.body)) {
    errors.body = 'Post body is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

exports.validateCommentInput = (data) => {
  const errors = {};
  const newData = { ...data };

  newData.body = !isEmpty(data.body) ? data.body : '';

  if (Validator.isEmpty(newData.body)) {
    errors.body = 'Comment is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
