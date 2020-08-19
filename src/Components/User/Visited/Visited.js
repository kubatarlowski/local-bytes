import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Restaurant from '../../Restaurants/Restaurant/Restaurant'
import styles from '../../Restaurants/Restaurants.module.css'
import Location from '../Location/Location'

const Visited = props => {
    const [visited, setVisited] = useState([])
    const [loading,setLoading] = useState(false)
    const [returnedRes,setReturnedRes] = useState([])

    useEffect(() => {
        let mounted = true
        if (mounted) {
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
            .catch((err) => console.log(err))
        }
    return () => mounted = false
    },[props.token])


    const cityRests = rests => {
        setReturnedRes(() => {
            return rests.map((b) => {
                const business = b['business']
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
        })
    }

    let cities = {}
    if (visited) {
        visited.forEach((b) => {
            if (b.location.city in cities){
                const busInCity = [...cities[b.location.city]]
                busInCity.push({business: b})
                cities[b.location.city] = busInCity
            } else {
                cities[b.location.city] = [{business: b}]
            }
        })
        if (Object.keys(cities).length!==0 && returnedRes.length===0){
            setReturnedRes(() => {
                return Object.keys(cities).map((city) => {
                    return <Location
                    key={city}
                    city={city}
                    restaurants={cities[city]}
                    clicked={cityRests}
                />
                })}
            )
        }
    }

    return (
        <div className={styles.Restaurants}>
            {loading ? <p>Loading ...</p> : returnedRes}
        </div>
    )
}

export default Visited;