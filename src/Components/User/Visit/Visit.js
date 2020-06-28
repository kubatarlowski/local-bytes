import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Restaurant from '../../Restaurants/Restaurant/Restaurant'
import firebase from '../../../axios-restaurants';
import styles from '../../Restaurants/Restaurants.module.css'

const Visit = () => {
    const [visits, setVisits] = useState([])
    const [loading,setLoading] = useState(false)

    const deleteBusiness = (index) => {
        const newBus = [...visits];
        newBus.splice(index, 1);
        setVisits(newBus)
    }

    const updateVisited = (newBus,index) => {
        deleteBusiness(index)
        firebase.post('/visited.json',{id: newBus.id})
            .catch(err => console.log(err))
    }

    useEffect(() => {
        async function getVisits() {
            axios.get('https://local-byte.firebaseio.com/visit.json')
            .then(userVisit => {
                const visitIdObjs = Object.keys(userVisit.data)
                const visitIds = visitIdObjs.map((key) => {
                    return userVisit.data[key].id
                })
                const promises = visitIds.map(async (id) => {
                    const res = await axios.get('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/' + id, {
                        headers: {
                            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
                        }
                    });
                    return res.data;})
                Promise.all(promises).then((restaurants) => {
                    setVisits(restaurants) 
                })})
                setLoading(false)
                }


        if (visits.length===0){
            setLoading(true)
            getVisits();
        }
    },[visits])

    let returnedRes = []
    if (visits) {
        returnedRes = visits.map((business,index) => {
            return <Restaurant 
            visited={() => updateVisited(business,index)}
            key={business.id}
            name={business.name}
            address={business.location.address1}
            city={business.location.city}
            state={business.location.state}
            stars={business.rating}
            categories={business.categories}
            phone={business.display_phone}
            pic={business.image_url}
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