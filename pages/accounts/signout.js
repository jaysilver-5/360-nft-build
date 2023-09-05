import Link from 'next/link'
import Layout from '../../components/Layout'
import LAccountsCol from '../../components/sections/LAccountsCol'
import RAccountsCol from '../../components/sections/racol/RAccountsCol'
import { useRouter } from 'next/router';
// import { setMoralisUserName, setUserLoggedIn, setWalletAddress } from '../../features/redux/user/user-slice'
import { useDispatch } from 'react-redux'
import fonts from '../../styles/Fonts.module.css'
import Button from '../../components/basic/button/Button'
import styles from '../../styles/Accounts.module.css'

const Signout = () => {

    // const { isLoggingOut, logout } = useMoralis()
    // const { isLoggingOut, logout } = { isLoggingOut: false, logout: () => {}
    const router = useRouter()
    const dispatch = useDispatch()
    const Logout = () => {
        dispatch(setUserLoggedIn(false))
        // dispatch(setMoralisUserName(''))
        dispatch(setWalletAddress(''))
        logout().then(() => {
            router.push('/')
        })
    }

    return (
        <Layout backgroundImage='signout'>
                <div className='row'>
                    <LAccountsCol logo='../images/accounts/360sOut.svg' image='../images/accounts/sign-out-banner.jpg' alt=''/>
                    <RAccountsCol>
                        <>
                            <h1 className={`color-primary ${fonts.druk}`}>Are you sure you wanna sign out from <span className={`color-secondary ${fonts.gilroy}`}>360</span> NFT?</h1>
                            <p className={`color-subtitle ${fonts.mont}`} style={{fontWeight: 500}}>Double check that you have an account recovery email just in case (resend from your settings).</p>
                            <div className={styles.footerRow}>
                                <div className={styles.footerLeft}>
                                    <p className='color-subtitle'>Have another option?</p>
                                    <Link href='/accounts/email'><a className='color-secondary'>Change Email</a></Link>
                                </div>
                                <div className={styles.footerRight}>
                                    <input type='hidden' name='{{ redirect_field_name }}' value='{{ redirect_field_value }}'/>
                                    <div style={{display: 'flex', flexDirection: 'row'}}>
                                        <Button isLink={1} href='/playlists' marginRight='24px' bg='dark' text='Cancel'/>
                                        <Button onClick={Logout} bg='greenToPurple'>
                                            {isLoggingOut && <span className='spinner-border spinner-border-sm' style={{margin: '0 24px'}} role='status' aria-hidden='true'></span>}
                                            Sign Out
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </>
                    </RAccountsCol>
                </div>
        </Layout>
    )
}
export default Signout
