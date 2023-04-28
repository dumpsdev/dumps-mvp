import React from 'react'
import styles from './Filter.module.css'

const SelectFilter = ({options,value,setValue,defaultOption,...props}) => {
  return (
    <div className={styles.selectContainer}>
      <select value={value} className={styles.select} onChange={({currentTarget}) => {
        setValue(currentTarget.value);
      }} {...props}>
        <option value="">{defaultOption}</option>
        {options && options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectFilter