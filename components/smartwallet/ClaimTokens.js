import React from "react";
// import { ThirdwebSDKProvider, useAddress, useBalance, Web3Button } from "@thirdweb-dev/react";
// import { activeChain, tokenAddress } from "../../const/constants";
import { Signer } from "ethers";
import style from "../../styles/Token.module.css";

// ThirdwebSDKProvider is a wrapper component that provides the smart wallet signer and active chain to the Thirdweb SDK.
const SmartWalletConnected = ({ signer }) => {
  return (
    <div></div>
    // <ThirdwebSDKProvider 
    //   signer={signer} 
    //   activeChain={activeChain}
    //   clientId={process.env.CLIENT_ID}
    // >
    //   <ClaimTokens />
    // </ThirdwebSDKProvider>
  );
};

// This is the main component that shows the user's token bound smart wallet.
const ClaimTokens = () => {
  const address = useAddress();
  const { data: tokenBalance, isLoading: loadingBalance } =
    useBalance(tokenAddress);

  return (
    <div className={style.walletContainer}>
      <h2>This is Your Token Bound Smart Wallet!</h2>
      {address ? (
        loadingBalance ? (
          <h2>Loading Balance...</h2>
        ) : (
          <div className={style.pricingContainer}>
            <h2>Balance: {tokenBalance?.displayValue}</h2>
            {/* <Web3Button
              contractAddress={tokenAddress}
              action={async (contract) => await contract.erc20.claim(10)}
            >
              Claim 10 Tokens
            </Web3Button> */}
          </div>
        )
      ) : null}
    </div>
  );
};

export default SmartWalletConnected;
