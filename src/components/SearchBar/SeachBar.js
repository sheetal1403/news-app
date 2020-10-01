import React, { useRef } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import styles from './SearchBar.module.css';

function SeachBar(props) {

    const ref = useRef();

    return (
        <div className={styles.SearchBar}>
            <form onSubmit={(e) => props.submit(e, ref.current.value)}>
                <div className={styles.SearchForm}>
                    <input type="text" placeholder="Search for news" className={styles.SearchInput} ref={ref}/>
                    <SearchIcon className={styles.SearchIcon} onClick={(e) => props.submit(e, ref.current.value)}/>
                </div>
                
            </form>
        </div>
    )
}

export default SeachBar
