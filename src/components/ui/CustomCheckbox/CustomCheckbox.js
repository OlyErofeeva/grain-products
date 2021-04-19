import styles from './CustomCheckbox.module.scss'
import { useState } from 'react'
import * as uuid from 'uuid'

const CustomCheckbox = ({ labelText = '', classNameExt = '', isChecked, onChange }) => {
  const [checkboxId] = useState(uuid.v4())

  return (
    <label className={`${styles.label} ${classNameExt}`} htmlFor={checkboxId} onClick={onChange}>
      <input className={styles.checkboxHidden} type="checkbox" />

      <svg className={styles.checkboxVisible} id={checkboxId} width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect className={styles.box} x="0.5" y="0.5" width="19" height="19" rx="3.5" />

        {isChecked && (
          <path
            className={styles.check_accent}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.96826 13.4452L4.13989 10.6169L5.55411 9.20266L8.38248 12.031L15.4535 4.95996L16.8678 6.37417L9.79669 13.4452L9.79675 13.4453L8.38253 14.8595L8.38248 14.8595L6.96826 13.4452Z"
          />
        )}
      </svg>
      {labelText}
    </label>
  )
}

export default CustomCheckbox
