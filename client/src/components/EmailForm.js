// client/src/components/EmailForm.js
import React, { useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/subscribers`, { email });
      setMessage('Verification email sent! Check your inbox.');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong.');
    }
    setEmail('');
  };

  return (
    <form method="POST" onSubmit={handleSubscribe}>
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" id="submit-email">Subscribe</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default EmailForm;
