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
            <div>
                {props.headline}
            </div>
            <div onClick={props.clicked}>
                {icon}
            </div>
            
            
            

        </div>
    )
}

export default Card
