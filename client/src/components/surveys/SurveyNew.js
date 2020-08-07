import React, { useState } from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

const SurveyNew = () => {
  const [showFormReview, setShowFormReview] = useState(false);

  const toggleShowFormReview = value => {};

  return <div>{showFormReview ?  <SurveyFormReview /> : <SurveyForm onSurveySubmit={() => setShowFormReview(true)} />}</div>;
};

export default SurveyNew;
