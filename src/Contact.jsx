import React, { useState, useEffect } from 'react';

const ContactForm = () => {
  const initialFormData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  const [formData, updateFormData] = useState(initialFormData);

  useEffect(() => {
    const isSuccess = localStorage.getItem('success');
    if (!isSuccess) {
      window.location.assign('/');
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    updateFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const submitForm = (event) => {
    event.preventDefault();
    console.log(formData);
    updateFormData(initialFormData);
  };

  return (
    <div className="contact-form-wrapper">
      <h2>Contact Us</h2>
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactForm;

