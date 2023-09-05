import classNames from "classnames/bind"
import styles from "./Label.module.css"

let cx = classNames.bind(styles);

const Label = ( {children} ) => {
    const main = cx ({
        base: true,
    })

    return (
        <label className={main}>{children}</label>
    )
}

export default Label
