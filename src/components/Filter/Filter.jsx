import React, { useEffect, useState } from 'react'
import InputFilter from './InputFilter'
import SelectFilter from './SelectFilter'
import styles from './Filter.module.css'
import ShuffleFilter from './ShuffleFilter';
import { categories } from '../../data/categories';

const sortBy = [
    {value:'desc',label: 'Latest'},
    {value:'asc',label: 'Older'},
];

const Filter = ({ideaSearch,setIdeaSearch,handleSearch,handleFilterCategory,handleFilterSort,category,sort,setCategory,setSort,handleShuffle}) => {

  return (
    <section className={styles.filterContainer}>
        <InputFilter type="text" onClick={handleSearch} value={ideaSearch} setValue={setIdeaSearch} name="idea-search" set placeholder="Wanna find cool ideas or creative people? Search here"/>
        <SelectFilter value={category} setValue={setCategory} options={categories} defaultOption="Category"/>
        <SelectFilter value={sort} setValue={setSort} options={sortBy} defaultOption="Sort by"/>
        <ShuffleFilter onClick={handleShuffle} text="Randomize"/>
    </section>
  )
}

export default Filter