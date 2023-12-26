import classNames from "classnames/bind"
import styles from "./Label.module.css"

let cx = classNames.bind(styles);

const Label = ( {children} ) => {
    // const main = cx ({
    //     base: true,
    // })

    return (
        <label className='h-4 mt-4 mb-1 font-montserrat text-xs font-medium leading-4 text-subtitle transition-colors duration-300 ease-in-out'>{children}</label>
    )
}

export default Label
