import React from 'react'
import styles from './Card.module.css';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

function Card(props) {

    let icon = <FavoriteBorderIcon/>
    if(props.fav){
        icon = <FavoriteIcon/>
    }

    return (
        <div className={styles.Card}>
            
                <h3 className={styles.CardHeader}>
                    {props.headline}
                </h3>
            
                <span onClick={() => props.clicked(props.fav)} className={styles.Icon}>
                    {icon}
                </span>
            
            
        </div>
    )
}

export default Card
