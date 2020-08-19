import React from 'react';
import styles from './Location.module.css';

const location = ( props ) => {

    let names = props.restaurants.map(res => {
        return res['business'].name
    })

    if (names.length > 3) {
        names = names.splice(0,3)
        names = names.join(', ')
        names = names.concat('...')
    } else {
        names = names.join(', ')
    }

    return (
        <div 
            className={styles.Location}
            onClick={() => props.clicked(props.restaurants)}>
            <p><strong>{props.city}</strong></p>
            <p style={{fontSize: 'small',color: 'grey'}}>{names}</p>
        </div>
    )
};

export default location;