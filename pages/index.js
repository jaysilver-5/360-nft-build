import dynamic from 'next/dynamic';
import Link from 'next/dist/client/link'
import Layout from '../components/Layout'
import Logo from '../components/basic/Logo'
import Button from '../components/basic/button/Button'
import Foot from '../components/sections/foot/Foot'
import styles from '../styles/Home.module.css'
import fonts from '../styles/Fonts.module.css'
// import { Waitlist } from 'waitlistapi'
// import userflow from 'userflow.js'
import { useEffect } from 'react';
// import { useContract, useNFTs, ThirdwebNftMedia } from "@thirdweb-dev/react";


const ThemeButton = dynamic(() => import('../components/basic/ThemeButton'), {
  ssr: false,
});
// const { data: name, isLoading: loadingName } = useContractRead(
//   contract,
//   "name", // The name of the view/mapping/variable on your contract
// );
// const { mutate: setName, isLoading: settingName } = useContractWrite(
//   contract,
//   "setName", // The name of the function on your contract
// );

  // userflow.init('USERFLOW_TOKEN')
  // userflow.identify('USER_ID', {
  //   name: 'USER_NAME',
  //   email: 'USER_EMAIL',
  //   signed_up_at: 'USER_SIGNED_UP_AT'
  // })


export default function Home() {
  // const { contract } = useContract("<CONTRACT_ADDRESS>");
  // const { data: name, isLoading: loadingName } = useContractRead(
  //   contract,
  //   "name", // The name of the view/mapping/variable on your contract
  // );
  // const { mutate: setName, isLoading: settingName } = useContractWrite(
  //   contract,
  //   "setName", // The name of the function on your contract
  // );
  // const { data: nfts, isLoading: isReadingNfts } = useNFTs(contract);

    return (
            <Layout backgroundImage='home'>
              <nav className={styles.navbar}>
                    <div className={styles.containerFluid}>
                        <Logo/>  
                        <div className={styles.buttons}>
                          <ThemeButton/>
                          <span className='margin-right-wide'></span>
                          <Button isLink={1} href='/feed' bg='dark' text='Claim Drop'/>
                          <span className='margin-right-wide'></span>
                          <Button isLink={1} href='/signin' bg='greenToPurple' spread='gradient' text='Login'/>
                          
                        </div>
                    </div>
                </nav>       
              <div className='index-container'>
                  <div className='row'>
                      <div className='col-md-5 p-3'>
                        <span className={`color-subtitle ${fonts.mont}`} style={{fontWeight: 300}}>
                          360NFT is currently invite-only
                          <br/>
                          <span>
                            Here&apos;s how to <Link href='/'><a className='color-alternate' style={{textDecoration: 'none'}}> skip the waitlist now</a></Link>
                          </span>
                        </span>
                        <br/>
                        <br/>
                        <span className={`color-primary ${fonts.druk}`} style={{fontSize: '45px'}}>
                          GET ON
                          <br/>
                          THE <span className='color-alternate'> LIST</span>
                        </span>
                        <br/>
                        <br/>
                        <h1 className={`color-primary ${fonts.mont}`} style={{fontWeight: 300}}>Welcome Friend,<br/>please log in</h1>
                      </div>
                  </div>

                  {/* Show Waitlist if ! authenticated */}
                  <div style={{paddingBottom: '50px'}}>
                    {/* {typeof window !== 'undefined' && <Waitlist className='container--waitlistapi' api_key='E7YQLY' waitlist_link='https://trapchain.herokuapp.com/' />} */}
                    <div className='container--waitlistapi'></div>
                  </div>
              </div>    
              <Foot position='static'/> 
            </Layout>
    )
}
