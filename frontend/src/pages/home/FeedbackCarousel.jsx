import React, { useState , useEffect} from 'react';
import './FeedbackCarousel.css';


const FeedbackCarousel = ({ feedbackData }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        const newIndex = (currentIndex - 1 + feedbackData.length) % feedbackData.length;
        setCurrentIndex(newIndex);
    };

    const handleNext = () => {
        const newIndex = (currentIndex + 1) % feedbackData.length;
        setCurrentIndex(newIndex);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext(); // Move to the next feedback after the interval
        }, 10000); // Change feedback every 10 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [currentIndex]); // Re-run effect when currentIndex changes

    // Check if feedbackData is not empty and currentIndex is within bounds
    const currentFeedback = feedbackData.length > 0 ? feedbackData[currentIndex] : null;

    return (
        <div className="feedback-carousel">
            <button onClick={handlePrev}>&lt;</button>
            <div className="feedback-content">
                {currentFeedback && ( // Check if currentFeedback is not null or undefined
                    <>
                        <p style={{color:"black"}}>{currentFeedback.message}</p>
                        <p style={{color:"black"}}>- {currentFeedback.name}</p>
                    </>
                )}
            </div>
            <button onClick={handleNext}>&gt;</button>
        </div>
    );
  };
  



const App = ({ feedbackDataList }) => {
    
  return (
    <div className="App">
      <FeedbackCarousel feedbackData={feedbackDataList} />
    </div>
  );
};

export default App;
