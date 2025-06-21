// client/src/pages/Verify.js
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('Verifying...');

  useEffect(() => {
    const verify = async () => {
      const email = searchParams.get('email');
      const code = searchParams.get('code');
      try {
        await axios.get(`http://localhost:5000/api/subscribers/verify?email=${email}&code=${code}`);
        setStatus('Email verified successfully!');
      } catch {
        setStatus('Verification failed.');
      }
    };
    verify();
  }, [searchParams]);

  return <h2>{status}</h2>;
};

export default Verify;