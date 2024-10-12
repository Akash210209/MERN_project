import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', formData);
            alert(response.data.msg); // Accessing the msg from response data
        } catch (error) {
            alert(error.response.data.msg || 'An error occurred'); // Handle error response
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default Signup;
