import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '../features/store';
import { SSRProvider } from '@react-aria/ssr';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { NotificationProvider } from 'quick-react-notification';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { goerli } from 'wagmi/chains';
import { getDefaultWallets } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

import Head from 'next/head'; // Import the Head component from Next.js

function MyApp({ Component, pageProps }) {
  let persistor = persistStore(store);

  useEffect(() => {
    // Your existing useEffect code...
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NotificationProvider>
          <Head>
            {/* Include the Tailwind CSS CDN link */}
            <link
              href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
              rel="stylesheet"
            />
          </Head>
          <Component {...pageProps} />
        </NotificationProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
