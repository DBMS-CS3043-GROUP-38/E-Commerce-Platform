import React, { useState } from 'react';

const Login = () => {
    const [credentials, setCredentials] = useState({ Username: '', Password: '' });
    const [message, setMessage] = useState(''); // State to handle success/error message
    const [loading, setLoading] = useState(false); // State for loading indicator

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        setMessage(''); // Clear previous messages

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();
            if (response.ok && data.token) { // Check if response is OK
                localStorage.setItem('token', data.token); // Store JWT token
                setMessage('Login successful! Redirecting to home...'); // Show success message
                setTimeout(() => {
                    window.location.href = '/home'; // Redirect to home page after 1 second
                }, 1000);
            } else {
                setMessage(data.message || 'Login failed.'); // Show error message
            }
        } catch (error) {
            setMessage('An error occurred during login. Please try again.');
            console.error('Error:', error);
        } finally {
            setLoading(false); // Stop loading
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
            <button type="submit" disabled={loading}> {/* Disable button when loading */}
                {loading ? 'Logging in...' : 'Login'}
            </button>
            {message && <p>{message}</p>} {/* Display success/error message */}
        </form>
    );
};

export default Login;
