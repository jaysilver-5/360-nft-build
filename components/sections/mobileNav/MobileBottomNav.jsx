import Button from '../../basic/button/Button'
import styles from './MobileBottomNav.module.css'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const MobileBottomNav = () => {
    const [currentSelection, setCurrentSelection] = useState(0)
    const router = useRouter()

    const url = router.asPath.split('?')[0]

    useEffect(() => {
     switch (url) {
        case '/feed':
            setCurrentSelection(0)
            break;
        case '/trending':
            setCurrentSelection(1)
            break;
        case '/explore':
            setCurrentSelection(2)
            break;
        case '/profiles/my':
            setCurrentSelection(3)
            break;
     }
    }, [url])

    return (
        <div className={`bg-image-primary ${styles.container}`}>
                <div className={`${styles.center} ${(currentSelection === 0) && styles.activeMenu}`}>
                    <Button onClick={() => {
                                                setCurrentSelection(0)
                                                router.push('/feed')
                                            }
                                    }
                            type='secondary' iconClass='icon-view-stream'>
                    </Button>   
                </div>      
                <div className={`${styles.center} ${(currentSelection === 1) && styles.activeMenu}`}>
                    <Button onClick={() => {
                            setCurrentSelection(1)
                            router.push('/trending')
                        }} type='secondary' iconClass='icon-lightning-bolt'/>
                </div>
                <div className={`${styles.center} ${(currentSelection === 2) && styles.activeMenu}`}>
                    <Button onClick={() => {
                            setCurrentSelection(2)
                            router.push('/explore')
                        }} type='secondary' iconClass='icon-explore'/>              
                </div>
                <div className={`${styles.center} ${(currentSelection === 3) && styles.activeMenu}`}>
                    <Button onClick={() => {
                            setCurrentSelection(3)
                            router.push('/profiles/my')
                        }} type='secondary' iconClass='icon-user'/>              
                </div>
        </div>
    )
}

export default MobileBottomNav
