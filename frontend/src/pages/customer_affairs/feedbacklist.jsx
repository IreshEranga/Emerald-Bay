import React, { useEffect, useState } from 'react'
import { table} from 'react-bootstrap';
import axios from "axios"
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Modal from 'react-bootstrap/Modal';
import { Form, Button } from 'react-bootstrap';

const Feedbacklist = () => {

    const[feedbacks,setFeedbacks] = useState(null)

    const[updateFeedback, setupdateFeedback] = useState({
        name: '',
        email: '',
        delivery: '',
        taste: '',
        customerService: '',
        prices: '',
        message: ''
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

    useEffect(() => {
        console.log("feed");
    getAllFeedbacks();
    },[]);

  return (
    <div>

      <table class="table">
  <thead>
    <tr>
      <th scope="col">Customer Service</th>
      <th scope="col">Delivery</th>
      <th scope="col">Email</th>
      <th scope="col">Message</th>
      <th scope="col">Name</th>
      <th scope='col'>Overall Experience</th>
      <th scope='col'>Prices</th>
      <th scope='col'>Taste</th>
      <th scope='col'>Actions</th>
    </tr>
  </thead>
  <tbody>
  {feedbacks?.map((feedback) => (
    <tr key={feedback._id}>
    <th scope="row">{feedback.customerService}</th>
    <td>{feedback.delivery}</td>
    <td>{feedback.email}</td>
    <td>{feedback.message}</td>
    <td>{feedback.name}</td>
    <td>{feedback.overallExperience}</td>
    <td>{feedback.prices}</td>
    <td>{feedback.taste}</td>
    <td>
    <button style={{marginRight:'10px'}} type="button" class="btn btn-primary" onClick={()=>handleShow(feedback)}>Edit</button>
    <button  type="button" class="btn btn-danger" onClick={()=>deleteFeedback(feedback._id)}>Delete</button>
    </td>
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

                {/* Convert Delivery to Checkbox */}
                <Form.Group controlId="formDelivery">
                    <Form.Label>Delivery</Form.Label>
                    <div>
                        <Form.Check
                            inline
                            label="Excellent"
                            type="checkbox"
                            name="delivery"
                            value="excellent"
                            checked={updateFeedback?.delivery === 'excellent'}
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            label="Good"
                            type="checkbox"
                            name="delivery"
                            value="good"
                            checked={updateFeedback?.delivery === 'good'}
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            label="Average"
                            type="checkbox"
                            name="delivery"
                            value="average"
                            checked={updateFeedback?.delivery === 'average'}
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            label="Poor"
                            type="checkbox"
                            name="delivery"
                            value="poor"
                            checked={updateFeedback?.delivery === 'poor'}
                            onChange={handleChange}
                        />
                    </div>
                </Form.Group>

                {/* Convert Taste to Checkbox */}
                <Form.Group controlId="formTaste">
                    <Form.Label>Taste</Form.Label>
                    <div>
                        <Form.Check
                            inline
                            label="Excellent"
                            type="checkbox"
                            name="taste"
                            value="excellent"
                            checked={updateFeedback?.taste === 'excellent'}
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            label="Good"
                            type="checkbox"
                            name="taste"
                            value="good"
                            checked={updateFeedback?.taste === 'good'}
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            label="Average"
                            type="checkbox"
                            name="taste"
                            value="average"
                            checked={updateFeedback?.taste === 'average'}
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            label="Poor"
                            type="checkbox"
                            name="taste"
                            value="poor"
                            checked={updateFeedback?.taste === 'poor'}
                            onChange={handleChange}
                        />
                    </div>
                </Form.Group>

                {/* Convert Customer Service to Checkbox */}
                <Form.Group controlId="formCustomerService">
                    <Form.Label>Customer Service</Form.Label>
                    <div>
                        <Form.Check
                            inline
                            label="Excellent"
                            type="checkbox"
                            name="customerService"
                            value="excellent"
                            checked={updateFeedback?.customerService === 'excellent'}
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            label="Good"
                            type="checkbox"
                            name="customerService"
                            value="good"
                            checked={updateFeedback?.customerService === 'good'}
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            label="Average"
                            type="checkbox"
                            name="customerService"
                            value="average"
                            checked={updateFeedback?.customerService === 'average'}
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            label="Poor"
                            type="checkbox"
                            name="customerService"
                            value="poor"
                            checked={updateFeedback?.customerService === 'poor'}
                            onChange={handleChange}
                        />
                    </div>
                </Form.Group>

                {/* Convert Prices to Checkbox */}
                <Form.Group controlId="formPrices">
                    <Form.Label>Prices</Form.Label>
                    <div>
                        <Form.Check
                            inline
                            label="Excellent"
                            type="checkbox"
                            name="prices"
                            value="excellent"
                            checked={updateFeedback?.prices === 'excellent'}
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            label="Good"
                            type="checkbox"
                            name="prices"
                            value="good"
                            checked={updateFeedback?.prices === 'good'}
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            label="Average"
                            type="checkbox"
                            name="prices"
                            value="average"
                            checked={updateFeedback?.prices === 'average'}
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            label="Poor"
                            type="checkbox"
                            name="prices"
                            value="poor"
                            checked={updateFeedback?.prices === 'poor'}
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
                            checked={updateFeedback?.overallExperience === 'excellent'}
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            label="Good"
                            type="checkbox"
                            name="overallExperience"
                            value="good"
                            checked={updateFeedback?.overallExperience === 'good'}
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            label="Average"
                            type="checkbox"
                            name="overallExperience"
                            value="average"
                            checked={updateFeedback?.overallExperience === 'average'}
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            label="Poor"
                            type="checkbox"
                            name="overallExperience"
                            value="poor"
                            checked={updateFeedback?.overallExperience === 'poor'}
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
  )
}

export default Feedbacklist
