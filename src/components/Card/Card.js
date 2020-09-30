import React from 'react'
import styles from './Card.module.css';

function Card(props) {
    return (
        <div className={styles.Card}>
            <div>
                {props.headline}
            </div>

            <button onClick={props.clicked}>Add to favorites</button>
            

        </div>
    )
}

export default Card
