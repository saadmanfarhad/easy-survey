import React from 'react';
import { useSelector } from 'react-redux';
import formFields from './formFields';
import { map } from 'lodash';

const SurveyFormReview = ({ onCancel }) => {
  const { values } = useSelector(state => state.form.surveyForm);

  const reviewFields = map(formFields, ({name, label}) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>
          {values[name]}
        </div>
      </div>
    );
  })

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields()}
      <button className="yellow darken-2 white-text btn-flat" onClick={onCancel}>
        Back
      </button>
      <button className="green white-text btn-flat" onClick={onCancel}>
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

export default SurveyFormReview;
