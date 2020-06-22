import React from 'react';
import styles from './Restaurant.module.css';
import Ratings from 'react-ratings-declarative';
import icon from '../../../assets/images/food.png'

const restaurant = props => {          

    let hours = null
    if (props.hours) {
        hours = Object.keys(props.hours).map((day) => {
            return <p key={day}>{day}: {props.hours[day]}</p>
        })
    }
    
    let address = props.address;
    if (address) {
        address=address+','
    }
    return (
        <div 
            className={styles.Restaurant}>
            <img className={styles.FoodImage} src={icon} alt={'Food Image'}/>
            <p><strong style={{fontSize:'15px'}}>{props.name}</strong></p>
            <p>{address} {props.city}</p>
            <Ratings 
                rating={props.stars}
                widgetRatedColors="red">
                <Ratings.Widget
                    widgetDimension="12px"
                    widgetSpacing="2x"/>
                <Ratings.Widget
                    widgetDimension="12px"
                    widgetSpacing="2px"/>
                <Ratings.Widget
                    widgetDimension="12px"
                    widgetSpacing="2px"/> 
                <Ratings.Widget
                    widgetDimension="12px"
                    widgetSpacing="2px"/>
                <Ratings.Widget
                    widgetDimension="12px"
                    widgetSpacing="2px"/>                               
            </Ratings>
            <p style={{color: 'grey'}}>{props.categories}</p>
            <p>{props.phone}</p>
            {/* {hours} */}
            <button 
                className={styles.Button}
                onClick={props.visit}>Visit</button>
            <button 
                className={styles.Button}
                onClick={props.visited}>Visited</button>
        </div>
    )
}

export default restaurant;