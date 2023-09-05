import styles from './Upload.module.css'
import Label from '../../basic/label/Label'
import Textbox from '../../basic/textbox/Textbox'
import fonts from '../../../styles/Fonts.module.css'
import Button from '../..//basic/button/Button'
import { setBuyerEmail } from '../../../features/redux/common'

const CollectEmail = ( { hideModal }) => {

    return (
            <div className={styles.main}>
                
                <div className={styles.container}>
                    
                        <div>
                            <h1 className={`color-primary ${fonts.mont}`} style={{fontWeight: 300, paddingTop: '50px'}}>Email</h1>
                            <div className='hide-scroll' style={{overflow: 'auto'}}>
                                <Label>Email</Label>
                                <Textbox type='email' toDispatch={setBuyerEmail}/>
                                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                    <Button text='Go' onClick={hideModal}/>
                                </div>
                            </div>
                        </div>                        
                                     
                </div>
                
            </div>
    )
}

export default CollectEmail