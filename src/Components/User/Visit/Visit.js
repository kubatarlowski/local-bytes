import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BusinessData from '../../../Yelp_Data/sample_businesses.json';
import Restaurant from '../../Restaurants/Restaurant/Restaurant'
import firebase from '../../../axios-restaurants';
import styles from '../../Restaurants/Restaurants.module.css'

const Visit = () => {
    const [visits, setVisits] = useState([])
    const [loading,setLoading] = useState(false)


    // useEffect(() => {
    //     axios.get('https://local-byte.firebaseio.com/visit.json')
    //     .then(res => {
    //         const visitIdObjs = Object.keys(res.data)
    //         const visitIds = visitIdObjs.map((key) => {
    //             return res.data[key].id
    //         })
    //         const tmpVisits = visitIds.map((id) => {
    //             axios.get('https://api.yelp.com/v3/businesses/'+id)
    //         })
    //         setVisits([...tmpVisits]);
    //     }).catch(err => {
    //         console.log(err)
    // })}, [])

    const deleteBusiness = (index) => {
        const newBus = [...visits];
        newBus.splice(index, 1);
        setVisits(newBus)
    }

    const updateVisited = (newBus,index) => {
        deleteBusiness(index)
        firebase.post('/visited.json',{id: newBus.business_id})
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setLoading(true)
        axios.get('https://local-byte.firebaseio.com/visit.json')
        .then(res => {
            const visitIdObjs = Object.keys(res.data)
            const visitIds = visitIdObjs.map((key) => {
                return res.data[key].id
            })
            const tmpVisits = visitIds.map((id) => {
                return BusinessData.filter( ( el ) => id===( el.business_id ) )[0];
            })
            setVisits(tmpVisits)
            setLoading(false)
        })}, [])

    let returnedRes = []
    if (visits) {
        returnedRes = visits.map((business,index) => {
            return <Restaurant 
                visited={() => updateVisited(business,index)}
                key={business.business_id}
                name={business.name}
                address={business.address}
                city={business.city}
                stars={business.stars}
                categories={business.categories}
                phone={business.display_phone}
                hours={business.hours}
            />
        })
    }

    return (
        <div className={styles.Restaurants}>
            {loading ? <p>Loading ...</p> : returnedRes}
        </div>
    )
}

export default Visit;