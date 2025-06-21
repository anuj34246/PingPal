// client/src/pages/Unsubscribe.js
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const Unsubscribe = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('Unsubscribing...');

  useEffect(() => {
    const unsubscribe = async () => {
      const email = searchParams.get('email');
      try {
        await axios.get(`http://localhost:5000/api/subscribers/unsubscribe?email=${email}`);
        setStatus('Unsubscribed successfully.');
      } catch {
        setStatus('Unsubscribe failed.');
      }
    };
    unsubscribe();
  }, [searchParams]);

  return <h2>{status}</h2>;
};

export default Unsubscribe;
