import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Restaurant from '../../Restaurants/Restaurant/Restaurant'
import styles from '../../Restaurants/Restaurants.module.css'

const Visited = props => {
    const [visited, setVisited] = useState([])
    const [loading,setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)
        axios.get("http://localhost:5000/visited/all",{
            headers: {
                Authorization: 'Bearer ' + props.token
            }
        })
        .then(userVisited => {
            if (userVisited.data.restaurants.length > 0) {
                setVisited(userVisited.data.restaurants)
            }
            setLoading(false)
        })
        .catch((err) => console.log(err))}
    ,[props.token])

    let returnedRes = []
    if (visited) {
        returnedRes = visited.map((business) => {
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