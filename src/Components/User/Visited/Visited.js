import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BusinessData from '../../../Yelp_Data/sample_businesses.json';
import Restaurant from '../../Restaurants/Restaurant/Restaurant'
import styles from '../../Restaurants/Restaurants.module.css'

const Visited = () => {
    const [visiteds, setVisiteds] = useState([])
    const [loading,setLoading] = useState(true)


    // useEffect(() => {
    //     axios.get('https://local-byte.firebaseio.com/visited.json')
    //     .then(res => {
    //         const visitedIdObjs = Object.keys(res.data)
    //         const visitedIds = visitedIdObjs.map((key) => {
    //             return res.data[key].id
    //         })
    //         const tmpVisiteds = visitedIds.map((id) => {
    //             axios.get('https://api.yelp.com/v3/businesses/'+id)
    //         })
    //         setVisiteds([...tmpVisiteds]);
    //     }).catch(err => {
    //         console.log(err)
    // })}, [])

    useEffect(() => {
        axios.get('https://local-byte.firebaseio.com/visited.json')
        .then(res => {
            const visitedIdObjs = Object.keys(res.data)
            const visitedIds = visitedIdObjs.map((key) => {
                return res.data[key].id
            })
            const tmpVisiteds = visitedIds.map((id) => {
                return BusinessData.filter( ( el ) => id===( el.business_id ) )[0];
            })
            setVisiteds(tmpVisiteds)
            setLoading(false)
        })}, [])

    let returnedRes = []
    if (visiteds) {
        returnedRes = visiteds.map((business,index) => {
            return <Restaurant 
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

export default Visited;