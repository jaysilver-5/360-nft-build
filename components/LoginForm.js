// components/LoginForm.js
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useRouter } from 'next/router';

const LoginForm = () => {
  const { setUser } = useAuth();
  const [walletAddress, setWalletAddress] = useState('');
  const [loading, setLoading] = useState(false); // New loading state
  const router = useRouter();

  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const selectedAddress = accounts[0];
      setWalletAddress(selectedAddress);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length > 0) {
      setWalletAddress(accounts[0]);
    } else {
      setWalletAddress(null);
    }
  };

  const handleLogin = async () => {
    try {
      setLoading(true); // Set loading to true during the login process

      if (!walletAddress) {
        // If the user hasn't signed up, display an alert
        alert('You should sign up first.');
        return;
      }

      const response = await axios.get(`/api/auth?walletAddress=${walletAddress}`);
      if (response.data.success) {
        setUser(response.data.user);
        router.push(`/user/${response.data.user.userId}`);
      } else {
        console.error('Error logging in:', response.data.message);
        if (response.status === 404) {
          alert('Wallet address not found. Please sign up first.');
        }
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false); // Set loading back to false after the login process completes
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {!walletAddress ? (
        <button onClick={connectWallet}>Connect MetaMask Wallet</button>
      ) : (
        <div>
          <p>Connected Wallet Address: {walletAddress}</p>
        </div>
      )}
      <br />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </div>
  );
};

export default LoginForm;
