import React from 'react'
import { ethers } from 'ethers';
import ipfsClient, { create } from 'ipfs-http-client';
// import { createClient } from '@supabase/supabase-js';
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ZDK } from "@zoralabs/zdk";
import { Strategies, Networks, useNFT, MediaFetchAgent } from '@zoralabs/nft-hooks';
// import { ZoraTestnet } from "@thirdweb-dev/chains";
// import { ThirdwebSDK } from "@thirdweb-dev/sdk";
// import  Create  from '/upload/Create.js'
import styles from './Upload.module.css'
import Label from '../../basic/label/Label'
import Textbox from '../../basic/textbox/Textbox'
import TextArea from '../../basic/textbox/TextArea'
import fonts from '../../../styles/Fonts.module.css'
import Button from '../../basic/button/Button'
import Link from 'next/dist/client/link'
import Loader from '../../basic/loader/Loader'
import { useNotification } from 'quick-react-notification'
import { tokenContractABI, marketPlaceABI } from '../../../public/contract/abi'
import { setFile, setTokenName, setTokenDesc, setTokenUri, setTokenPrice, setTokenArtist, setTokenAlbumArt } from '../../../features/redux/upload/upload-slice'
// import { useipfs } from '../../../hooks/use-ipfs'
const API_ENDPOINT = "https://api.zora.co/graphql";
const zdk = new ZDK({ endpoint: API_ENDPOINT }); // Defaults to Ethereum Mainnet

const marketplace = zdk.marketplace;
// // const fetchAgent = new Strategies.ZDKFetchStrategy(Networks.ZoraTestnet);
// (async () => {
//     // Get metadata result from the server
//     const metadataResult = await fetchAgent.fetchIPFSMetadata('https://ipfs.io/ipfs/METADATA_HASH');
//     // metadataResult type is {metadata}
  
//     // Get NFT result from the server
//     const nftResult = await fetchAgent.fetchNFT(
//       '0x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63',
//       '2'
//     );
  

  

