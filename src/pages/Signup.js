// Signup.js
import React, { useState } from 'react';
import './Signup.css'; // Import your CSS file

const Signup = () => {
  const [formData, setFormData] = useState({
    Username: '',
    Name: '',
    Address: '',
    Contact: '',
    Type: 'End', // Default value for the Type
    City: '',
    Password: '',
  });
  const [message, setMessage] = useState(''); // State to handle success/error message
  const [step, setStep] = useState(1); // State to handle the current step of the form

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setMessage(data.message);
      if (response.ok) {
        setTimeout(() => {
          window.location.href = '/login'; // Redirect to login after 1 second
        }, 1000);
      }
    } catch (error) {
      setMessage('An error occurred during signup. Please try again.');
      console.error('Error:', error);
    }
  };

  // Proceed to the next step
  const nextStep = () => setStep(step + 1);

  // Go back to the previous step
  const prevStep = () => setStep(step - 1);

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2 className="signup-header">Create Your Account</h2>

        <form onSubmit={handleSubmit} className="signup-form">
          {step === 1 && (
            <>
              <div>
                <label htmlFor="username" className="signup-label">Username</label>
                <input
                  id="username"
                  name="Username"
                  type="text"
                  placeholder="Username"
                  value={formData.Username}
                  onChange={handleChange}
                  required
                  className="signup-input"
                />
              </div>

              <div>
                <label htmlFor="name" className="signup-label">Name</label>
                <input
                  id="name"
                  name="Name"
                  type="text"
                  placeholder="Name"
                  value={formData.Name}
                  onChange={handleChange}
                  required
                  className="signup-input"
                />
              </div>

              <div>
                <label htmlFor="address" className="signup-label">Address</label>
                <input
                  id="address"
                  name="Address"
                  type="text"
                  placeholder="Address"
                  value={formData.Address}
                  onChange={handleChange}
                  required
                  className="signup-input"
                />
              </div>

              <div>
                <button type="button" className="signup-button" onClick={nextStep}>
                  Next
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label htmlFor="contact" className="signup-label">Contact</label>
                <input
                  id="contact"
                  name="Contact"
                  type="text"
                  placeholder="Contact"
                  value={formData.Contact}
                  onChange={handleChange}
                  required
                  className="signup-input"
                />
              </div>

              <div>
                <label htmlFor="type" className="signup-label">Type</label>
                <select
                  id="type"
                  name="Type"
                  value={formData.Type}
                  onChange={handleChange}
                  required
                  className="signup-select"
                >
                  <option value="End">End</option>
                  <option value="Retailer">Retailer</option>
                </select>
              </div>

              <div>
                <label htmlFor="city" className="signup-label">City</label>
                <input
                  id="city"
                  name="City"
                  type="text"
                  placeholder="City"
                  value={formData.City}
                  onChange={handleChange}
                  required
                  className="signup-input"
                />
              </div>

              <div>
                <label htmlFor="password" className="signup-label">Password</label>
                <input
                  id="password"
                  name="Password"
                  type="password"
                  placeholder="Password"
                  value={formData.Password}
                  onChange={handleChange}
                  required
                  className="signup-input"
                />
              </div>

              <div>
                <button type="button" className="signup-button" onClick={prevStep}>
                  Back
                </button>
                <button type="submit" className="signup-button">
                  Submit
                </button>
              </div>
            </>
          )}

          {message && <p className="signup-message">{message}</p>}
        </form>

        <p className="signup-footer">
          Already have an account?{' '}
          <a href="/login" className="signup-link">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
