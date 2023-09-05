import { useState, useEffect, useRef } from 'react'
// import { useMoralis, useMoralisCloudFunction, useChain } from 'react-moralis'
import { useSelector } from 'react-redux'
import Layout from '../components/Layout'
import FeedCard from '../components/cards/feed/FeedCard'
import Logo from '../components/basic/Logo'
import styles from '../styles/Playlists.module.css'
import fonts from '../styles/Fonts.module.css'
import Upload from '../components/sections/upload/Upload'
import Loader from '../components/basic/loader/Loader'
import MobileNav from '../components/sections/mobileNav/MobileNav'
import { useMediaQuery } from 'react-responsive'
import Button from '../components/basic/button/Button'
import { useNotification } from 'quick-react-notification'
import Textbox from '../components/basic/textbox/Textbox'
import Label from '../components/basic/label/Label'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Foot from '../components/sections/foot/Foot'


const Explore = () => {
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    // const { data: feedData, error, isLoading, fetch} = useMoralisCloudFunction('getAllItems')
    const { showNotification } = useNotification();
    // const { Moralis, enableWeb3, web3 } = useMoralis()

    const { chainId: _chainId, chain } = useChain();
    console.log('chain:', chain);

    // useEffect(() => {
    //     var audio = new Audio('../common/Willie.mp3')
    //     audio.loop = true
    //     audio.play()
    // }, [])

    useEffect(() => {
        try{
        showNotification({type: 'success', message: `You just switched to ${chain.name}`})
        } catch{}
    }, [_chainId])

    useEffect(() => {
        enableWeb3()
        window.intercomSettings = {
            app_id: "z0z0sjqk"
        };
        // We pre-filled your app ID in the widget URL: 'https://widget.intercom.io/widget/z0z0sjqk'
        (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/z0z0sjqk';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
    }, [])

    const addNetwork = async () => {
        // await Moralis.getChainId().then( async (data) => {
        //     if (data === 1175159915491121){
        //         showNotification({type: 'success', message: 'You are already on the Trapchain Network!'})
        //         return
        //     }
        //     else {
        //         await Moralis.switchNetwork(1175159915491121).then(() => {
        //             showNotification({type: 'success', message: 'You are now on the Trapchain Network!'})
        //         })
        //         .catch(async() => {
        //             const chainId = 0x42CCD3D512F31;
        //             const chainName = 'Trapchain | SKALE Network';
        //             const currencyName = 'SKALE ETH';
        //             const currencySymbol = 'skETH';
        //             const rpcUrl = 'https://mainnet-api.skalenodes.com/v1/dazzling-gomeisa';
        //             const blockExplorerUrl = 'https://dazzling-gomeisa.explorer.mainnet.skalenodes.com';

        //             await Moralis.addNetwork(
        //                 chainId, 
        //                 chainName, 
        //                 currencyName, 
        //                 currencySymbol, 
        //                 rpcUrl,
        //                 blockExplorerUrl
        //             );
        //         })                      
        //     }
        // })
        
    }
         
    return (
           <Layout backgroundImage='playlist'>
                { isPortrait ?

                <div className={`${styles.containerGridMobile} ${fonts.mont}`}>
                    <div className={styles.mobileNavBackground}>
                        <div className={styles.mobileNav}>
                            <MobileNav title='Willie Taylor - Write My Wrongs'/>
                        </div>
                    </div>

                    <div className={`hide-scroll ${styles.scrollFeedContainer}`}>
                        {/* <div className='centerDivItems'>
                                <h1 className={`color-primary ${fonts.mont}`} style={{fontWeight: 300}}>Dropping Today</h1>
                            </div> */}
                        { isLoading ? <div className='centerDivItems'><Loader/></div> : (feedData && 
                                (
                                    feedData.length >= 1 ? feedData.slice(0).reverse().map((res, ind) => (<FeedCard key={ind} feed={res} />))
                                    :
                                    <div className='centerDivItems'>
                                        <h1 className={`color-primary ${fonts.mont}`} style={{fontWeight: 300}}>Dropping Today!</h1>
                                    </div>
                                ))
                            }
                    </div>
                    {/* <Player progress={40}/> */}
                </div>

                :

                <div className={`${styles.containerGrid} ${fonts.mont}`}>
                    <div className={styles.topLeft}>
                        <Logo className={styles.navbarBrand}/>
                    </div>

                    <div className={styles.bottomLeft}>
                        <div style={{marginTop: '48px'}}></div>
                        <span className='color-primary'>Add the Trapchain Network to your Metamask to receive your NFT when it is dropped to you!</span>
                        <div style={{marginTop: '16px'}}></div>
                        <Button bg='orangeToPink' text='Trapchain Network' onClick={addNetwork}/>
                    </div>

                    <div className={styles.topCenter}>
                        <div style={{overflow: 'hidden', height: '100%'}}>
                            <img src='../images/willie.jpg'></img>
                        </div>
                       
                       </div>

                    <div className={styles.bottomCenter}>
                        <div className={styles.playlistHeader}>
                            <h1 className='color-primary' style={{fontWeight: 'bold', fontSize: '30px', letterSpacing: '-1px'}}>Willie Taylor - Write My Wrongs</h1>
                        </div>
                        <div className={`hide-scroll ${styles.scrollFeedContainer}`}>
                                        {/* <h1 className={`color-primary ${fonts.mont}`} style={{fontWeight: 300}}>Dropping Today</h1> */}
                            { isLoading ? <div className='centerDivItems'><Loader/></div> : (feedData && 
                                (
                                    feedData.length >= 1 ? feedData.slice(0).reverse().map((res, ind) => <FeedCard key={ind} feed={res} />)
                                    :
                                    <div className='centerDivItems'>
                                        <h1 className={`color-primary ${fonts.mont}`} style={{fontWeight: 300}}>Dropping Today!</h1>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className={styles.bottomRight}>
                       
                    </div>      
                   
                    
                </div>
                }
                <Foot position='static'/>
           </Layout> 
    )
}

export default Explore