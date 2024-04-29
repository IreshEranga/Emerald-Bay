import React, { useEffect, useState } from 'react';
import axios from "axios";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Modal from 'react-bootstrap/Modal';
import { Form, Button } from 'react-bootstrap';
import { IoMdDownload } from 'react-icons/io';
import { generatePDF } from '../../utils/GeneratePDF';
import Swal from 'sweetalert2';



const Feedbacklist = () => {
  const [filteredFeedback, setFilteredFeedback] = useState([]);
  console.log("🚀 ~ Feedbacklist ~ filteredFeedback:", filteredFeedback)
  const [searchQuery, setSearchQuery] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [updateFeedback, setUpdateFeedback] = useState({});
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateFeedback(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleClose = () => {
    setShow(false);
    setUpdateFeedback({});
  };

  const handleShow = (feedback) => {
    setUpdateFeedback(feedback);
    setShow(true);
  };

  const getAllFeedbacks = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/feedback/get-all");
      setFeedbacks(response.data.feedbacks);
      setFilteredFeedback(response.data.feedbacks); // Set filtered data initially
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    if (feedbacks) {
      console.log("🚀 ~ handleSearch ~ feedbacks:", feedbacks)
      const filteredData = feedbacks.filter((feedback) => {

        return (
          feedback.name.toLowerCase().includes(query) ||
          feedback.email.toLowerCase().includes(query) ||
          feedback.status.toLowerCase().includes(query) 
        );
      });
      console.log("🚀 ~ filteredData ~ filteredData:", filteredData)
      setFilteredFeedback(filteredData);
    }
  };

  useEffect(() => {
    getAllFeedbacks();
  }, []);

  // Function to prepare data for PDF report
  const preparePDFData = () => {
    const title = "feedback Report";
    const columns = [ "Name", "Email", "Message", "Customer Service", "Delivery", "Overall Experience", "Prices", "Taste", "Status"];
    
    console.log("🚀 ~ data ~ filteredFeedback:", filteredFeedback)
    const data = filteredFeedback.map(feedback => ({
      "Feedback ID": feedback.id,
      "Name": feedback.name,
      "Email": feedback.email,
      "Message": feedback.message,
      "Customer Service": feedback.customerService,
      "Delivery": feedback.delivery,
      "Overall Experience": feedback.overallExperience,
      "Prices": feedback.prices,
      "Taste": feedback.taste,
      "Status": feedback.status === "REJECTED" ? "Rejected" : feedback.status === "PENDING" ? "Pending" : "A"
    }));
    const fileName = "feedback_report";
    return { title, columns, data, fileName};
  };

  // Function to handle downloading PDF report
  const downloadPDF = () => {
    const { title, columns, data, fileName } = preparePDFData();
    generatePDF(title, columns, data, fileName, );
  };

  const handleApprov = async(feedback)=>{
  
    try {
        
        const update = {
            _id : feedback._id,
            name : feedback.name,
            email : feedback.email,
            delivery : feedback.delivery,
            taste : feedback.taste,
            customerService : feedback.customerService,
            prices : feedback.prices,
            message : feedback.message,
            overallExperience : feedback.overallExperience,
            status : "APPROVED"
        }

        const response = await axios.post(`http://localhost:8000/api/feedback/approv`,{update})


        if (response.status === 201) {
          Swal.fire({
            icon: 'success',
            title: 'Feedback Approved',
            text: 'The feedback has been successfully approved.',
          }).then(() => {
            getAllFeedbacks();
            setShow(false);
          });
        } else {
          setShow(false);
          Swal.fire({
            icon: 'error',
            title: 'Failed to Approve Feedback',
            text: 'There was an error while trying to approve the feedback.',
          });
        }
        
    } catch (error) {
        setShow(false);
        alert("Failed to Approved feedback")
    }

}
useEffect(() => {
    console.log("feed");
getAllFeedbacks();
},[]);

const handleReject = async(feedback)=>{
  
  try {
      
      const update = {
          _id : feedback._id,
          name : feedback.name,
          email : feedback.email,
          delivery : feedback.delivery,
          taste : feedback.taste,
          customerService : feedback.customerService,
          prices : feedback.prices,
          message : feedback.message,
          overallExperience : feedback.overallExperience,
          status : "REJECTED"
      }

      const response = await axios.post(`http://localhost:8000/api/feedback/reject`,{update})


      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Feedback Rejected',
          text: 'The feedback has been rejected successfully.',
        }).then(() => {
          getAllFeedbacks();
          setShow(false);
        });
      } else {
        setShow(false);
        Swal.fire({
          icon: 'error',
          title: 'Failed to Reject Feedback',
          text: 'There was an error while trying to reject the feedback.',
        });
      }
      
  } catch (error) {
      setShow(false);
      alert("Failed to Rejected feedback")
  }

}

  return (
    <div>
      {/* Download PDF report */}
      <Button variant="success" className="m-1" onClick={downloadPDF}>
        <IoMdDownload className="mb-1" /> <span>Download Report</span>
      </Button>

      {/* Search Form */}
      <Form className="mb-1">
        <Form.Group controlId="searchQuery">
          <Form.Control
            type="text"
            placeholder="Search feedbacks by name, email, or status"
            value={searchQuery}
            onChange={handleSearch}
            style={{ width: "400px", border: '1px solid gray', padding: '20px', borderRadius: '30px', position:'relative', marginLeft:'180px', zIndex:'1', height:'20px', marginRight:'0px'}}
          />
        </Form.Group>
      </Form>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Message</th>
            <th scope="col">Customer Service</th>
            <th scope="col">Delivery</th>
            <th scope="col">Overall Experience</th>
            <th scope="col">Prices</th>
            <th scope="col">Taste</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredFeedback.map((feedback) => (
            <tr key={feedback.id}>
              <td>{feedback.name}</td>
              <td>{feedback.email}</td>
              <td>{feedback.message}</td>
              <td>{feedback.customerService}</td>
              <td>{feedback.delivery}</td>
              <td>{feedback.overallExperience}</td>
              <td>{feedback.prices}</td>
              <td>{feedback.taste}</td>
              <td>
                {feedback.status === "REJECTED" ? (
                  <span style={{ color: "red" }}>Rejected</span>
                ) : feedback.status === "PENDING" ? (
                  <span style={{ color: "blue" }}>Pending</span>
                ) : (
                  <span style={{ color: "green" }}>Approved</span>
                )}
              </td>
              {feedback.status == "PENDING" ? (
                <td>
                  <button
                    style={{ marginRight: "10px" }}
                    type="button"
                    class="btn btn-success"
                    onClick={() => handleApprov(feedback)}
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => handleReject(feedback)}
                  >
                    Reject
                  </button>
                </td>
              ) : (
                ""
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for feedback details */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Feedback details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={updateFeedback.name || ''}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Add other form fields here */}

          </Form>
        </Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Feedbacklist;



/*import React, { useEffect, useState } from 'react'
import axios from "axios"
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Modal from 'react-bootstrap/Modal';
import { Form, Button } from 'react-bootstrap';
import { IoMdDownload } from 'react-icons/io';
import { generatePDF } from '../../utils/GeneratePDF';


const Feedbacklist = () => {
  
  const [filteredfeedback, setFilteredfeedback] = useState([]);
  
  const [searchQuery, setSearchQuery] = useState("");
  

  
  const[feedbacks,setFeedbacks] = useState(null)
  const[updateFeedback, setupdateFeedback] = useState({
    name: '',
    email: '',
    delivery: '',
    taste: '',
    customerService: '',
    prices: '',
    message: '',
    status: '',
    });

    const [show, setShow] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setupdateFeedback(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleClose = () =>{
        setShow(false);
        setupdateFeedback(null);
    } 
    const handleShow = (feedback) =>{
        setupdateFeedback(feedback);
        setShow(true);
    } 

    const getAllFeedbacks = async()=>{
        try {
            const response = await axios.get("http://localhost:8000/api/feedback/get-all")

            setFeedbacks(response.data.feedbacks)
            console.log(response.data.feedbacks);
        } catch (error) {
            // alert(error)
        }
    }

    const deleteFeedback = async(feedbackId)=>{

        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to delete this.',
            buttons: [
              {
                label: 'Yes',
                onClick: async() => {
                    try {
                        const response = await axios.delete(`http://localhost:8000/api/feedback/delete/${feedbackId}`)
                        console.log(response);
            
                        if(response.status === 200){
                            alert("Feedback deleted")
                            getAllFeedbacks();
                        }
                        else{
                            alert("Failed to delete feedback")
                        }
                    } catch (error) {
                        alert("Failed to delete feedback")
                    }
                }
              },
              {
                label: 'No',
                onClick: () => {

                }
              }
            ]
          });
        
    }

    const handleUpdate = async()=>{
        if(!updateFeedback.name ||
        !updateFeedback.email ||
        !updateFeedback.delivery ||
        !updateFeedback.taste ||
        !updateFeedback.customerService ||
        !updateFeedback.prices ||
        !updateFeedback.message ||
        !updateFeedback.overallExperience){
            alert("Please fill all the fields")
        }
        else{
           
            try {
                
                const update = {
                    _id : updateFeedback._id,
                    name : updateFeedback.name,
                    email : updateFeedback.email,
                    delivery : updateFeedback.delivery,
                    taste : updateFeedback.taste,
                    customerService : updateFeedback.customerService,
                    prices : updateFeedback.prices,
                    message : updateFeedback.message,
                    overallExperience : updateFeedback.overallExperience
                }

                const response = await axios.post(`http://localhost:8000/api/feedback/update`,{update})

    
                if(response.status === 201){
                    alert("Feedback updated")
                    getAllFeedbacks();
                    setShow(false);
                }
                else{
                    setShow(false);
                    alert("Failed to update feedback")
                }
            } catch (error) {
                setShow(false);
                alert("Failed to update feedback")
            }
        }
    }


    const handleReject = async(feedback)=>{
  
            try {
                
                const update = {
                    _id : feedback._id,
                    name : feedback.name,
                    email : feedback.email,
                    delivery : feedback.delivery,
                    taste : feedback.taste,
                    customerService : feedback.customerService,
                    prices : feedback.prices,
                    message : feedback.message,
                    overallExperience : feedback.overallExperience,
                    status : "R"
                }

                const response = await axios.post(`http://localhost:8000/api/feedback/reject`,{update})

    
                if(response.status === 201){
                    alert("Feedback Rejected")
                    getAllFeedbacks();
                    setShow(false);
                }
                else{
                    setShow(false);
                    alert("Failed to Rejected feedback")
                }
            } catch (error) {
                setShow(false);
                alert("Failed to Rejected feedback")
            }
        
    }


    const handleApprov = async(feedback)=>{
  
        try {
            
            const update = {
                _id : feedback._id,
                name : feedback.name,
                email : feedback.email,
                delivery : feedback.delivery,
                taste : feedback.taste,
                customerService : feedback.customerService,
                prices : feedback.prices,
                message : feedback.message,
                overallExperience : feedback.overallExperience,
                status : "A"
            }

            const response = await axios.post(`http://localhost:8000/api/feedback/approv`,{update})


            if(response.status === 201){
                alert("Feedback Approved")
                getAllFeedbacks();
                setShow(false);
            }
            else{
                setShow(false);
                alert("Failed to Approved feedback")
            }
        } catch (error) {
            setShow(false);
            alert("Failed to Approved feedback")
        }
    
}
useEffect(() => {
        console.log("feed");
    getAllFeedbacks();
    },[]);

    // Function to prepare data for PDF report
  const preparePDFData = () => {
    const title = "feedback Report";
    const columns = ["feedback. ID", "Name", "Email",  "Message", "Customer Service", "Delivery", "Overall Experience","Prices","Taste","Status"];
    const data = filteredfeedback.map(feedback => ({
      "feedback. ID": feedback.feedback.id,
      "Name": feedback.name,
      "Email": feedback.email,
      "Message": feedback.message,
      "Customer Service": feedback.customerService,
      "Delivery": feedback.delivery,
      "Overall Experience": feedback.overallExperience,
      "Prices": feedback.prices,
      "taste": feedback.taste,
      "Status": feedback.status === "R" ? "Rejected" : feedback.status === "P" ? "Pending" : "Approved"


    }));
    const fileName = "feedback_report";
    return { title, columns, data, fileName };
  };

  // Function to handle downloading PDF report
  const downloadPDF = () => {
    const { title, columns, data, fileName } = preparePDFData();
    generatePDF(title, columns, data, fileName);
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    // Check if feedbacks is not null before filtering
    if (feedbacks) {
      const filteredData = feedbacks.filter((feedbacks) => {
        return (
          feedbacks.name.toLowerCase().includes(query) ||
          feedbacks.email.toLowerCase().includes(query) ||
          feedbacks.status.toLowerCase().includes(query)
        );
      });
      setFilteredfeedback(filteredData);
    }
  };
  
  


    
  return (
<div>
   
   <Button variant="success" className="m-1" onClick={downloadPDF}>
        <IoMdDownload className="mb-1" /> <span>Download Report</span>
      </Button>

      
      <Form className="mb-1">
        <Form.Group controlId="searchQuery">
          <Form.Control
            type="text"
            placeholder="Search feedbacks by name, email,  or status"
            value={searchQuery}
            onChange={handleSearch}
            style={{ width: "400px", border: '1px solid gray', padding: '20px', borderRadius: '30px', position:'relative', marginLeft:'180px', zIndex:'1', height:'20px', marginRight:'0px'}}
          />
        </Form.Group>
      </Form>

<table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Message</th>
            <th scope="col">Customer Service</th>
            <th scope="col">Delivery</th>

            <th scope="col">Overall Experience</th>
            <th scope="col">Prices</th>
            <th scope="col">Taste</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks?.map((feedback) => (
            <tr key={feedback.id}>
              <td>{feedback.name}</td>
              <td>{feedback.email}</td>
              <th th scope="row">
                {feedback.message}
              </th>
              <td>{feedback.customerService}</td>
              <td>{feedback.delivery}</td>

              <td>{feedback.overallExperience}</td>
              <td>{feedback.prices}</td>
              <td>{feedback.taste}</td>
              {feedback.status == "R" ? (
                <td style={{ color: "red" }}>Rejected</td>
              ) : feedback.status == "P" ? (
                <td style={{ color: "blue" }}>Pending</td>
              ) : (
                <td style={{ color: "green" }}>Approved</td>
              )}

              {feedback.status == "P" ? (
                <td>
                  <button
                    style={{ marginRight: "10px" }}
                    type="button"
                    class="btn btn-success"
                    onClick={() => handleApprov(feedback)}
                  >
                    Approv
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => handleReject(feedback)}
                  >
                    Reject
                  </button>
                </td>
              ) : (
                ""
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Feedback details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={updateFeedback?.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={updateFeedback?.email}
                onChange={handleChange}
              />
            </Form.Group>

            
            <Form.Group controlId="formDelivery">
              <Form.Label>Delivery</Form.Label>
              <div>
                <Form.Check
                  inline
                  label="Excellent"
                  type="checkbox"
                  name="delivery"
                  value="excellent"
                  checked={updateFeedback?.delivery === "excellent"}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label="Good"
                  type="checkbox"
                  name="delivery"
                  value="good"
                  checked={updateFeedback?.delivery === "good"}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label="Average"
                  type="checkbox"
                  name="delivery"
                  value="average"
                  checked={updateFeedback?.delivery === "average"}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label="Poor"
                  type="checkbox"
                  name="delivery"
                  value="poor"
                  checked={updateFeedback?.delivery === "poor"}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>

            
            <Form.Group controlId="formTaste">
              <Form.Label>Taste</Form.Label>
              <div>
                <Form.Check
                  inline
                  label="Excellent"
                  type="checkbox"
                  name="taste"
                  value="excellent"
                  checked={updateFeedback?.taste === "excellent"}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label="Good"
                  type="checkbox"
                  name="taste"
                  value="good"
                  checked={updateFeedback?.taste === "good"}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label="Average"
                  type="checkbox"
                  name="taste"
                  value="average"
                  checked={updateFeedback?.taste === "average"}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label="Poor"
                  type="checkbox"
                  name="taste"
                  value="poor"
                  checked={updateFeedback?.taste === "poor"}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>

            
            <Form.Group controlId="formCustomerService">
              <Form.Label>Customer Service</Form.Label>
              <div>
                <Form.Check
                  inline
                  label="Excellent"
                  type="checkbox"
                  name="customerService"
                  value="excellent"
                  checked={updateFeedback?.customerService === "excellent"}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label="Good"
                  type="checkbox"
                  name="customerService"
                  value="good"
                  checked={updateFeedback?.customerService === "good"}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label="Average"
                  type="checkbox"
                  name="customerService"
                  value="average"
                  checked={updateFeedback?.customerService === "average"}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label="Poor"
                  type="checkbox"
                  name="customerService"
                  value="poor"
                  checked={updateFeedback?.customerService === "poor"}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>

            
            <Form.Group controlId="formPrices">
              <Form.Label>Prices</Form.Label>
              <div>
                <Form.Check
                  inline
                  label="Excellent"
                  type="checkbox"
                  name="prices"
                  value="excellent"
                  checked={updateFeedback?.prices === "excellent"}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label="Good"
                  type="checkbox"
                  name="prices"
                  value="good"
                  checked={updateFeedback?.prices === "good"}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label="Average"
                  type="checkbox"
                  name="prices"
                  value="average"
                  checked={updateFeedback?.prices === "average"}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label="Poor"
                  type="checkbox"
                  name="prices"
                  value="poor"
                  checked={updateFeedback?.prices === "poor"}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>

            <Form.Group controlId="formOverallExperience">
              <Form.Label>Overall Experience</Form.Label>
              <div>
                <Form.Check
                  inline
                  label="Excellent"
                  type="checkbox"
                  name="overallExperience"
                  value="excellent"
                  checked={updateFeedback?.overallExperience === "excellent"}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label="Good"
                  type="checkbox"
                  name="overallExperience"
                  value="good"
                  checked={updateFeedback?.overallExperience === "good"}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label="Average"
                  type="checkbox"
                  name="overallExperience"
                  value="average"
                  checked={updateFeedback?.overallExperience === "average"}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label="Poor"
                  type="checkbox"
                  name="overallExperience"
                  value="poor"
                  checked={updateFeedback?.overallExperience === "poor"}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>

            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter your message"
                name="message"
                value={updateFeedback?.message}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Feedbacklist;*/

