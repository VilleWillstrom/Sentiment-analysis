import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function SentimentAnalysis() {
  const [inputText, setInputText] = useState('');
  const [sentimentResult, setSentimentResult] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleAnalysis = () => {
    // Simulate sentiment analysis process (placeholder)
    // ToDo - after developing the backend implement it and use here
    const mockSentiment = Math.random() > 0.5 ? 'Positive' : 'Negative';
    setSentimentResult(mockSentiment);
  };

  return (
    <div className="container"> {/* Add Bootstrap container class */}
      <h2 className="mt-3">Sentiment Analysis</h2> {/* Add Bootstrap margin class */}
      <textarea
        className="form-control mb-3"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter text for sentiment analysis..."
        rows={5}
      /> {/* Add Bootstrap form-control class */}
      <button
        className="btn btn-primary mb-3" 
        onClick={handleAnalysis}
      > {/* Add Bootstrap button classes */}
        Analyze
      </button>
      {sentimentResult && (
        <p className="mb-3">
          Sentiment: <strong>{sentimentResult}</strong> {/* Placeholder result */}
        </p>
      )}
    </div>
  );
}

export default SentimentAnalysis;
