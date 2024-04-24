import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const url = process.env.REACT_APP_SENTIMENTAL_ANALYSIS_BACKEND_URL;


function SentimentAnalysis() {
  const [inputText, setInputText] = useState('');
  const [polarity, setPolarity] = useState(0);
  const [subjectivity, setSubjectivity] = useState(0);
  const [interpretation, setInterpretation] = useState('');
  const [explanation, setExplanation] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleAnalysis = async () => {
    try {
      const formData = new URLSearchParams();
      formData.append('text', inputText);

      const response = await fetch(url + "analyze-sentiment", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData
      });

      const data = await response.json();
      const [polarityValue, subjectivityValue] = data.sentiment_value;
      setPolarity(polarityValue);
      setSubjectivity(subjectivityValue);
      interpretPolarity(polarityValue);
      interpretSubjectivity(subjectivityValue);
    } catch (error) {
      console.error('Error', error);
    }
  };

  const interpretPolarity = (value) => {
    if (value === 0) {
      setInterpretation('Neutral');
    } else if (value > 0 && value <= 0.3) {
      setInterpretation('Slightly Positive');
    } else if (value > 0.3 && value <= 0.7) {
      setInterpretation('Positive');
    } else if (value > 0.7 && value <= 1) {
      setInterpretation('Very Positive');
    } else if (value < 0 && value >= -0.3) {
      setInterpretation('Slightly Negative');
    } else if (value < -0.3 && value >= -0.7) {
      setInterpretation('Negative');
    } else if (value < -0.7 && value >= -1) {
      setInterpretation('Very Negative');
    }
  };

  const interpretSubjectivity = (value) => {
    if (value === 0) {
      setExplanation('The sentiment is very objective.');
    } else if (value > 0 && value < 0.5) {
      setExplanation('The sentiment is somewhat subjective.');
    } else if (value >= 0.5) {
      setExplanation('The sentiment is very subjective.');
    }
  };

  return (
    <div className="container">
      <h2 className="mt-3">Sentiment Analysis</h2>
      <textarea
        className="form-control mb-3"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter text for sentiment analysis..."
        rows={5}
      />
      <button
        className="btn btn-primary mb-3"
        onClick={handleAnalysis}
      >
        Analyze
      </button>
      <div className="mb-3">
        <h4>Polarity</h4>
        <div className="progress">
          <div
            className={`progress-bar ${polarity >= 0 ? 'bg-success' : 'bg-danger'}`}
            role="progressbar"
            style={{ width: `${Math.abs(polarity) * 50 + 50}%` }}
            aria-valuenow={Math.abs(polarity) * 50 + 50}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {`${polarity}`}
          </div>
        </div>
        <p>{interpretation}</p>
      </div>
      <div className="mb-3">
        <h4>Subjectivity</h4>
        <div className="progress">
          <div
            className="progress-bar bg-info"
            role="progressbar"
            style={{ width: `${subjectivity * 100}%` }}
            aria-valuenow={subjectivity * 100}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {`${subjectivity}`}
          </div>
        </div>
        <p>{explanation}</p>
      </div>
    </div>
  );
}

export default SentimentAnalysis;
