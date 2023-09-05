import { useState, useEffect, useRef } from 'react'
// import { useMoralisCloudFunction } from 'react-moralis'
import { useSelector } from 'react-redux'
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
import Loader from '../components/basic/loader/Loader'
import MobileBottomNav from '../components/sections/mobileNav/MobileBottomNav'
import MobileNav from '../components/sections/mobileNav/MobileNav'
import { useMediaQuery } from 'react-responsive'
import { waveItems } from '../public/common/items'



const Explore = () => {
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })

    const [openUploadModal, setUploadModal] = useState(false)
    const [filterValue, setFilterValue] = useState('All')
    const [filteredData, setFilteredData] = useState(feedData);
    const [currentSearch, setcurrentSearch] = useState();
    // const { data: feedData, error, isLoading, fetch } = useMoralisCloudFunction('getAllItems')
    // const { data: itemsForSale, fetch: fetchItemsForSale } = useMoralisCloudFunction('getItemsForSale')
    // console.log(itemsForSale);
    // console.log(feedData);

    useEffect(() => {
        handleSearch(currentSearch)
    }, [filterValue, feedData])


    const handleSearch = (event) => {
        if (feedData) {
            let value 
            if (event) {
                setcurrentSearch(event)
                value = event.target.value.toLowerCase()
            } else{
                value = ''
            }
            let result = [];
            let toFilter
            filterValue != 'All' ? toFilter = feedData.filter(feed => feed.feedType === filterValue) : toFilter =  feedData
            result = toFilter.filter((data) => {
                return data.title.toLowerCase().search(value) != -1;
            });
            setFilteredData(result);
        }
    }
         
    return (
           <Layout backgroundImage='playlist'>
                { isPortrait ?

                <div className={`${styles.containerGridMobile} ${fonts.mont}`}>
                    <div className={styles.mobileNavBackground}>
                        <div className={styles.mobileNav}>
                            <MobileNav title='Explore'/>
                            <div style={{marginTop: '12px'}}></div>
                            <div className={styles.playlistHeader}>
                                <Toolbox onSearch={(event) => handleSearch(event)} onlySearch={1}/>
                                <Toggle onChange={setFilterValue} value={filterValue}/>
                            </div>
                        </div>
                    </div>

                    <div className={`hide-scroll ${styles.scrollFeedContainer}`}>
                        { isLoading ? <div className='centerDivItems'><Loader/></div> : (filteredData && 
                                (
                                    filteredData.length >= 1 ? filteredData.slice(0).reverse().map((res, ind) => <FeedCard key={ind} feed={res} />)
                                    :
                                    <div className='centerDivItems'>
                                        <h1 className={`color-primary ${fonts.mont}`} style={{fontWeight: 300}}>Nothing Here</h1>
                                    </div>
                                ))
                            }
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
                            <h1 className='color-primary' style={{fontWeight: 'bold', fontSize: '30px', letterSpacing: '-1px'}}>Explore</h1>
                            <Toggle onChange={setFilterValue} value={filterValue}/>
                        </div>
                        <div className={`hide-scroll ${styles.scrollFeedContainer}`}>
                            { isLoading ? <div className='centerDivItems'><Loader/></div> : (filteredData && 
                                (
                                    filteredData.length >= 1 ? filteredData.slice(0).reverse().map((res, ind) => <FeedCard key={ind} feed={res} />)
                                    :
                                    <div className='centerDivItems'>
                                        <h1 className={`color-primary ${fonts.mont}`} style={{fontWeight: 300}}>Nothing Here</h1>
                                    </div>
                                ))
                            }
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
                                <img src='https://ipfs.io/ipfs/QmdusuNQxHyBn2vnhRpvDwrfbxzz9Z1DdkNyBgYUXXDVBT' className='token-image'/>
                                <p className={styles.tokenItemText}>Lil&apos;Reese</p>
                                <a href='#' className='stretched-link'></a>
                            </li>
                            
                            <li className={styles.tokenItem}>
                                <img src='https://ipfs.io/ipfs/QmedGWqsuS1bAyye5V7m41TJH6SYbbWH3brpHGzC1J6C6z' className='token-image'/>
                                <p className={styles.tokenItemText}>Famous Dex</p>
                                <a href='#' className='stretched-link'></a>
                            </li>

                            <li className={styles.tokenItem}>
                                <img src='https://ipfs.io/ipfs/QmPSRpzv5151rkpUqi1iiqTE9frWKA9SrWNWNBZNik21DG' className='token-image'/>
                                <p className={styles.tokenItemText}>DA BABY</p>
                                <a href='#' className='stretched-link'></a>
                            </li>

                            <li className={styles.tokenItem}>
                                <img src='https://ipfs.io/ipfs/QmYPP9YPaxp18j5HKVN2mwEqjmpaZvhCX1bgqvX4LGsfYp' className='token-image'/>
                                <p className={styles.tokenItemText}>Lil Baby</p>
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

export default Explore