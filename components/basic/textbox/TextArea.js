import classNames from "classnames/bind"
import styles from "./Textbox.module.css"
import { useDispatch } from 'react-redux'

let cx = classNames.bind(styles);

const TextArea = ({ name, type, placeholder, toDispatch, onChange, valid, isRequired }) => {

    const dispatch = useDispatch()
    const getText = (e) => { 
        dispatch(toDispatch(e.target.value))
    }

    return (
         toDispatch ? 
            <textarea className={styles.areaBase} rows='5' name={name} type={type} placeholder={placeholder} onChange={(e) => getText(e)}/>
            :
            <textarea className={styles.areaBase} rows='5' name={name} type={type} onChange={onChange} />

    )
}

TextArea.defaultProps = {
    toDispatch: null,
}
export default TextArea
