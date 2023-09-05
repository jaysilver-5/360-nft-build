import Button from '../../basic/button/Button'
import styles from './FeedCard.module.css'
import fonts from '../../../styles/Fonts.module.css'
import Link from 'next/dist/client/link'
import { setStreamUrl } from '../../../features/redux/player-slice'
import { useDispatch, useSelector} from 'react-redux'
import {useState, useRef} from 'react'
import { useMediaQuery } from 'react-responsive'
import { useNotification } from 'quick-react-notification'
import { Web3AuthOptions } from '@web3auth/modal'
import { OpenloginAdapter } from '@web3auth/openlogin-adapter'
import { Web3AuthModalPack, Web3AuthConfig, CHAIN_NAMESPACES } from '@safe-global/auth-kit';
import { WALLET_ADAPTERS } from '@safe-global/auth-kit';
// import { PayPalButton } from 'react-paypal-button-v2';
// import { auction } from '@thirdweb-dev/marketplace'; // Import the appropriate module from Thirdweb
// import { NewAuctionListing } from '@thirdweb-dev/marketplace/types'; // Import the NewAuctionListing type from Thirdweb
//   import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import { marketPlaceABI } from '../../../public/contract/abi'
import { useRouter } from "next/router";
// import { StripePack } from 'stripe-pack'; // Adjust the package name accordingly

const clientId = '';
const currency = 'USD';

