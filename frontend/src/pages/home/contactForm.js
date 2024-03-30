import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import Row from 'react-bootstrap/Row';
import * as yup from 'yup';
import { Formik } from 'formik';

function FormExample() {
  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phoneNumber: yup.number().required(),
    subject: yup.string().required(),
    message: yup.string().required(),
  });

  return (
    <Formik
      validationSchema={schema}
      onSubmit={console.log}
      initialValues={{
        name: '',
        email: '',
        phoneNumber: '',
        subject: '',
        message: '',
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit} >
          <Row className="mb-3">
            <Form.Group as={Col} md="2" controlId="validationFormik01">
              <Form.Label style={{ color: 'white', fontSize: '30px',marginLeft:'15px' }}>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={values.firstName}
                onChange={handleChange}
                isInvalid={!!errors.name}
                style={{   marginLeft:'15px',backgroundColor:'orange' ,color:'white', fontSize:'30px' , border:'3px solid white' }}
              />
              <Form.Control.Feedback type="invalid" style={{fontSize:'25px', backgroundColor:'white', marginLeft:'10px', borderRadius:'20px', fontWeight:'500' }}>
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="validationFormik02">
              <Form.Label style={{ color: 'white', fontSize: '30px',marginLeft:'15px' }}>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
                style={{   marginLeft:'15px',backgroundColor:'orange' ,color:'white', fontSize:'30px' , border:'3px solid white' }}
              />
              <Form.Control.Feedback type="invalid" style={{fontSize:'25px', backgroundColor:'white', marginLeft:'10px', borderRadius:'20px', fontWeight:'500' }}>
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
            <br /><br />
          <Row className="mb-3">
            <Form.Group as={Col} md="2" controlId="validationFormik03">
              <Form.Label style={{ color: 'white', fontSize: '30px',marginLeft:'15px' }}>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
                isInvalid={!!errors.phoneNumber}
                style={{   marginLeft:'15px',backgroundColor:'orange' ,color:'white', fontSize:'30px' , border:'3px solid white' }}
              />
              <Form.Control.Feedback type="invalid" style={{fontSize:'25px', backgroundColor:'white', marginLeft:'10px', borderRadius:'20px', fontWeight:'500' }}>
                {errors.phoneNumber}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationFormik04">
              <Form.Label style={{ color: 'white', fontSize: '30px' ,marginLeft:'15px'}}>Subject</Form.Label>
              <Form.Control
                type="text"
                name="subject"
                value={values.subject}
                onChange={handleChange}
                isInvalid={!!errors.subject}
                style={{   marginLeft:'15px',backgroundColor:'orange' ,color:'white', fontSize:'30px' , border:'3px solid white' }}
              />
              <Form.Control.Feedback type="invalid" style={{fontSize:'25px', backgroundColor:'white', marginLeft:'10px', borderRadius:'20px', fontWeight:'500' }}>
                {errors.subject}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

        <br /><br />
          <Row className="mb-3">
            <Form.Group as={Col} controlId="validationFormik05">
              <Form.Label style={{ color: 'white', fontSize: '30px',marginLeft:'500px' }}>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="message"
                value={values.message}
                onChange={handleChange}
                isInvalid={!!errors.message}
                style={{   marginLeft:'500px',backgroundColor:'orange' ,color:'white', fontSize:'30px' , border:'3px solid white',width:'50%' }}
              />
              <Form.Control.Feedback type="invalid" style={{fontSize:'25px', backgroundColor:'white', marginLeft:'700px', borderRadius:'20px', fontWeight:'500', width:'400px' }}>
                {errors.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Button type="submit" style={{fontSize:'30px', marginLeft:'500px', width:'250px'}}>Submit</Button>
        </Form>
      )}
    </Formik>
  );
}

export default FormExample;
