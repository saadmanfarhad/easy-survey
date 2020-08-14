import React, { useEffect, useRef } from 'react';
import Modali, { useModali } from 'modali';
import { fetchSurveys, deleteSurvey } from '../../actions';
import { useSelector, useDispatch } from 'react-redux';

const SurveyList = () => {
  const selectedSurvey = useRef(null);
  const dispatch = useDispatch();
  const surveys = useSelector(state => state.surveys);
  const [modal, toggleModal] = useModali({
    animated: true,
    title: 'Are you sure?',
    message: 'Deleting this user will be permanent.',
    buttons: [
      <Modali.Button
        label="Cancel"
        isStyleCancel
        onClick={() => toggleModal()}
      />,
      <Modali.Button
        label="Delete"
        isStyleDestructive
        onClick={() => {
          dispatch(deleteSurvey(selectedSurvey.current));
          toggleModal();
        }}
      />
    ]
  });

  useEffect(() => {
    dispatch(fetchSurveys());
  }, [dispatch]);

  const renderContent = () => {
    return surveys.map(survey => (
      <div key={survey.dateSent} className="card blue-grey darken-1">
        <i
          onClick={() => {
            selectedSurvey.current = survey._id;
            toggleModal();
          }}
          style={{ cursor: 'pointer', marginTop: '4px', marginRight: '4px' }}
          className="material-icons white-text right cursor"
        >
          clear
        </i>
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
        <Modali.Modal {...modal} />
      </div>
    ));
  };

  return renderContent();
};

export default SurveyList;
