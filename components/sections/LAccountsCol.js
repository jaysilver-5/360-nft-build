import Image from 'next/image'

const LAccountsCol = ({image, logo}) => {
    return (
        <div style={{position: 'relative'}} className={`col-sm-4 leftCol`}>
            <img style={{position: 'relative', zIndex: 1, height: "100vh"}} src={image} alt=""></img>
            <img style={{position: 'absolute', zIndex: 2, bottom: '10em', height: '96px', width: 'auto', left: '50%', transform: 'translateX(-50%)'}} src={logo}/>
        </div>
    )
}

export default LAccountsCol
