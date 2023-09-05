import { useEffect } from 'react'
import styles from './Toggle.module.css'

const Toggle = ({ onChange, value: activeTab }) => {

  useEffect(() => onChange(activeTab), [activeTab])
  const toggleState = (e) => onChange(e.target.value)

    return (
        <div className={`${styles.btnGroup} btn-group-toggle`} data-toggle='buttons'>
          <label htmlFor='option1' className={`btn btn-secondary ${activeTab == 'All' && styles.active}`}>
            <input className={styles.inputRadio} type='radio' value='All' name='options' id='option1' onChange={(e) => toggleState(e)}/> All
          </label>
          <div className={styles.divider}></div>
          <label htmlFor='option2' className={`btn btn-secondary ${activeTab == 'Token' && styles.active}`}>
            <input className={styles.inputRadio} type='radio' value='Token' name='options' id='option2' onChange={(e) => toggleState(e)}/> Tokens
          </label>
          <div className={styles.divider}></div>
          <label htmlFor='option3' className={`btn btn-secondary ${activeTab == 'Playlist' && styles.active}`}>
            <input className={styles.inputRadio} type='radio' value='Playlist' name='options' id='option3' onChange={(e) => toggleState(e)}/> Playlists
          </label>
      </div>
    )
}

export default Toggle
