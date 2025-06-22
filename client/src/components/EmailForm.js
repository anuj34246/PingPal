// client/src/components/EmailForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './EmailForm.css';

const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/subscribers', { email });
      setMessage('✅ Verification email sent! Check your inbox.');
      setEmail('');
    } catch (err) {
      setMessage('❌ Subscription failed. Try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="email-form">
      <input
        type="email"
        name="email"
        required
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="email-input"
      />
      <button type="submit" id="submit-email" className="subscribe-btn">
        Subscribe
      </button>
      {message && <p className="email-message">{message}</p>}
    </form>
  );
};

export default EmailForm;

