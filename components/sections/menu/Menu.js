import Button from '../../basic/button/Button'
import { Accordion } from 'react-bootstrap'
import fonts from '../../../styles/Fonts.module.css'
import styles from './Menu.module.css'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const Menu = () => {

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
        <div className={fonts.mont}>
            <Accordion defaultActiveKey='0' flush>
                <Accordion.Item eventKey='0'>
                  <Accordion.Header><h4 className={styles.Header}>Discover</h4></Accordion.Header>
                  <Accordion.Body>
                    <ul  id='menuList' className={styles.ul}>
                          <li className={`${styles.menuItem} ${(currentSelection === 0) && styles.activeMenu}`}>
                              <Button onClick={() => {
                                        setCurrentSelection(0)
                                        router.push('/feed')
                                    }} type='tertiary' iconOpacity={1} text={<span style={{fontWeight: 600}}>Feed</span>} iconClass='icon-view-stream'/>
                          </li> 
                          <li className={`${styles.menuItem} ${(currentSelection === 1) && styles.activeMenu}`}>
                              <Button onClick={() => {
                                        setCurrentSelection(1)
                                        router.push('/trending')
                                    }} type='tertiary' iconOpacity={1} text={<span style={{fontWeight: 600}}>Trending</span>} iconClass='icon-lightning-bolt'/>
                          </li>
                          <li className={`${styles.menuItem} ${(currentSelection === 2) && styles.activeMenu}`}>
                              <Button onClick={() => {
                                        setCurrentSelection(2)
                                        router.push('/explore')
                                    }} type='tertiary' iconOpacity={1} text={<span style={{fontWeight: 600}}>Explore</span>} iconClass='icon-explore'/>              
                          </li>
                          <li className={`${styles.menuItem} ${(currentSelection === 3) && styles.activeMenu}`}>
                              <Button onClick={() => {
                                        setCurrentSelection(3)
                                        router.push('/profiles/my')
                                    }} type='tertiary' iconOpacity={1} text={<span style={{fontWeight: 600}}>Profile</span>} iconClass='icon-user'/>              
                          </li>
                    </ul>
                </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='1'>
                  <Accordion.Header><h4 className={styles.Header}>Library</h4></Accordion.Header>
                  <Accordion.Body>
                    <ul className={styles.ul}>
                      <li className={styles.menuItem}>
                          <Button type='tertiary' iconOpacity={1} text={<span style={{fontWeight: 600}}>Favorites</span>} iconClass='icon-favorite-border'/>              
                      </li>
                      <li className={styles.menuItem}>
                          <Button type='tertiary' iconOpacity={1} text={<span style={{fontWeight: 600}}>History</span>} iconClass='icon-history'/>              
                      </li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='2'>
                  <Accordion.Header><h4 className={styles.Header}>Playlists</h4></Accordion.Header>
                  <Accordion.Body>
                  <Button type='tertiary' iconOpacity={1} text={<span className='color-subtitle' style={{fontWeight: 600}}>Create your first playlist!</span>} iconClass='icon-plus'/>              
                  <ul>
                  </ul>
                  </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}

export default Menu
