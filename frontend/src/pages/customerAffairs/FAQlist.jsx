import React, { useEffect, useState } from "react";
import { table } from "react-bootstrap";
import axios from "axios";
// import { confirmAlert } from "react-confirm-alert"; // Import
// import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
// import { set } from "mongoose";
import Swal from "sweetalert2";



const FAQlist = () => {
  const [FAQs, setFAQs] = useState(null);
  const [updateFAQ, setUpdateFAQ] = useState({
    question: "",
    answer: "",
  });

  const [addFAQ, setAddFAQ] = useState({
    question: "",
    answer: "",
  });

  const [show, setShow] = useState(false);
  const [showAdd, setAddShow] = useState(false);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setUpdateFAQ((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlechangeAdd = (e) => {
    const { name, value } = e.target;
    setAddFAQ((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setShow(false);
    setUpdateFAQ({
      question: "",
      answer: "",
    });
  };

  const handleShow = (FAQ) => {
    setUpdateFAQ(FAQ);
    setShow(true);
  };

  const handleAddClose = () => {
    setAddShow(false);
  };

  const handleAddShow = () => {
    setAddShow(true);
  };

  const getallFAQs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/faqs/get-all"
      );
      setFAQs(response.data.FAQs);
      console.log(response.data.FAQs);
    } catch (error) {
      //alert(error)
    }
  };




const deleteFAQ = async (faqId) => {
  await Swal.fire({
    title: "Confirm to delete",
    text: "Are you sure to do this?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:8000/api/faqs/delete/${faqId}`
        );

        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "FAQ deleted successfully",
          });
          getallFAQs();
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "FAQ not deleted",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "FAQ not deleted",
        });
      }
    }
  });
};

  


