//The Layout component accepts an image for background, page title, keywords for SEO and a child element
import Head from 'next/head'
import classNames from 'classnames/bind'
import styles from '../styles/Layout.module.css'

let cx = classNames.bind(styles);

const Layout = ({ title, keywords, backgroundImage, children }) => {
   
    const className = cx ({
        home: backgroundImage === 'home',
        playlist: backgroundImage === 'playlist',
        signup: backgroundImage === 'signup',
        signin: backgroundImage === 'signin',
        signout: backgroundImage === 'signout'
    })
    return (
        <div className={`${styles.layout} ${className}`}>
            <Head>
                <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no'/>
                <title>{title}</title>
                <meta name='keywords' content={keywords}/>
                <meta name='fortmatic-site-verification' content='nFsp0JJPU0nju8re' />
                <link rel='icon' href='favicon.ico' />
                <link rel='shortcut icon' href='https://ipfs.io/ipfs/QmbEcWF76ZuBFGimX58fwD3qZxZ1qMWJoSxQ6e8Hw4hdeL' />
                <link href='https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700&display=swap' rel='stylesheet' />          
            </Head>
            {children}
        </div>
    )
}

Layout.defaultProps = {
    title: 'Trapchain!',
    keywords: 'Trapchain, 360NFT, Traptoken',
}

export default Layout
