import Link from 'next/dist/client/link';
import classNames from 'classnames/bind'
import styles from './Button.module.css'
import PropTypes from 'prop-types'

let cx = classNames.bind(styles);

const Button = ({ id, text, bg, iconClass, href, iconOpacity, type, isLink, isOutline, onClick, spread, marginRight, children, ariaLabel, title, isDropdownButton, disabled}) => {
   
    const main = cx ({
        base: type=== 'primary',
        emptyBase: type==='secondary',
        small: type==='small',
        emptyBaseSecondary: type === 'tertiary',
        toggle: bg === 'toggle',
        social: type === 'social',
        notification: bg === 'notification',
        upload: bg === 'upload',
        sub: bg === 'sub',
        outlined: isOutline,
        dark: bg ==='dark',
        google: bg === 'google',
        twitter: bg === 'twitter',
        discord: bg === 'discord',
        facebook: bg === 'facebook',
        blueToPurple: bg === 'blueToPurple',
        greenToPurple: bg === 'greenToPurple',
        orangeToPink: bg === 'orangeToPink',
        teal: bg === 'teal',
        gradient: spread === 'gradient',
    })

    const icx = cx ({
        iconOpacity: iconOpacity,
        iconMargin: iconClass && text
    })
    
    return (
        <>
        {isLink ? <Link href={href}>
                    {isDropdownButton ?
                        <a className={`dropdown-item disableHover ${main}`} style={{textDecoration: 'none', marginRight: marginRight}}>
                                {iconClass && <div className={`${iconClass} ${icx}`} style={{width: '24px', height:'24px'}}/>}
                                {text}
                                {children}
                        </a> :  
                        <a style={{textDecoration: 'none', marginRight: marginRight}}>
                            <button className={main}>
                                {iconClass && <div className={`${iconClass} ${icx}`}  style={{width: '24px', height:'24px'}}/>}
                                {text}
                                {children}
                            </button>
                        </a>
                    }
                </Link> :
                <button id={id} className={`${main}  ${isDropdownButton && 'dropdown-item'}`} style={{marginRight: marginRight}} onClick={onClick} aria-label={ariaLabel} title={title} disabled={disabled}>
                        {iconClass && <div className={`${iconClass} ${icx}`} style={{width: '24px', height:'24px'}}/>}
                        {text}
                        {children}
                </button>
            }
        </>
    )
}

Button.defaultProps = {
    type: 'primary',
    href: '/',
    isLink: 0,
    isDropdownButton: 0,
    disabled: 0
}

Button.propTypes = {
    onClick: PropTypes.func
}

export default Button