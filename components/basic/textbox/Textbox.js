import classNames from "classnames/bind"
import styles from "./Textbox.module.css"
import { useDispatch } from 'react-redux'

let cx = classNames.bind(styles);

const Textbox = ({ name, type, placeholder, toDispatch, onChange, valid, isRequired }) => {

    const main = cx ({
        base: true,
    })

    const dispatch = useDispatch()
    const getText = (e) => { 
        dispatch(toDispatch( e.target.value))
    }

    return (
         toDispatch ? 
            <input className={main} name={name} type={type} placeholder={placeholder} onChange={(e) => getText(e)}/>
            :
            <input className={main} name={name} type={type} onChange={onChange} />

    )
}

Textbox.defaultProps = {
    toDispatch: null,
}
export default Textbox
