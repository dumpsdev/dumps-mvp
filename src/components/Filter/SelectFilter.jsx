import React from 'react'
import styles from './Filter.module.css'

const SelectFilter = ({options,value,setValue,defaultOption,...props}) => {
  return (
    <div className={styles.selectContainer}>
      <select value={value} className={styles.select} {...props}>
        <option value="">{defaultOption}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value} onChange={({currentTarget}) => setValue(currentTarget.value)}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectFilter