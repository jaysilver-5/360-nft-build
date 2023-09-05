import dynamic from 'next/dynamic';
import Button from '../../basic/button/Button'
import styles from '../toolbox/Toolbox.module.css'
import ThemeButton from '../../basic/ThemeButton';

const Toolbox = ({ showModal, onSearch, onlySearch }) => {
    let notifs = 50
    return (
      onlySearch ?
        <div className={styles.searchContainer}>
          <input className='color-subtitle' onChange={onSearch} type='text' placeholder='Search..'/>
        </div>
        :
        <>
          <div className={styles.searchContainer}>
            <div className={`${styles.icon} icon-search`} style={{width: '24px', height:'24px'}}/>
            <input className='color-subtitle' onChange={onSearch} type='text' placeholder='Search..'/>
          </div>
          <ThemeButton marginRight='32px'/>
          <Button marginRight='32px' bg='notification' type='secondary' iconClass='icon-notifications-none'>
            <div className={styles.notificationCallout}>
              {notifs > 9 ? '9+' : notifs}
            </div>
          </Button>
          <Button text='Upload' onClick={showModal} bg='upload' iconClass='icon-plus-inverse' iconOpacity={1}/>
        </>
    )
}

export default Toolbox

// const ThemeButton = dynamic(() => import('../../basic/ThemeButton'), {
//   ssr: false,
// });
