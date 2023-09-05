import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setPic } from '../../features/redux/user/user-slice'
import { Dropdown } from 'react-bootstrap'
import { useMediaQuery } from 'react-responsive'
import MobileBottomNav from '../../components/sections/mobileNav/MobileBottomNav'
import MobileNav from '../../components/sections/mobileNav/MobileNav'
import Layout from '../../components/Layout'
import FeedCard from '../../components/cards/feed/FeedCard'
import Player from '../../components/Player'
import ProfileProgress from '../../components/cards/profile-progress/ProfileProgress'
import Logo from '../../components/basic/Logo'
import Toolbox from '../../components/sections/toolbox/Toolbox'
import User from '../../components/sections/user/User'
import Menu from '../../components/sections/menu/Menu'
import Suggestions from '../../components/sections/suggestions/Suggestions'
import AddToken from '../../components/cards/addtoken/AddToken'
import Button from '../../components/basic/button/Button'
import Upload from '../../components/sections/upload/Upload'
import styles from '../../styles/Playlists.module.css'
import fonts from '../../styles/Fonts.module.css'
import { suggestions } from '../../public/common/items'

const Profile = () => {

    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })

    const name = useSelector(state => state.user.name)
    const uName = '@' + useSelector(state => state.user.uname)
    const uPic = useSelector(state => state.user.upic)
    const uCover = useSelector(state => state.user.ucover)
    // const uMoralisUsername = useSelector(state => state.user.moralisUserName)
    const userBio = 'User Bio'

    const [avatarSelected, setAvatarSelected] = useState(null)
    const [avatarUploading, setAvatarUploading] = useState(false)

    useEffect(() =>{
        !isPortrait && document.getElementById('moreOptions').classList.remove('dropdown-toggle', 'btn-success')
    }, [])

    // const { Moralis } = useMoralis()
    // const { data, error, isLoading, fetch } = useMoralisCloudFunction('getUserItems')

    const [openUploadModal, setUploadModal] = useState(false)

    const dispatch = useDispatch()
    async function handleFileSelect(e) {

        try{
        setAvatarUploading(true)
        const file = e.target.files[0]
        // const avatarFile = new Moralis.File(file.name, file)
        await avatarFile.save()
        
        // const UserClass = await Moralis.Object.extend('User')
        // const query = new Moralis.Query(UserClass).equalTo('username', uMoralisUsername)
        const results = await query.find()
        const user = JSON.parse(JSON.stringify(results))
        const objId = (user[0].objectId)
        // const userObj = await new Moralis.Query(UserClass).get(objId)
        userObj.set('avatar', avatarFile)
        await userObj.save()
        setAvatarSelected(file)
        setAvatarUploading(false)
        dispatch(setPic(avatarFile?._url))
        }
        catch{
            setAvatarUploading(false)
        }
    }

    const handleCoverSelect = async (e) => {
        const chainId = await Moralis.getChainId()
        console.log('chain', chainId); // 56
    }

    return (
        <Layout backgroundImage='playlist'>
             { isPortrait ?

            <div className={`${styles.containerGridMobile} ${fonts.mont}`}>
                <div className={styles.mobileNavBackground}>
                    <div className={styles.mobileNav}>
                        <MobileNav title='Profile'/>
                        <div style={{marginTop: '12px'}}></div>

                    </div>
                </div>

                <div className={`hide-scroll ${styles.scrollFeedContainer}`}>
                { data && 
                                (
                                    data.length >= 1 ? data.slice(0).reverse().map((res, ind) => <FeedCard key={ind} feed={res} />)
                                    :
                                    <div className='centerDivItems'>
                                        <h1 className={`color-primary ${fonts.mont}`} style={{fontWeight: 300}}>No NFT&apos;s Minted</h1>
                                    </div>
                                )
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
                    <Toolbox showModal={() => setUploadModal(true)}/>
                </div>
                    
                <div className={styles.topRight}>
                    <User />
                </div>

                <div className={styles.bottomLeft}>
                    <Menu/>
                    <ProfileProgress done='50'/>
                </div>

                <div className={styles.bottomCenter}>
                    <div className={`hide-scroll ${styles.scrollFeedContainer}`}>
                        <div className={styles.profileCover}>
                            <img className={styles.profileCoverImage} src={uCover} alt='...'/>
                            <img className={styles.profileImage} src={uPic}/>
                            <div className={styles.profileCoverBody}>
                                <div className={styles.profileCoverBodyHeader}>
                                    <div className={styles.profileNameContainer}>
                                        <h3 className={styles.profileName}>{name}<img className='verified' src='https://s2.svgbox.net/materialui.svg?ic=verified&color=00b8b9' width='24' height='24'/></h3>
                                        <h4 className={styles.profileUsername}>{uName}</h4>
                                    </div>
                                    <div className='spacer'></div>
                                    <Dropdown>
                                        <Dropdown.Toggle variant='success' id='moreOptions'>
                                            { avatarUploading ? <span className='spinner-border spinner-border-sm' style={{margin: '0 24px'}} role='status' aria-hidden='true'></span>
                                                :
                                                <Button isDropdownButton={1} type='secondary' marginRight='24px' isOutline={1} iconOpacity={1} iconClass='icon-kebab-horizontal'/>
                                            }
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                                <Button isDropdownButton={1} text='Upload Avatar' onClick={() => document.getElementById('fileDialogPic').click()} type='secondary'/>
                                                <Button isDropdownButton={1} text='Upload Cover' onClick={() => document.getElementById('fileDialogCover').click()} type='secondary'/>    
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Button type='secondary' marginRight='24px' isOutline={1} iconOpacity={1} iconClass='icon-share'/>
                                    {/* <Button type='secondary' isLink={1} marginRight='24px' isOutline={1} iconOpacity={1} iconClass='icon-favorite-border'/> */}
                                    {/* <Button text='Subscribe' bg='greenToPurple' spread='gradient'/> */}
                                </div>
                                <p className={styles.profileCoverText}>{userBio}
                                    {/* condional if text length maxes limit <span>
                                        <Link href='/'><a className='color-alternate' style={{textDecoration: 'none'}}> View more info</a>
                                        </Link>
                                    </span> */}
                                </p>
                            </div>
                        </div>
                        { data && 
                                (
                                    data.length >= 1 ? data.slice(0).reverse().map((res, ind) => <FeedCard key={ind} feed={res} />)
                                    :
                                    <div className='centerDivItems'>
                                        <h1 className={`color-primary ${fonts.mont}`} style={{fontWeight: 300}}>No NFT&apos;s Minted</h1>
                                    </div>
                                )
                        }
                    </div>
                    <Player progress={90}/>
                </div>

                <div className={styles.bottomRight}>
                    <div className='subscription-grid'>
                        <a className='grid-item locked'>
                            <img src='https://ipfs.io/ipfs/QmaMqNLgthC82tEvtJi9b5crbiHCmAw2jVGLQhzLWg24jz'/>
                        </a>
                        <a className='grid-item locked'>
                            <img src='https://ipfs.io/ipfs/QmekzNWUg4a2HQduHv9wq3vbiyRWBVUdrVzbDuWwied7sN'/>
                        </a>
                        <a className='grid-item'>
                            <img src='https://ipfs.io/ipfs/QmYPP9YPaxp18j5HKVN2mwEqjmpaZvhCX1bgqvX4LGsfYp'/>
                        </a>
                        <a className='grid-item'>
                            <img src='https://ipfs.io/ipfs/QmZHvB7CV3Y8Azzq6tR6Ztu8jtbqB3TJbLhPzMPQSW9o9J'/>
                        </a>
                        <a className='grid-item'>
                            <img src='https://ipfs.io/ipfs/QmYQmDEf3kMBfrd3MbPhEVhYXVwMQ88BqnpD6RAVx9HY71'/>
                        </a>
                        <a className='grid-item'>
                            <img src='https://ipfs.io/ipfs/QmS3rtQjbYR39myCr8f1JS8f5RC7JGP8o3svqtWpibSsm8'/>
                        </a>
                    </div>
                    <span className={styles.subHeader}>You might like</span>
                    <Suggestions items={suggestions} hasSubscribeButton={1}/> 
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
            <form style={{display: 'none'}}>
                <input type='file' id='fileDialogPic' onChange={handleFileSelect} accept='image/jpeg, image/png, image/video/mp4, image/gif, audio/*'/>
                <input type='file' id='fileDialogCover' onChange={handleCoverSelect} accept='image/jpeg, image/png, image/video/mp4, image/gif, audio/*'/>
            </form>
        </Layout>
    )
}

export default Profile

//<Button text='Subscribe' bg="greenToPurple" spread='gradient'/>

