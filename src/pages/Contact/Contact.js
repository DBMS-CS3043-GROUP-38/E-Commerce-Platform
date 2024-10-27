import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './ContactUs.css';

import {
  Container,
  TextField,
  Button,
  Typography,
  Snackbar,
} from '@mui/material';

export const ContactUs = () => {
  const form = useRef();
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_y5x22bg', 'template_qq3witv', form.current, 'VCA4mvrlwmPyWJ7Sy')
      .then(
        (result) => {
          console.log('SUCCESS!', result.text);
          setSuccessMsg('Email sent successfully!');
          setErrorMsg('');
          form.current.reset();
        },
        (error) => {
          console.error('FAILED...', error);
          setErrorMsg(`Failed to send email: ${error.text}`);
          setSuccessMsg('');
        }
      );
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      <form ref={form} onSubmit={sendEmail}>
        <TextField
          label="Name"
          name="user_name"
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          name="user_email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Message"
          name="message"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          margin="normal"
          required
        />
        <Button variant="contained" color="primary" type="submit">
          Send
        </Button>
      </form>
      {successMsg && <Snackbar open={true} autoHideDuration={6000} message={successMsg} onClose={() => setSuccessMsg('')} />}
      {errorMsg && <Snackbar open={true} autoHideDuration={6000} message={errorMsg} onClose={() => setErrorMsg('')} />}
    </Container>
  );
};

export default ContactUs;
