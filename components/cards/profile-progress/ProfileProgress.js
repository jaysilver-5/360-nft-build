import Button from "../../basic/button/Button"
import styles from './ProfileProgress.module.css'
import fonts from '../../../styles/Fonts.module.css'


const ProfileProgress = ({ done }) => {
    return (
        <>
            <div className={`w-full  ${styles.card} ${styles.completeProfileCard} ${fonts.mont}`} style={{fontWeight: 600}}>
                <div style={{width: '100%'}}>
                    <div className={styles.progressBar}>
                        <span className={styles.progressBarFill} style={{width: done + '%'}}>{done}% {done>70 && "Complete"}</span>
                    </div>
                </div>
                <div>
                    <p className={styles.completeText}>Complete your profile</p>
                    <Button bg="greenToPurple" spread='gradient' isLink={1} href='/profiles/my' iconClass='icon-arrow-right'/>
                </div>
            </div>

        </>
    )
}

ProfileProgress.defaultProps = {
    done: '0',
}

export default ProfileProgress
