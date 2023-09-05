import User from "../user/User"

const MobileNav = ({title}) => {
    return (
        <div style={{display: "flex", alignItems: 'center'}}>
            {/* <User getOnlyImage={1}/> */}
            <p className='color-primary'>{title}</p>
        </div>
    )
}

export default MobileNav
