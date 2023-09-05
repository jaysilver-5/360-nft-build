import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import FeedCard from '../components/cards/feed/FeedCard'
import Player from '../components/Player'
import ProfileProgress from '../components/cards/profile-progress/ProfileProgress'
import Logo from '../components/basic/Logo'
import Toolbox from '../components/sections/toolbox/Toolbox'
import User from '../components/sections/user/User'
import Menu from '../components/sections/menu/Menu'
import Suggestions from '../components/sections/suggestions/Suggestions'
import Toggle from '../components/basic/toggle/Toggle'
import PopOver from '../components/basic/popover/PopOver'
import AddToken from '../components/cards/addtoken/AddToken'
import styles from '../styles/Playlists.module.css'
import fonts from '../styles/Fonts.module.css'
import Upload from '../components/sections/upload/Upload'
import MobileNav from '../components/sections/mobileNav/MobileNav'
import { useMediaQuery } from 'react-responsive'
import MobileBottomNav from '../components/sections/mobileNav/MobileBottomNav'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { feedData, waveItems } from '../public/common/items'
// import {
//     ConnectWallet, 
//     useAddress, 
//     useContract,
//     useNetwork,
//     useNetworkMismatch
//   } from "@thirdweb-dev/react";
//   import { createClient } from '@supabase/supabase-js';

const Feed = () => {
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    // const isLoggedIn = useSelector(state => state.user.isLoggedIn)
    const router = useRouter()

    // if (!isLoggedIn)
    //     router.push('/accounts/signin')

   

    const [openUploadModal, setUploadModal] = useState(false)
    const [filter, setFilter] = useState('All')
    const [filteredData, setFilteredData] = useState(feedData);
    const [currentSearch, setcurrentSearch] = useState();

    useEffect(() => {
        handleSearch(currentSearch)
    }, [filter])


    const handleSearch = (event) => {
        let value 
        if (event) {
            setcurrentSearch(event)
            value = event.target.value.toLowerCase()
        } else{
            value = ''
        }
        let result = [];
        let toFilter
        filter != 'All' ? toFilter = feedData.filter(feed => feed.feedType === filter) : toFilter =  feedData
        result = toFilter.filter((data) => {
            return data.title.toLowerCase().search(value) != -1;
        });
        setFilteredData(result);
    }
      
    return (
           <Layout backgroundImage='playlist'>
               {isPortrait ?
                <div className={`${styles.containerGridMobile} ${fonts.mont}`}>
                    <div className={styles.mobileNavBackground}>
                        <div className={styles.mobileNav}>
                            <MobileNav title='Your Feed'/>
                            <div style={{marginTop: '12px'}}></div>
                            <div className={styles.playlistHeader}>
                                <Toolbox onSearch={(event) => handleSearch(event)} onlySearch={1}/>
                                <Toggle onChange={setFilter} value={filter}/>
                            </div>
                        </div>
                    </div>
                   
                    <div className={`hide-scroll ${styles.scrollFeedContainer}`}>
                        {filteredData.map((res, ind) => <FeedCard key={ind} feed={res} />)}
                    </div>
                    {/* <Player progress={40}/> */}
                    <MobileBottomNav/>
                </div>

                :

                <div className={`${styles.containerGrid} ${fonts.mont}`}>
                    <div className={styles.topLeft}>
                        <Logo className={styles.navbarBrand}/>
                    </div>

                    <div className={styles.topCenter}>
                        <Toolbox onSearch={(event) => handleSearch(event)} showModal={() => setUploadModal(true)}/>
                    </div>
                    
                    <div className={styles.topRight}>
                        <User />
                    </div>

                    <div className={styles.bottomLeft}>
                        <Menu/>
                        <ProfileProgress done='50'/>
                    </div>

                    <div className={styles.bottomCenter}>
                        <div className={styles.playlistHeader}>
                            <h1 className='color-primary' style={{fontWeight: 'bold', fontSize: '30px', letterSpacing: '-1px'}}>Your Feed</h1>
                            <Toggle onChange={setFilter} value={filter}/>
                        </div>
                        <div className={`hide-scroll ${styles.scrollFeedContainer}`}>
                            {filteredData.map((res, ind) => <FeedCard key={ind} feed={res} />)}
                        </div>
                        <Player progress={40}/>
                    </div>

                    <div className={styles.bottomRight}>
                        <div className={styles.subHeader}>Top token in
                            <button className={`btn btn-secondary dropdown-toggle ${styles.dropdownToggle}`} type='button' id='dropdownMenu2' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>1 Week</button>
                            <div className='dropdown-menu dropdown-menu-right' aria-labelledby='dropdownMenu2'>

                                <button className='dropdown-item' type='button'>1 Hour</button>
                                <button className='dropdown-item' type='button'>1 Day</button>
                                <button className='dropdown-item' type='button'>1 Week</button>
                                <button className='dropdown-item' type='button'>1 Month</button>
                            </div>
                        </div>
                        
                        <ul className={styles.tokenSection}>

                            <li className={styles.tokenItem}>
                                <img src='https://ipfs.io/ipfs/QmZVF237kpkgc5EASeWczMJ2CiQE2mDu6sgDXZABFPz3ut' className='token-image'/>
                                <p className={styles.tokenItemText}>6ix9ine</p>
                                <a href='#' className='stretched-link'></a>
                            </li>
                            
                            <li className={styles.tokenItem}>
                                <img src='https://ipfs.io/ipfs/QmQrzVCu84ezign2vrGdYik12ezsGu9rLvnGHCGScw9mXg' className='token-image'/>
                                <p className={styles.tokenItemText}>GucciMane</p>
                                <a href='#' className='stretched-link'></a>
                            </li>

                            <li className={styles.tokenItem}>
                                <img src='https://ipfs.io/ipfs/QmdUzLgetCsDT8CzDZVqrQj82shx8kSf9npV8pVxZz1gUx' className='token-image'/>
                                <p className={styles.tokenItemText}>Lil&apos;Durkß</p>
                                <a href='#' className='stretched-link'></a>
                            </li>

                            <li className={styles.tokenItem}>
                                <img src='https://ipfs.io/ipfs/QmTRRFy828bSxEkVk59UXyLH9MEEmKLZWBQztbRV7R54wa' className='token-image'/>
                                <p className={styles.tokenItemText}>Lil&apos;Pump</p>
                                <a href='#' className='stretched-link'></a>
                            </li>

                        </ul>
                       
                        <span className={styles.subHeader}>Wavemakers</span>
                        <Suggestions items={waveItems} hasSubscribeButton={0}/> 
                        <AddToken/>
                    </div>      
                   
                    {
                        openUploadModal &&
                        <div className={styles.uploadModal}>
                            <Upload hideModal={() => setUploadModal(false)}/>
                        </div>
                    }
                </div>
                }
           </Layout> 
    )
}

export default Feed