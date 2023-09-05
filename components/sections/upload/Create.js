
import { useState } from "react";
import { useRouter } from "next/router";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { NATIVE_TOKEN_ADDRESS } from "config";
import { useMarketplace } from "hooks/useMarketplace";
import { useNFT } from "hooks/useNFT";
import { useContract } from "hooks/useContract";
import { useToast } from "hooks/useToast";
import { useModal } from "hooks/useModal";
import { useAuth } from "hooks/useAuth";
import { useUser } from "hooks/useUser";

export default function createDirectListing(contractAddress, tokenId, price) {
    try {
      const transaction = marketplace?.direct.createListing({
        assetContractAddress: contractAddress, // Contract Address of the NFT
        buyoutPricePerToken: price, // Maximum price, the auction will end immediately if a user pays this price.
        currencyContractAddress: NATIVE_TOKEN_ADDRESS, // NATIVE_TOKEN_ADDRESS is the crpyto curency that is native to the network. i.e. Goerli ETH.
        listingDurationInSeconds: 60 * 60 * 24 * 7, // When the auction will be closed and no longer accept bids (1 Week)
        quantity: 1, // How many of the NFTs are being listed (useful for ERC 1155 tokens)
        startTimestamp: new Date(0), // When the listing will start
        tokenId: tokenId, // Token ID of the NFT.
      });
  
      return transaction;
    } catch (error) {
      console.error(error);
    }
  }
