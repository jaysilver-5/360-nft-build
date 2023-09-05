import React, { useState } from 'react';
// import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import styles from './AddToken.module.css';
import altStyle from '../../sections/suggestions/Suggestions.module.css';

const AddToken = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const name = useSelector((state) => state.user.name);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button type='button' className={`btn ${styles.btnAddToken}`} onClick={openModal}>
        <div className={styles.addIconContainer}>
          <div className='icon-plus' style={{ width: '24px', height: '24px' }} />
        </div>
        <div className={styles.btnAddTokenTextContainer}>
          <p className={altStyle.trackTitle}>Add your token</p>
          <p className={altStyle.trackArtist}>{name}</p>
        </div>
        <div className='icon-arrow-right-alternate' style={{ width: '24px', height: '24px' }} />
      </button>
      {/* <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Token Modal"
        ariaHideApp={false} // To prevent an accessibility issue
      >
        <iframe
          src="https://embed.ipfscdn.io/ipfs/bafybeigtqeyfmqkfbdu7ubjlwhtqkdqckvee7waks4uwhmzdfvpfaqzdwm/erc20.html?contract=0xD9E686e531D1b84AE500e6188f49d2442FB968d1&chain=%7B%22name%22%3A%22Zora+Testnet%22%2C%22chain%22%3A%22ETH%22%2C%22rpc%22%3A%5B%22https%3A%2F%2Fzora-testnet.rpc.thirdweb.com%2F15065ae3c21e0bff07eaf80b713a6ef0%22%5D%2C%22nativeCurrency%22%3A%7B%22name%22%3A%22Ether%22%2C%22symbol%22%3A%22GETH%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22Zora%22%2C%22chainId%22%3A999%2C%22testnet%22%3Atrue%2C%22slug%22%3A%22zora-testnet%22%2C%22icon%22%3A%7B%22url%22%3A%22ipfs%3A%2F%2FQmZ6qaRwTPFEZUspwMUjaxC6KhmzcELdRQcQzS3P72Dzts%2FVector.svg%22%2C%22height%22%3A512%2C%22width%22%3A512%2C%22format%22%3A%22svg%22%7D%7D&clientId=8d1007d92d9f29ac24388d54349263fc&primaryColor=purple"
          width="600px"
          height="600px"
          style={{ maxWidth: '100%' }}
          frameBorder="0"
        ></iframe>
        <button onClick={closeModal}>Close Modal</button>
      </Modal> */}
    </>
  );
};

export default AddToken;