const FeedCard = ({ feed }) => {

    const { showNotification } = useNotification();
    const [showAll, setShowAll] = useState(false)
    const dispatch = useDispatch()
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    const [buying, setBuying] = useState(false)
    // const uiLoadedHandler = () => {
    //     console.log('UI loaded')
    //   }
      
    //   const sessionUpdatedHandler = (e) => {
    //     console.log('Session Updated', e.payload)
    //   }
      
    // //   stripePack.subscribe('onramp_ui_loaded', uiLoadedHandler)
    //   stripePack.subscribe('onramp_session_updated', sessionUpdatedHandler)
      

    //   stripePack.unsubscribe('onramp_ui_loaded', uiLoadedHandler)
    //   stripePack.unsubscribe('onramp_session_updated', sessionUpdatedHandler)
    const buyItem = async function createDirectListing(
        contractAddress,
        tokenId,
        price
    ) {
        try {
            const transaction = await marketplace.direct.createListing({
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
    };

     

    return (      
         isPortrait ?
            <div style={{color: 'white'}} className={`${styles.cardContainer} ${fonts.mont}`}>
                <div className={styles.metaContainer}>
                    {
                        feed && (feed.fileType.startsWith('audio') ? 
                        (
                            <img className={`${styles.playlistArt}`} src={feed.albumArt?._url} onClick={() => dispatch(setStreamUrl(feed.image))}/>
                        )
                        : 
                        (feed.fileType.startsWith('video') ? 
                            <video className={styles.playlistArt} muted autoPlay={1} loop={1} src={feed.image}></video>
                            :
                            <img className={styles.playlistArt} src={feed.image}/>
                        )
                    ) 
                    }
                    <div className={styles.metaText}>
                        <div className={styles.topRowContainer}>
                            <p className={`${feed.feedType == 'Token' ? styles.badgeToken : styles.badgePlaylist} ${styles.badge}`}>{feed.feedType}</p>
                            <Button type='secondary' iconOpacity={1} iconClass='icon-kebab-horizontal' onClick={() => router.push(feed.metapath)}/>
                        </div>
                        <h3 className={styles.playlistTitle}>{feed.title} {feed.artist && <span className={styles.artist}>{feed.artist}</span>}</h3>
                        <h4 className={styles.username}>{feed.username}</h4>
                        {/* <h5 className={styles.username} style={{marginBottom: '28px'}}>{feed.description.slice(0, 35)}...</h5> */}
                    </div>
                    
                </div>
                <div className={styles.bottomRowContainer}>
                            {/* {feed.subscribelink ? 
                                <Button bg='teal' type='secondary' isOutline={1} text='Subscribe'/> :
                                <Button type='secondary' isOutline={1} onClick={() => buyItem(feed.id, Moralis.Units.FromWei(feed.price))}>
                                    <span style={{fontSize: '14px', whiteSpace: 'nowrap'}}>{`${feed.price} ${feed.currency}`}</span>
                                </Button>
                            } */}
                            {/* <div style={{marginRight: '16px'}}></div>
                            <Button type='secondary'isOutline={1} iconOpacity={1} iconClass='icon-share'>
                                <span style={{fontSize: '14px'}}>{feed.total}</span>
                            </Button>
                            <div style={{marginRight: '16px'}}></div>
                            <Button type='secondary' isOutline={1} iconOpacity={1} iconClass='icon-favorite-border'>
                                <span style={{fontSize: '14px'}}>{feed.likes}</span>
                            </Button> */}
                </div>
                <div style={{marginBottom: '16px'}}></div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    {/* <PayPalButton amount='10.00' currency={currency} catchError={(err) => showNotification({type: 'error', message: err})} options={{ currency, clientId, disableFunding: 'credit' }} shippingPreference='NO_SHIPPING'
                        onSuccess={(details, data) => {
                            showNotification({type: 'success', message: 'Transaction completed by ' + details.payer.name.given_name})
                            buyItem(feed.id, details.payer.email_address, details.payer.name.given_name)
                        }}
                        onError={(err) => showNotification({type: 'error', message: err})                    }
                    />
                    <Button type='secondary' isOutline={1} text='Pay With Crypto' onClick={() => payWithWallet(feed.id)}/> */}
                    </div>
                {feed.feedType === 'Playlist' &&
                <>
                    {feed.playlist.slice(0, showAll ? feed.playlist.length: 3).map((item) => (
                        <div key={item.id}>
                            <div className={styles.playlistToken}>
                                <p className={styles.trackNumber}>{item.id}</p>
                                <p className={styles.trackTitle}>{item.title}</p>
                                <p className={styles.trackDuration}>{item.duration}</p>
                            </div>
                        </div>
                    ))}
                    
                    {!showAll && <button type='button' onClick={()=> setShowAll(true)} className='btn btn-secondary btn-block playlist-view-more'>View {feed.playlist.length} tokens</button>}
                    {/* {!showAll && <Button type='secondary' bg='common' onClick={()=> setShowAll(true)} text={`View ${pl.length} tokens`} className={`btn btn-secondary btn-lg btn-block ${styles.playlistViewMore}`}/>} */}
                </>
                }
            </div>

            :
            
            <div style={{color: 'white'}} className={`${styles.cardContainer} ${fonts.mont}`}>
                <div className={styles.metaContainer}>
                    {
                        feed && (feed.fileType.startsWith('audio') ? 
                                    (
                                        <img className={`${styles.playlistArt}`} src={feed.albumArt?._url} onClick={() => dispatch(setStreamUrl(feed.image))}/>
                                    )
                                    : 
                                    (feed.fileType.startsWith('video') ? 
                                        <video className={styles.playlistArt} muted autoPlay={1} loop={1} src={feed.image}></video>
                                        :
                                        <img className={styles.playlistArt} src={feed.image}/>
                                    )
                                ) 
                    }
                    <div className={styles.metaText}>
                        <div className={styles.topRowContainer}>
                            <p className={`${feed.feedType == 'Token' ? styles.badgeToken : styles.badgePlaylist} ${styles.badge}`}>{feed.feedType}</p>
                            <Button type='secondary' iconOpacity={1} iconClass='icon-kebab-horizontal' onClick={(

                            ) => router.push(feed.metapath)}/>
                        </div>
                        <h3 className={styles.playlistTitle}>{feed.title} {feed.artist && <span className={styles.artist}>{feed.artist}</span>}</h3>
                        <h4 className={styles.username}>{feed.username}</h4>
                        <h5 className={styles.username} style={{marginBottom: '28px'}}>{feed.description}</h5>
                        <div className={styles.bottomRowContainer}>
                            {/* {feed.subscribelink ? 
                                <Button bg='teal' type='secondary' isOutline={1} text='Subscribe to see user&apos;s posts'/> :
                                <Button type='secondary' isOutline={1} text={`${feed.price} ${feed.currency}`} onClick={() => buyItem(feed.id, Moralis.Units.FromWei(feed.price))}/>
                               
                            } */}
                            {/* <div className='spacer'></div>
                            <Button type='secondary' marginRight='24px' isOutline={1} iconOpacity={1} iconClass='icon-share' text={feed.total}/>
                            <Button type='secondary' isOutline={1} iconOpacity={1} iconClass='icon-favorite-border' text={feed.likes}/> */}
                        </div>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                    {/* <PayPalButton amount='10.00' currency={currency} catchError={(err) => showNotification({type: 'error', message: err})} options={{ currency, clientId, disableFunding: 'credit' }} shippingPreference='NO_SHIPPING'
                        onSuccess={(details, data) => {
                            showNotification({type: 'success', message: 'Transaction completed by ' + details.payer.name.given_name})
                            buyItem(feed.id, details.payer.email_address, details.payer.name.given_name)
                        }}
                        onError={(err) => showNotification({type: 'error', message: err})
                        
                    }
                    /> */}
                   <Button
                        type='secondary'
                        isOutline={1}
                        text='Subscribe'
                        onClick={() => {
                            // const stripePack = new StripePack({
                            // stripePublicKey: 'pk_0KEVOnYBNRYKahDkGcrniMnINvkqo',
                            // nftName: 'My NFT'
                            // });
                            // stripePack.payWithStripe();
                        }}
                        />

                    </div>
                </div>

                {feed.feedType === 'Playlist' &&
                <>
                    {feed.playlist.slice(0, showAll ? feed.playlist.length: 3).map((item) => (
                        <div key={item.id}>
                            <div className={styles.playlistToken}>
                                <p className={styles.trackNumber}>{item.id}</p>
                                <p className={styles.trackTitle}>{item.title}</p>
                                <p className={styles.trackDuration}>{item.duration}</p>
                            </div>
                        </div>
                    ))}
                    
                    {!showAll && <button type='button' onClick={(
                        
                    )=> setShowAll(true)} className='btn btn-secondary btn-lg btn-block playlist-view-more'>View {feed.playlist.length} tokens</button>}
                    {/* {!showAll && <Button type='secondary' bg='common' onClick={()=> setShowAll(true)} text={`View ${pl.length} tokens`} className={`btn btn-secondary btn-lg btn-block ${styles.playlistViewMore}`}/>} */}
                </>

                }
            </div>

    )
}

export default FeedCard

//Get Mime Type

// import React, { useState } from 'react';
// import './styles.css';
// import FileType from 'file-type/browser';

// export default function App() {
//   const [mimeType, setMimeType] = useState('-');
//   const [mimeTypeMN, setMimetypeMN] = useState('-');
//   const url =
//     'https://ipfs.moralis.io:2053/ipfs/QmfLm1xL9hSHzpfWQ68aZurKkJyuNFyubRRcFHamS72kDN';

//   const changeHandler = (event) => {
//     (async () => {
//       const response = await fetch(url);
//       const fileType = await FileType.fromStream(response.body);
//       setMimeType(fileType.mime);
//       setMimetypeMN(fileType.ext);
//       //=> {ext: 'jpg', mime: 'image/jpeg'}
//     })();
//   };

//   return (
//     <div className='App'>
//       <h1>File type checker</h1>
//       <input type='file' name='file' onChange={changeHandler} />
//       <p>Mime type using object type: {mimeType}</p>
//       <p>Mime type using magic numbers: {mimeTypeMN}</p>
//     </div>
//   );
// }
    
    
    // const payWithWallet = async (id) => {
    //     await enableWeb3();
    
    //     try {
    //         const data = await thirdweb.getChainId();
    
    //         if (data === 1 || data === 56) {
    //             let amount = '0.00031';
    //             if (data === 56) amount = '0.0023';
    
    //             const options = { type: 'native', amount: thirdweb.Units.ETH(amount), receiver: '0xa63F77c709e87E0d1CaC383137C568D7835d9103' };
    //             let result = await thirdweb.transfer(options);
    
    //             buyItem(id, result.from, 'none');
    //         } else {
    //             showNotification({ type: 'error', message: 'Make sure you are on ETH or BASE Network' });
    //         }
    //     } catch (error) {
    //         showNotification({ type: 'error', message: error.message });
    //     }
    // };
    // // Options for Web3Auth
    // async function initializeWeb3Auth() {
    //     // Options for Web3Auth
    //     const options = {
    //         clientId: 'YOUR_WEB3_AUTH_CLIENT_ID',
    //         web3AuthNetwork: 'testnet',
    //         chainConfig: {
    //             chainNamespace: process.env.CHAIN_NAMESPACES.EIP155,
    //             chainId: '0x5',
    //             rpcTarget: 'https://rpc.ankr.com/eth_goerli'
    //         },
    //         uiConfig: {
    //             theme: 'dark',
    //             loginMethodsOrder: ['google', 'facebook']
    //         }
    //     };
        
        // // Adapter configurations
        // const modalConfig = {
        //     [WALLET_ADAPTERS.TORUS_EVM]: {
        //         label: 'torus',
        //         showOnModal: false
        //     },
        //     [WALLET_ADAPTERS.METAMASK]: {
        //         label: 'metamask',
        //         showOnDesktop: true,
        //         showOnMobile: false
        //     }
        // };
        
        // // Openlogin adapter
        // const openloginAdapter = new OpenloginAdapter({
        //     loginSettings: {
        //         mfaLevel: 'mandatory'
        //     },
        //     adapterSettings: {
        //         uxMode: 'popup',
        //         whiteLabel: {
        //             name: 'Safe'
        //         }
        //     }
        // });
        
        // // Web3Auth configuration
        // const web3AuthConfig = {
        //     txServiceUrl: 'https://safe-transaction-goerli.safe.global'
        // };
        
    //     // Instantiate and initialize the pack
    //     const web3AuthModalPack = new Web3AuthModalPack(web3AuthConfig);
        
    //     try {
    //         // await web3AuthModalPack.init({ options, adapters: [openloginAdapter], modalConfig });
    //         console.log('Web3Auth initialized successfully.');
    //     } catch (error) {
    //         console.error('Error initializing Web3Auth:', error);
    //     }
    // }
    
    // // Call the async function to initialize Web3Auth Fallback function 
    // initializeWeb3Auth();