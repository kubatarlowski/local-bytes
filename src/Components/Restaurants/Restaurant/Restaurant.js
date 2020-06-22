import React from 'react';
import styles from './Restaurant.module.css';

const restaurant = props => {          

    let hours = null
    if (props.hours) {
        hours = Object.keys(props.hours).map((day) => {
            return <p key={day}>{day}: {props.hours[day]}</p>
        })
    }
    return (
        <div className={styles.Restaurant}>
            <p>{props.name}</p>
            <p>{props.address}, {props.city}</p>
            <p>{props.stars}</p>
            <p>{props.categories}</p>
            <p>{props.phone}</p>
            {hours}
        </div>
    )
}

export default restaurant;