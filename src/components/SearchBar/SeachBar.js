import React from 'react'
import SearchIcon from '@material-ui/icons/Search';
import styles from './SearchBar.module.css';

function SeachBar() {
    return (
        <div className={styles.SearchBar}>
            <form>
                <div className={styles.SearchForm}>
                    <input type="text" placeholder="Search for news" className={styles.SearchInput}/>
                    <SearchIcon className={styles.SearchIcon}/>
                </div>
                
            </form>
        </div>
    )
}

export default SeachBar
