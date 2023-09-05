import { ThirdwebNftMedia } from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";
import React from "react";
import styles from "./NFT.module.css";

// Define the Props object
const NFTComponent = ({ nft }) => {
  return (
    <>
      {/* Display the NFT image */}
      <ThirdwebNftMedia metadata={nft.metadata} className={styles.nftImage} />

      {/* Display the token ID */}
      <p className={styles.nftTokenId}>Token ID #{nft.metadata.id}</p>

      {/* Display the NFT name */}
      <p className={styles.nftName}>{nft.metadata.name}</p>
    </>
  );
};

export default NFTComponent;
