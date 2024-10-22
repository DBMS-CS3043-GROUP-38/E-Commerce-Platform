import React, { useState } from 'react';

const Login = () => {
    const [credentials, setCredentials] = useState({ 'Username': '', 'Password': '' });
    const [message, setMessage] = useState(''); // State to handle success/error message

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/auth/login', { // Adjusted route
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });
            const data = await response.json();
            if (data.token) {
                localStorage.setItem('token', data.token); // Store JWT token
                setMessage('Login successful! Redirecting to home...'); // Show success message
                setTimeout(() => {
                    window.location.href = '/home'; // Redirect to home page after 1 second
                }, 1000);
            } else {
                setMessage(data.message); // Show error message
            }
        } catch (error) {
            setMessage('An error occurred during login. Please try again.');
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="Username"
                placeholder="Username"
                value={credentials.Username}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="Password"
                placeholder="Password"
                value={credentials.Password}
                onChange={handleChange}
                required
            />
            <button type="submit">Login</button>
            {message && <p>{message}</p>} {/* Display success/error message */}
        </form>
    );
};

export default Login;
