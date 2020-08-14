import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import formFields from './formFields';
import * as actions from '../../actions';
import { map } from 'lodash';

const SurveyFormReview = ({ onCancel, history }) => {
  const { values } = useSelector(state => state.form.surveyForm);
  const dispatch = useDispatch();

  const reviewFields = () =>
    map(formFields, ({ name, label }) => {
      return (
        <div key={name}>
          <label>{label}</label>
          <div>{values[name]}</div>
        </div>
      );
    });

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields()}
      <button
        className="yellow darken-2 white-text btn-flat"
        onClick={onCancel}
      >
        Back
      </button>
      <button
        className="green white-text btn-flat right"
        onClick={() => dispatch(actions.submitSurvey(values, history))}
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

export default withRouter(SurveyFormReview);
