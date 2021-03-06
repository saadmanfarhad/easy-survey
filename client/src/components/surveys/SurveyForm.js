import React from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { map, forEach } from 'lodash';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

const SurveyForm = props => {
  const renderFields = () => {
    return map(formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          label={label}
          type="text"
          name={name}
          component={SurveyField}
        />
      );
    });
  };

  const { handleSubmit } = props;
  return (
    <div>
      <form onSubmit={handleSubmit(props.onSurveySubmit)}>
        {renderFields()}
        <Link to="/surveys" className="btn-flat white-text red">
          Cancel
        </Link>
        <button type="submit" className="teal btn-flat right white-text">
          Next
          <i className="material-icons right">done</i>
        </button>
      </form>
    </div>
  );
};

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

  forEach(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a ${name}!`;
    }

  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
