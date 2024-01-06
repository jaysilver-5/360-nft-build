// components/SignupForm.js
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useRouter } from 'next/router';

const SignupForm = () => {
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({
    userId: Math.random().toString(36).substr(2, 9),
    username: '',
    profilePicture: null,
    walletAddress: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    if (e.target.name === 'profilePicture') {
      setFormData({ ...formData, profilePicture: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleConnectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const metaMaskWalletAddress = accounts[0];
        setFormData({ ...formData, walletAddress: metaMaskWalletAddress || '' });
        console.log('Wallet Address:', metaMaskWalletAddress);
      } else {
        console.error('MetaMask not installed.');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error.message);
    }
  };

  const handleSignup = async () => {
    const { userId, username, profilePicture, walletAddress } = formData;
    const profilePictureString = profilePicture
      ? await convertFileToBase64(profilePicture)
      : '';

    try {
      setLoading(true);

      const response = await axios.post('/api/auth', {
        userId,
        username,
        profilePicture: profilePictureString,
        walletAddress,
      });

      if (response.data.success) {
        setUser(formData);
        router.push(`/user/${userId}`);
      } else {
        console.error('Error creating user:', response.data.message);
        if (response.status === 409) {
          window.alert('Wallet address already registered. Please login.');
        }
      }
    } catch (error) {
      console.error('Error creating user:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const convertFileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = (error) => reject(error);
    });

  useEffect(() => {
    // Cleanup function to reset the loading state when the component unmounts
    return () => setLoading(false);
  }, []);

  return (
    <div>
      <h2>Signup</h2>
      <label>
        Username:
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
      </label>
      <br />
      <label>
        Profile Picture:
        <input
          type="file"
          name="profilePicture"
          accept="image/*"
          onChange={handleChange}
        />
      </label>
      <br />
      <button onClick={handleConnectWallet}>Connect Wallet</button>
      <br />
      <button onClick={handleSignup} disabled={loading}>
        {loading ? 'Signing up...' : 'Signup'}
      </button>
    </div>
  );
};

export default SignupForm;
