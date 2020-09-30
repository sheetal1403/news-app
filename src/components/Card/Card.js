import React from 'react'
import styles from './Card.module.css';

function Card(props) {
    return (
        <div className={styles.Card}>
            {props.headline}
        </div>
    )
}

export default Card
