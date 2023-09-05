import Link from "next/link";
import React from "react";
import { nftDropAddress } from "../../const/constants";
import NFT from "./NFT";
import styles from "../../styles/Main.module.css";

const NFTGrid = ({ nfts, emptyText = "No owned NFTs." }) => {
  return (
    <div className={styles.nftGridContainer}>
      {nfts && nfts.length > 0 ? (
        nfts.map((nft) => (
          <Link
            href={`/token/${nftDropAddress}/${nft.metadata.id}`}
            key={nft.metadata.id}
            className={styles.nftContainer}
          >
            <NFT nft={nft} />
          </Link>
        ))
      ) : (
        <p>{emptyText}</p>
      )}
    </div>
  );
};

export default NFTGrid;
