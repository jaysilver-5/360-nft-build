import { useRouter } from 'next/router'
import Button from '../../basic/button/Button'
import styles from './Suggestions.module.css'

const Suggestions = ({items, hasSubscribeButton}) => {
    const router = useRouter()

    return (
        <div className={styles.waveContainer}>
            <ul className={styles.wavemakerSection}>
                {items.map((item) => (
                    <li key={item.id} className={styles.wavemakerItem}>
                        <img className={styles.trackArt} src={item.image}/>
                        <div className={styles.wavemakerItemTextContainer}>
                            <p className={styles.trackTitle}>{item.name}{ item.feat && <span className={styles.trackFeature}>{item.feat}</span>}</p>
                            <p className={styles.trackArtist}>{item.subtitle}</p>
                        </div>
                        {hasSubscribeButton ? 
                            <Button text='Subscribe' bg='sub' onClick={() => {
                                console.log('clicked', item.subscribeLink);
                                if (item.subscribeLink){
                                    router.push(item.subscribeLink)
                                }
                            }}/> : 
                            <Button type='secondary' iconOpacity={1} iconClass='icon-kebab-horizontal'/>
                        }
                    </li>
                ))}                
            </ul>
        </div>
    )
}

export default Suggestions
