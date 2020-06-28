import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Restaurant from '../../Restaurants/Restaurant/Restaurant'
import styles from '../../Restaurants/Restaurants.module.css'

const Visited = () => {
    const [visiteds, setVisiteds] = useState([])
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        async function getVisiteds() {
            axios.get('https://local-byte.firebaseio.com/visited.json')
            .then(userVisited => {
                if (!userVisited.data) {
                    return
                }
                const visitedIdObjs = Object.keys(userVisited.data)
                const visitedIds = visitedIdObjs.map((key) => {
                    return userVisited.data[key].id
                })
                const promises = visitedIds.map(async (id) => {
                    const res = await axios.get('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/' + id, {
                        headers: {
                            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
                        }
                    });
                    return res.data;})
                Promise.all(promises).then((restaurants) => {
                    setVisiteds(restaurants) 
                })})
                setLoading(false)
                }


        if (visiteds.length===0){
            setLoading(true)
            getVisiteds();
        }
    },[visiteds])

    let returnedRes = []
    if (visiteds) {
        returnedRes = visiteds.map((business,index) => {
            return <Restaurant 
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

export default Visited;