const Upload = ( { hideModal }) => {

    const dispatch = useDispatch()
    const [fileType, setFileType] = useState('')
    const { showNotification } = useNotification();
    const fileName = useSelector(state => state.upload.file)
    const tokenName = useSelector(state => state.upload.tokenName)
    const tokenDesc = useSelector(state => state.upload.tokenDesc)
    const tokenPrice = useSelector(state => state.upload.tokenPrice)
    const tokenArtist = useSelector(state => state.upload.tokenArtist)
    const tokenUri = useSelector(state => state.upload.tokenUri)
    const tokenAlbumArt = useSelector(state => state.uploadtokenAlbumArt)
    const [isUploading, setisUploading] = useState(false)
    const [uploadStatus, setuploadStatus] = useState(false)
    const [uploadComplete, setuploadComplete] = useState(false)
    const [fileSelected, setfileSelected] = useState(false)
    const [musicSelected, setMusicSelected] = useState(false)
    const [modelSelected, setModelSelected] = useState(false)
    const [albumArtSet, setAlbumArtSet] = useState(false)
    const [ipfsLink, setipfsLink] = useState()
    const [metadataLink, setmetadataLink] = useState()
    const [mintReceipt, setMintReceipt] = useState()
    const [nftID, setNftID] = useState()
    const chainId = useRef()
    const TOKEN_CONTRACT_ADDRESS = useRef()
    const MARKETPLACE_CONTRACT_ADDRESS = useRef()

    // useEffect(() => {
    //     enableWeb3()
    //     ofd()
    // }, [])

    function handleFileSelect(e) {
        const file = e.target.files[0]
        setfileSelected(true)
        dispatch(setFile(file))
        setFileType(file?.type)
        setMusicSelected(false)
        setModelSelected(false)
        if (file.type.startsWith('audio'))
            setMusicSelected(true)
        else if (file.type.startsWith('glb'))
            setModelSelected(true)
    }

    function handleAASelect(e){
        const file = e.target.files[0]
        setAlbumArtSet(true)
        dispatch(setTokenAlbumArt(file))       
    }
    function handleVideoThumbSelect(e){
        const file = e.target.files[0]
        setModelSelected(true)
        dispatch(setTokenAlbumArt(file))       
    }

    const ofd = () => {
        document.getElementById('fileDialogId').click();
    }    
    const ofdalbumArt = () => {
        document.getElementById('fileDialogId2').click();
    }    
    const ofdVideoThumb = () => {
        document.getElementById('fileDialogId3').click();
    }    

    const mintNft = async (metadataUrl) => {
        switch (chainId.current) {
            case 999:
                TOKEN_CONTRACT_ADDRESS.current = web3.utils.toChecksumAddress('0x0993123cd814FcADCc72d694F7123b1827b85cAB') //ZORA 
                MARKETPLACE_CONTRACT_ADDRESS.current = web3.utils.toChecksumAddress('0x4E1E4ceB15ab6390F35259e77dd66563B234e31D') //ZORA 
                break;
        }
        const contract = new web3.eth.Contract(tokenContractABI, TOKEN_CONTRACT_ADDRESS.current)
        const receipt = await contract.methods.createItem(metadataUrl).send({from: ethereum.selectedAddress})
        setuploadStatus('Minting')
        setMintReceipt(receipt)
        return receipt.events.Transfer.returnValues.tokenId;

        
    }

    const ensureMarketplaceIsApproved = async (tokenId) => {
        const contract = new web3.eth.Contract(tokenContractABI, TOKEN_CONTRACT_ADDRESS.current)
        const approvedAddress = await contract.methods.getApproved(tokenId).call()
        if (approvedAddress != MARKETPLACE_CONTRACT_ADDRESS.current) { 
            await contract.methods.approve(MARKETPLACE_CONTRACT_ADDRESS.current, tokenId).send({from: walletAddress})
        }
    }

    const processNFT = async () => {
        try {
            if (!fileSelected) {
                alert('Please select a file')
                ofd()
                return
            } 
            if (!tokenName) {
                alert('Please input a name')
                return;
            } 
            if (!tokenDesc) {
                alert('Please input a description')
                return;
            } 
            if (!tokenArtist) {
                alert('Please input a description')
                return;
            } 
            if (!tokenPrice) {
                alert('Please input token price')
                return;
            }
            if (musicSelected && !albumArtSet){
                alert('Please set an album art')
                ofdalbumArt()
                return
            }
            var format = /[!@#$%^&*()_+\-=\[\]{};':'\\|,.<>\/?]+/;
            if(format.test(tokenName)){
                alert(`NFT name contains special characters.\nPlease remove any special characters ${format}.`)
                return;
            }
            if(format.test(tokenDesc)){
                alert(`NFT description contains special characters.\nPlease remove any special characters ${format}.`)
                return;
            }

            setuploadStatus('Uploading to IPFS')
            setisUploading(true)
            const data = fileName;
            const dataName = `nftfile_${Math.floor(Math.random() * 9999999) + 1}`;
            const nftFile = new ipfs.File(dataName, data);
            await nftFile.saveIPFS();

            let nftAlbumArt
            if (musicSelected || modelSelected) {
                nftAlbumArt = new ipfs.File(`nftAlbumArt_${Math.floor(Math.random() * 9999999) + 1}`, tokenAlbumArt);
                await nftAlbumArt.save()
            }
            

            //Save MetaData To ipfs
            setuploadStatus('Saving MetaData')
            const ipfsLink = nftFile.ipfs()
            setipfsLink(ipfsLink)
            const metadata = {
                'name': tokenName,
                'description': tokenDesc,
                'image': ipfsLink,
                'metadata': tokenUri
            };
            const nftFileMeta = new ipfs.File('metadata.json', {base64: btoa(JSON.stringify(metadata))});
            await nftFileMeta.saveIPFS();
            const nftFileMeta_FilePath = nftFileMeta.ipfs();
            const nftFileMeta_FileHash = nftFileMeta.hash();
            setmetadataLink(nftFileMeta_FilePath)

            setuploadStatus('Awaiting Mint Confirmation')
            const nftId = await mintNft(nftFileMeta_FilePath);
            setNftID(nftId)

            // Save to ipfs Database
            const Item = ipfs.Object.extend('Item');
            const item = new Item();
            item.set('name', tokenName);
            item.set('description', tokenDesc);
            item.set('nftFilePath', ipfsLink);
            item.set('nftFileHash', nftFile.hash());
            item.set('metaPath', nftFileMeta_FilePath);
            item.set('metaHash', nftFileMeta_FileHash);
            item.set('tokenId', nftId);
            item.set('tokenAddress', TOKEN_CONTRACT_ADDRESS.current);
            item.set('price', Number(tokenPrice));
            item.set('currency', 'ETH');
            item.set('artist', tokenArtist);
            item.set('likes', '0');
            item.set('share', '0');
            item.set('owner', walletAddress);
            item.set('feed_type', 'Token');
            item.set('file_type', fileType);
            item.set('tokenUri', tokenUri);
            musicSelected && item.set('albumArt', nftAlbumArt);
            item.set('buyerEmail', '0');
            item.set('nftSent', false);
            await item.save();

            setuploadStatus('Awaiting Approval')
            await ensureMarketplaceIsApproved(nftId)
            setuploadStatus('Confirming Marketplace Listing')
            const marketPlaceContract = new web3.eth.Contract(marketPlaceABI, MARKETPLACE_CONTRACT_ADDRESS.current)
            // await marketPlaceContract.methods.addItemToMarket(nftId, TOKEN_CONTRACT_ADDRESS.current, ipfs.Units.ETH(tokenPrice)).send({from: walletAddress})

            setuploadStatus('Complete')
            setuploadComplete(true)
            setisUploading(false)
            // })
        } catch (error) {
            setuploadStatus('Failed')
            showNotification({type: 'error', message: error.message})
            console.log(error.message);
            setuploadComplete(true)
            setisUploading(false)
        }
        await getNFTs(console.log)('NFTs loaded')

    }
    const createDirectListing = (contractAddress, tokenId, price) => {
        const contract = new web3.eth.Contract(marketPlaceABI, MARKETPLACE_CONTRACT_ADDRESS.current)
        return contract.methods.addItemToMarket(contractAddress, tokenId, ipfs.Units.ETH(price))
    }



    // const uploadNFT = async () => {
    //     // let contractAddress = 0x3d27dc56c8946401f82f286467c409b77fb9cdd6;
    //     // let tokenId = 1;
    //     // let price = 0.01;
    //     // const transaction = createDirectListing(contractAddress, tokenId, price);
    //     const receipt = await transaction.sendTransaction();
    //     console.log(receipt);
    // }

    const { data, error, loading } = useNFT({
        tokenId: 1,
        contractAddress: '0x3d27dc56c8946401f82f286467c409b77fb9cdd6',
        provider: 'https://testnet,zora.co',
        networkId: 999,
    });
    console.log(data);
    console.log(error, 'error on useNFT uploadNFT');
    console.log(loading);

    return (
            <div className={styles.main}>
                { isUploading ? 
                    <div>
                        <div className={`centerDivItems ${styles.container}`}>
                            <h2 className={`color-primary ${fonts.mont}`} style={{fontWeight: 300, paddingTop: '50px'}}>{uploadStatus}</h2>
                        </div>
                        <div className='centerDivItems'>
                            <Loader/>
                        </div>
                    </div>
                    :
                    <div className={styles.container}>
                        {uploadComplete ?
                            <div>
                                <h1 className={`color-primary ${fonts.mont}`} style={{fontWeight: 300, paddingTop: '50px'}}>Upload Complete</h1>
                                <div style={{margin: 20}}>
                                    <h6>
                                        <Link href={ipfsLink}>
                                            <a className='color-alternate' style={{textDecoration: 'none'}}>View on IPFS</a>
                                        </Link>
                                    </h6>
                                    <br />
                                    <h6>
                                        <Link href={metadataLink}>
                                            <a className='color-alternate' style={{textDecoration: 'none'}}>View Metadata</a>
                                        </Link>
                                    </h6>
                                    <br />
                                    <div>
                                        <Label>Mint Receipt</Label>
                                        <div className='color-primary' style={{overflow: 'auto'}}>
                                            <h6>{`ID: ${nftID}`}</h6>
                                            <h6>{`Transaction Hash: ${mintReceipt.transactionHash}`}</h6>
                                            <h6>{`Block Hash: ${mintReceipt.blockHash}`}</h6>
                                            <h6>{`Block Number: ${mintReceipt.blockNumber}`}</h6>
                                        </div>
                                    </div>
                                    <br />
                                    <Button text='Done' onClick={hideModal}/>
                                </div>
                            </div>
                            :
                            <div>
                                <h1 className={`color-primary ${fonts.mont}`} style={{fontWeight: 300, paddingTop: '50px'}}>Upload</h1>
                                <div className='hide-scroll' style={{overflow: 'auto'}}>
                                    <Label>NFT Name</Label>
                                    <Textbox toDispatch={setTokenName}/>
                                    <Label>NFT Description</Label>
                                    {/* <Textbox toDispatch={setTokenDesc}/> */}
                                    <TextArea toDispatch={setTokenDesc}/>
                                    <Label>Artist Name</Label>
                                    <Textbox toDispatch={setTokenArtist}/>
                                    <Label>Price</Label>
                                    <Textbox toDispatch={setTokenPrice}/>
                                    <Label>Song Metadata Uri</Label>
                                    <Textbox toDispatch={setTokenUri}/>
                                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                        <Button text='Cancel' onClick={hideModal} marginRight='24px' bg='dark'/>
                                        {/* <Button text='Upload' onClick={uploadNFT}/> */}
                                        <small style={{paddingLeft: '30px'}} className='color-primary'>{fileSelected && (fileName.name.length >= 10 ? `${fileName.name.substr(0, 5)}...${fileName.name.substr(fileName.name.length - 5)}` : fileName.name)}</small>
                                        {fileSelected && <Button text='Change' type='small' onClick={ofd}/>}
                                        {(musicSelected || modelSelected) && (<small className='color-primary'>|</small>)}
                                        {musicSelected && <Button text='Add Album Art' type='small' onClick={ofdalbumArt}/>}
                                        {modelSelected && <Button text='Add Video Thumbnail' type='small' onClick={ofdVideoThumb}/>}
                                        {albumArtSet && <img className='verified' src='https://s2.svgbox.net/materialui.svg?ic=verified&color=00b8b9' width='24' height='24'/>}
                                    </div>
                                </div>
                            </div>                        
                        }                   
                    </div>
                }
                <form style={{display: 'none'}}>
                    <input type='file' id='fileDialogId' onChange={handleFileSelect} accept='image/jpeg, image/png, image/video/mp4, image/gif, audio/*'/>
                    <input type='file' id='fileDialogId2' onChange={handleAASelect} accept='image/jpeg, image/png'/>
                    <input type='file' id='fileDialogId3' onChange={handleVideoThumbSelect} accept='gltf/glb'/>
                </form>
            </div>
            )
        }

export default Upload
  
    // const sendUserSKETH = async () => {
    //     web3.eth.accounts.signTransaction({
    //         to: walletAddress,
    //         value: '10000000000000000',
    //         gas: 2000000,
    //         gasPrice: '234567897654321',
    //         nonce: 0,
    //         chainId: 19877346431401
    //     }, '0x88e5ba18fd33e01cab2ea3a16843971ab01e2a13a71ac0fe149b7627e3a7b52e')
    // }

    // const switchNetworkToSKALE = async () => {
    //     await ipfs.getChainId().then( async (data) => {
    //         chainId.current = data
    //         if (chainId.current === 1175159915491121)
    //             return
    //         else {
    //             await ipfs.switchNetwork(1175159915491121).then(() => {
    //                 showNotification({type: 'success', message: 'You are now on the Trapchain Network!'})
    //             })
    //             .catch(async(error) => {
    //                 if (error.code == 4001)
    //                     showNotification({type: 'error', message: error.message})
    //                 else{
    //                     const chainId = 0x42CCD3D512F31;
    //                     const chainName = 'Trapchain | ZORA Network';
    //                     const currencyName = 'ZORA ETH';
    //                     const currencySymbol = 'skETH';
    //                     const rpcUrl = 'https://mainnet-api.skalenodes.com/v1/dazzling-gomeisa';
    //                     const blockExplorerUrl = 'https://dazzling-gomeisa.explorer.mainnet.skalenodes.com';


                        // await ipfs.addNetwork(
                        //     chainId, 
                        //     chainName, 
                        //     currencyName, 
                        //     currencySymbol, 
                        //     rpcUrl,
                        //     blockExplorerUrl
                        // );
                //     }
                // })                      
    //         }
    //     })
        
    // }
   