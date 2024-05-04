import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FAQTable.css"; // Import the CSS file for styling
import Navbar from "../../../components/Navbar"
import Footer from "../../../components/Footer"

const FAQList = () => {
  const [FAQs, setFAQs] = useState(null);

  const getallFAQs = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/faqs/get-all");
      setFAQs(response.data.FAQs);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
  };

  useEffect(() => {
    getallFAQs();
  }, []);

  return (

    <div>
        
    <Navbar/>

    <div className="container-faq" style={{ display: 'flex', justifyContent: 'center' ,marginTop:'50px'}}>
  <div className="accordion" style={{ maxWidth: '600px', width: '100%' }}>
    {FAQs?.map((FAQ) => (
      <div className="accordion-item" key={FAQ._id} style={{ marginBottom: '20px' }}>
        <div className="accordion-header" style={{ padding: '10px 0', textAlign: 'center' }}>
          <h3>{FAQ.question}</h3>
        </div>
        <div className="accordion-content" style={{ padding: '10px', textAlign: 'center' }}>
          <p>{FAQ.answer}</p>
        </div>
      </div>
    ))}
  </div>
</div>

   <Footer/>
    </div>
  );
};

export default FAQList;
