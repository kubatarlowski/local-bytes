import React from 'react';
import styles from './Restaurant.module.css';
import Ratings from 'react-ratings-declarative';
import icon from '../../../assets/images/food.png'

const restaurant = props => {          

    let address = props.address;
    if (address) {
        address=address+','
    }

    return (
        <div 
            className={styles.Restaurant}>
            <img className={styles.FoodImage} src={icon} alt=''/>
            <p><strong style={{fontSize:'15 px'}}>{props.name}</strong></p>
            <p>{address} {props.city} {props.state}</p>
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
            {props.visit ?
            <button 
                className={styles.Button}
                onClick={props.visit}>Visit</button> : null}
            {props.visited ?
            <button 
                className={styles.Button}
                onClick={props.visited}>Visited</button> : null}
        </div>
    )
}

export default restaurant;