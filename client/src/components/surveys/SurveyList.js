import React, { useEffect } from 'react';
import { fetchSurveys } from '../../actions';
import { useSelector, useDispatch } from 'react-redux';

const SurveyList = () => {
  const dispatch = useDispatch();
  const surveys = useSelector(state => state.surveys);

  useEffect(() => {
    dispatch(fetchSurveys());
  }, [dispatch]);

  const renderContent = () => {
    return surveys.map(survey => (
      <div key={survey.dateSent} className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title">{survey.title}</span>
          <p>{survey.body}</p>
          <p className="right">
            Date Sent: {new Date(survey.dateSent).toLocaleDateString()}
          </p>
        </div>
        <div className="card-action">
          <p className="orange-text">Number of Yes: {survey.yes}</p>
          <p className="orange-text">Number of No: {survey.no}</p>
        </div>
      </div>
    ));
  };

  return renderContent();
};

export default SurveyList;