const handleupdate = async () => {
  if (!updateFAQ.question || !updateFAQ.answer || updateFAQ.question === "" || updateFAQ.answer === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please fill all the fields",
    });
  } else {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/faqs/update/${updateFAQ._id}`,
        {
          _id: updateFAQ._id,
          question: updateFAQ.question,
          answer: updateFAQ.answer,
        }
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "FAQ updated successfully",
        });
        getallFAQs();
        setShow(false);
      } else {
        setShow(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "FAQ not updated",
        });
      }
    } catch (error) {
      setShow(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "FAQ not updated",
      });
    }
  }
};




const handleAddFAQ = async () => {
  if (!addFAQ.question || !addFAQ.answer || addFAQ.question === "" || addFAQ.answer === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please fill all the fields",
    });
  } else {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/faqs/add`,
        {
          question: addFAQ.question,
          answer: addFAQ.answer,
        }
      );
      
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "FAQ added successfully",
        });
        getallFAQs();
        setAddFAQ({
          question: "",
          answer: "",
        });
        setAddShow(false);
      } else {
        setAddShow(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "FAQ not added",
        });
      }
    } catch (error) {
      setAddShow(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "FAQ not Added",
      });
    }
  }
};


  useEffect(() => {
    getallFAQs();
  }, []);

  return (
    <div>
      <button
        style={{ marginRight: "10px" }}
        type="button"
        class="btn btn-primary"
        onClick={() => handleAddShow()}
      >
        Add FAQ
      </button>

      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Question</th>
              <th>Answer</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {FAQs?.map((FAQ) => (
              <tr key={FAQ._id}>
                <td>{FAQ.question}</td>
                <td>{FAQ.answer}</td>
                <td>
                  <button
                    style={{ marginRight: "10px" }}
                    type="button"
                    class="btn btn-primary"
                    onClick={() => handleShow(FAQ)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => deleteFAQ(FAQ._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

         {/* edit faq model */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit FAQ</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formQuestion">
                <Form.Label>question</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter Question"
                  name="question"
                  value={updateFAQ.question}
                  onChange={handlechange}
                />
              </Form.Group>

              <Form.Group controlId="formanswer">
                <Form.Label>answer</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Answer"
                  name="answer"
                  value={updateFAQ.answer}
                  onChange={handlechange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleupdate}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

 {/* Add FAQ Modal  */}
        <Modal show={showAdd} onHide={handleAddClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add FAQ</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formQuestion">
                <Form.Label>question</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter Question"
                  name="question"
                  value={addFAQ.question}
                  onChange={handlechangeAdd}
                />
              </Form.Group>

              <Form.Group controlId="formanswer">
                <Form.Label>answer</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Answer"
                  name="answer"
                  value={addFAQ.answer}
                  onChange={handlechangeAdd}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleAddClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddFAQ}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
    </div>
  );
};

export default FAQlist;

// import React, { useEffect, useState } from 'react';
// import { table } from 'react-bootstrap';
// import axios from "axios";
// import { confirmAlert } from 'react-confirm-alert'; // Import
// import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
// import Modal from 'react-bootstrap/Modal';
// import { Form, Button } from 'react-bootstrap';
// import FAQform from './FAQform';

// const FAQlist = () => {
//     const [FAQs, setFAQs] = useState(null);
//     const [updateFAQ, setUpdateFAQ] = useState({
//         _id: '',
//         question: '',
//         answer: ''
//     });

//     const [show, setShow] = useState(false);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setUpdateFAQ(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//         const handleClose = () => {
//         setShow(false);
//         setUpdateFAQ(null);
//     }

//     const handleShow = (FAQ) => {
//         setUpdateFAQ(FAQ);
//         setShow(true);
//     }

//     const getallFAQs = async () => {
//         try {
//             const response = await axios.get('http://localhost:8000/api/faqs/get-all');
//             setFAQs(response.data.FAQs);
//             console.log(response.data.FAQs);
//         } catch (error) {
//             //alert(error)
//         }
//     }

//     const deleteFAQ = async (faqId) => {
//         confirmAlert({
//             title: 'Confirm to delete',
//             message: 'Are you sure to do this?',
//             buttons: [
//                 {
//                     label: 'Yes',
//                     onClick: async () => {
//                         try {
//                             const response = await axios.delete(`http://localhost:8000/api/faqs/delete/${faqId}`)
//                             console.log(response);

//                             if(response.status === 200){
//                                 alert("faq deleted successfully")
//                                 getFAQs();
//                             }
//                             else{
//                                 alert("faq not deleted")
//                             }

//                         } catch (error) {
//                             alert("faq not deleted")
//                         }
//                     }
//                 },
//                 {
//                     label: 'No',
//                     onClick: () => {

//                     }
//                 }
//             ]
//         });
//     }

//     const handleupdate = async () => {
//         if(!updateFAQ.question ||
//             !updateFAQ.answer){
//             alert("Please fill all the fields")
//         }
//         else{
//             try{
//                 const update = {
//                     _id : updateFAQ._id,
//                     question: updateFAQ.question,
//                     answer: updateFAQ.answer
//                 }
//                 const response = await axios.put(`http://localhost:8000/api/faqs/update/`,{update});

//                 if(response.status === 201){
//                     alert("FAQ updated successfully")
//                     getallFAQs();
//                     setShow(false);
//                 }
//                 else{
//                     setShow(false);
//                     alert("FAQ not updated")
//                 }
//             }catch(error){
//                 setShow(false);
//                 alert("FAQ not updated")
//             }
//         }
//     }

//     useEffect(() => {
//         getallFAQs();
//     }, []);

//     return (

//         <div>
//             <button style={{marginRight:'10px'}} type="button" class="btn btn-primary" onClick={() => handleShow(FAQform)}>Add FAQ</button>

//         <div>
//             <table className="table">
//                 <thead>
//                     <tr>
//                         <th>Question</th>
//                         <th>Answer</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {FAQs?.map((FAQ) => (
//                         <tr key={FAQ._id}>
//                             <td>{FAQ.question}</td>
//                             <td>{FAQ.answer}</td>
//                             <td>
//                                 <button style={{marginRight:'10px'}} type="button" class="btn btn-primary" onClick={() => handleShow(FAQ)}>Edit</button>
//                                 <button type="button" class="btn btn-danger" onClick={() => deleteFAQ(FAQ._id)}>Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             <Modal show={show} onHide={handleClose}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Edit FAQ</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form>
//                         <Form.Group controlId="formQuestion">
//                             <Form.Label>question</Form.Label>
//                             <Form.Control  as="textarea" rows={3} placeholder="Enter Question" name="question" value={updateFAQ.question} onChange={handleChange}/>
//                         </Form.Group>

//                         <Form.Group controlId="formanswer">
//                             <Form.Label>answer</Form.Label>
//                             <Form.Control  as="textarea" rows={3} placeholder="Answer" name="answer" value={updateFAQ.answer} onChange={handleChange}/>
//                         </Form.Group>
//                     </Form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>
//                         Close
//                     </Button>
//                     <Button variant="primary" onClick={handleupdate}>
//                         Save Changes
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//         </div>
//     )
// }

// export default FAQlist;
