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
    phoneNumber: yup.string().required(),
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
        <Form noValidate onSubmit={handleSubmit} className="contact-form">
          <Form.Group as={Row} controlId="formName">
            <Form.Label column sm={3} className="form-label">Name</Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                isInvalid={touched.name && !!errors.name}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formEmail">
            <Form.Label column sm={3} className="form-label">Email</Form.Label>
            <Col sm={9}>
              <Form.Control
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                isInvalid={touched.email && !!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Col>
          </Form.Group>
          
          <Form.Group as={Row} controlId="formPhoneNumber">
            <Form.Label column sm={3} className="form-label">Phone Number</Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
                isInvalid={touched.phoneNumber && !!errors.phoneNumber}
              />
              <Form.Control.Feedback type="invalid">{errors.phoneNumber}</Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formSubject">
            <Form.Label column sm={3} className="form-label">Subject</Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                name="subject"
                value={values.subject}
                onChange={handleChange}
                isInvalid={touched.subject && !!errors.subject}
              />
              <Form.Control.Feedback type="invalid">{errors.subject}</Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formMessage">
            <Form.Label column sm={3} className="form-label">Message</Form.Label>
            <Col sm={9}>
              <Form.Control
                as="textarea"
                rows={4}
                name="message"
                value={values.message}
                onChange={handleChange}
                isInvalid={touched.message && !!errors.message}
              />
            <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Button type="submit" className="submit-button">Submit</Button>
        </Form>
      )}
    </Formik>
  );
}

export default FormExample;