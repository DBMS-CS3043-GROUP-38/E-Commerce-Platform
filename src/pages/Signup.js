import React, { useState } from 'react';

const Signup = () => {
    const [formData, setFormData] = useState({
        Username: '',
        Name: '',
        Address: '',
        Contact: '',
        Type: '',
        City: '',
        Password: '',
    });
    const [message, setMessage] = useState(''); // State to handle success/error message

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/auth/signup', { // Adjusted route
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

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="Username"
                placeholder="Username"
                value={formData.Username}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="Name"
                placeholder="Name"
                value={formData.Name}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="Address"
                placeholder="Address"
                value={formData.Address}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="Contact"
                placeholder="Contact"
                value={formData.Contact}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="Type"
                placeholder="Type"
                value={formData.Type}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="City"
                placeholder="City"
                value={formData.City}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="Password"
                placeholder="Password"
                value={formData.Password}
                onChange={handleChange}
                required
            />
            <button type="submit">Signup</button>
            {message && <p>{message}</p>} {/* Display success/error message */}
        </form>
    );
};

export default Signup;
