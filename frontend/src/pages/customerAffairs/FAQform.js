import React, { useState } from 'react';
// import './faq.css';

const FAQ = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const handleQuestionChange = (e) => {
        setQuestion(e.target.value);
    };

    const handleAnswerChange = (e) => {
        setAnswer(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your logic to handle the submission of the question and answer
        // For example, you can send them to a server or update a state variable
        console.log('Question:', question);
        console.log('Answer:', answer);
    };

    return (
        <div className="container">
          <h1>FAQ</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="question">Question:</label>
            <textarea id="question" value={question} onChange={handleQuestionChange} />

            <label htmlFor="answer">Answer:</label>
            <textarea id="answer" value={answer} onChange={handleAnswerChange} />

            <button type="submit">Submit</button>
          </form>
        </div>
    );
};

export default FAQ;

