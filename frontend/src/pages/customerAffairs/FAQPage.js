// import React from 'react'
// import { useState } from 'react';
// import './FAQPage.css'; // Importing CSS file for styles
// import navbar from '../../components/Navbar';
// import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';


// function FAQPage() {

//     const [selected, setSelected] = useState(null);


//     const togle = i => {
//         if(selected === i){
//             return setSelected(null)

//         }

//         setSelected(i)
//     }


//   return(
//     <div>
      
//     <Navbar/>

//     <div className="wrapper">
//       <div className="accordian"> 
      
//         {data.map((item, i) => (
//             <div className="item">
//                 <div className="title" onClick={() => togle(i)}>
//                     <h2>{item.question}</h2>  
//                     <span>{selected === i ? '_' : '+' }</span>
//                 </div>
//                 <div className={selected === i ? 'content show' : 'content' }>{item.answer}</div>
//             </div>
//         ))}
      
//       </div>
//     </div>
//     </div>
//   ) 
// }   

// const data = [
//   {
//     question: "What is your return policy?",
//     answer: "Our return"
//     },
//     {
//     question: "How do I track my order?",
//     answer: "You can track your order by visiting our website and entering your order number."
//     },
//     {
//     question: "What is your return policy?",
//     answer: "Our return policy is 30 days from the date of purchase."
//     },
//     {
//     question: "What is your return policy?",
//     answer: "Our return policy is 30 days from the date of purchase."
//     },
// ]

// export default FAQPage;

import React from 'react'
import FAQTable from '../customerAffairs/dashboard/FAQTable'

function FAQPage() {
  return (
    <div>
      <FAQTable />
    </div>
  )
}

export default FAQPage

