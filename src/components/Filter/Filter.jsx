import React, { useState } from 'react'
import InputFilter from './InputFilter'
import SelectFilter from './SelectFilter'
import styles from './Filter.module.css'
import ShuffleFilter from './ShuffleFilter';

const categories = [
    {value:'social-media',label: 'Social Media'},
    {value:'video',label: 'Video'},
    {value:'work',label: 'Work'},
    {value:'pictures',label: 'Pictures'},
    {value:'music',label: 'Music'},
    {value:'projects',label: 'Projects'}
];

const sortBy = [
    {value:'desc',label: 'DESC'},
    {value:'asc',label: 'ASC'},
];

const Filter = () => {

  const [category,setCategory] = useState();
  const [sort,setSort] = useState();

  function handleChange() {
    console.log('Handle Change')
  }

  return (
    <section className={styles.filterContainer}>
        <InputFilter placeholder="Wanna find cool ideas or creative people? Search here"/>
        <SelectFilter onChange={handleChange} value={category} setValue={setCategory} options={categories} defaultOption="Category"/>
        <SelectFilter value={sort} setValue={setSort} options={sortBy} defaultOption="Sort by"/>
        <ShuffleFilter text="Randomize"/>
    </section>
  )
}

export default Filter