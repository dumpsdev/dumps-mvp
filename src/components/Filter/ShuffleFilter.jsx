import React from 'react'
import { FaRandom } from 'react-icons/fa';
import styles from './Filter.module.css'

const ShuffleFilter = ({text,onClick}) => {
  return (
    <button onClick={onClick} className={styles.shuffleFilter}>
        {text}
        <FaRandom/>
    </button>
  )
}

export default ShuffleFilter