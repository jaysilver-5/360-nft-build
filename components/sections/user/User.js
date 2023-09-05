import styles from './User.module.css'
import { useSelector } from 'react-redux'
import Button from '../../basic/button/Button'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import React from 'react'


const User = ({ getOnlyImage }) => {
    const name = useSelector(state => state.user.name || 'Account');
    const uPic = useSelector(state => state.user.upic); // Use the correct property name
    const uName = useSelector(state => state.user.uname); // Use the correct property name

    



    const showConvo = () =>{
        // document.getElementById('convo').style.display = 'block';
    }

    return (
        getOnlyImage ? 
            <div className={`bg-image-primary-inverse ${styles.avatar}`} style={{borderRadius: '50%'}}>
                <img style={{borderRadius: '50%'}} className={styles.avatar} src={uPic}/>
            </div>
            :
            <div className={styles.userContainer}>
                <img className={styles.avatar} src={uPic}/>
                <div className={styles.avatarTextContainer}>
                    <p className={styles.name}>{name}</p>
                    <p className={styles.username}>0x{uName}</p>
                </div>
                <DropdownButton id='dropDownUser' title='' className={styles.dropdownToggle}>
                        <Button isDropdownButton={1} text='Messages' type='secondary'/>
                        <Button isDropdownButton={1} text='Account' type='secondary'/>
                        <Button isDropdownButton={1} text='Settings' type='secondary'/>
                        <Button isDropdownButton={1} text='Logout' isLink={1} href='/accounts/signout' type='secondary'/>
                </DropdownButton>                                                                               
                {/* <iframe id='convo' title='chat' src='https://theconvo.space/embed/dt?url=http%3A%2F%2Ftrapchain.herokuapp.com%2F&threadId=MW00087000001Y' allowtransparency='true' width='100%' height='600px' style={{border: 'none', display: 'none'}}>
                    Comments
                </iframe> */}
            </div>
    )
}

export default User
