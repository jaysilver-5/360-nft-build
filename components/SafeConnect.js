import { useState } from 'react';
import { ethers } from 'ethers';
import { useRouter } from 'next/router'; // Import useRouter
import { Safe, SafeFactory } from '@gnosis.pm/safe-core-sdk';
import Loader from '../components/basic/loader/Loader';

const SafeConnect = () => {
  const [connected, setConnected] = useState(false);
  const [safeAddress, setSafeAddress] = useState('');
  const [userName, setUserName] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const router = useRouter(); // Initialize useRouter

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const selectedAccount = accounts[0];

        const name = prompt('Please enter your name:');
        if (name) {
          setUserName(name);
          setWalletAddress(selectedAccount);
          setConnected(true);
          router.push('/feed'); // Redirect to localhost:3000/feed
        }
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      console.error('No Ethereum wallet detected');
    }
  };

  const createSafe = async () => {
    const provider = new ethers.providers.JsonRpcProvider(process.env.YOUR_ETHEREUM_NODE_URL);
    const signer = provider.getSigner();

    const safeFactory = new SafeFactory(signer);
    const safe = await safeFactory.deployMastercopy();

    setSafeAddress(safe.address);
  };

  return (
    <div>
      {connected ? (
        <div>
          <Loader />
          <p>Connected to Wallet</p>
          <p>Name: {userName}</p>
          <p>Wallet Address: {walletAddress}</p>
          <button
          onClick={createSafe}
          style={{
            borderRadius: '10px',
            backgroundColor: '#4285F4',
            padding: '0.75rem',
          }}
>
  <div style={{ display: 'flex', gap: '0.5rem' }}>
    <img src='/images/accounts/metamask.svg' width={20} />
    <p style={{ color: 'white' }}>Log in with Metamask</p>
  </div>
</button>

          {safeAddress && <p>Safe Address: {safeAddress}</p>}
        </div>
      ) : (
        <button onClick={connectWallet}style={{
          borderRadius: '10px',
          backgroundColor: '#4285F4',
          padding: '0.75rem',
        }}
        >
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <img src='/images/accounts/metamask.svg' width={20} />
          <p style={{ color: 'white' }}>Connect Wallet</p>
        </div>
      </button>

      )}
    </div>
  );
};

export default SafeConnect;
