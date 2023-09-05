import Foot from '../foot/Foot'
import styles from './RAccountsCol.module.css'

const RAccountsCol = ({children}) => {
    return (
        <div className={`col-sm-8 ${styles.columnContainer}`}>
            <div className={styles.columnChild}>
                {children}
            </div>
            <Foot/>
        </div>
    )
}

export default RAccountsCol
