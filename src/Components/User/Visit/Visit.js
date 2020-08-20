import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Restaurant from '../../Restaurants/Restaurant/Restaurant'
import styles from '../../Restaurants/Restaurants.module.css'
import Location from '../Location/Location'

const Visit = props => {
    const [visits, setVisits] = useState([])
    const [loading,setLoading] = useState(false)
    const [returnedRes,setReturnedRes] = useState([])

    const deleteBusiness = (index) => {
        const newBus = [...visits];
        console.log(visits)
        setVisits(newBus)
    }

    const updateVisited = (newBus,index) => {
        deleteBusiness(index)
        axios.post("https://local-bytes-api.herokuapp.com/visited/add",{
            userId: props.userId,
            businessID: newBus.id
        },{
            headers: {
                Authorization: 'Bearer ' + props.token
            }
        })
        .then(_res => {
            axios.post("https://local-bytes-api.herokuapp.com/visit/delete",{
                userId: props.userId,
                businessID: newBus.id
            },{
                headers: {
                    Authorization: 'Bearer ' + props.token
                }
            })
        })
        .catch(err => console.log(err))
    }
    useEffect(() => {
        let mounted = true
        if (mounted) {
            setLoading(true)
            axios.get("https://local-bytes-api.herokuapp.com/visit/all",{
                headers: {
                    Authorization: 'Bearer ' + props.token
                }
            })
            .then(userVisit => {
                if (userVisit.data.restaurants.length > 0) {
                    setVisits(userVisit.data.restaurants)
                }
                setLoading(false)
            })
            .catch((err) => console.log(err))
        }
    return () => mounted = false
    },[props.token])

    const cityRests = rests => {
        setReturnedRes(() => {
            return rests.map((business) => {
                const bus = business['business']
                const ind = business['index']
                return <Restaurant 
                    visited={() => updateVisited(bus,ind)}
                    key={bus.id}
                    name={bus.name}
                    address={bus.location.address1}
                    city={bus.location.city}
                    state={bus.location.state}
                    stars={bus.rating}
                    categories={bus.categories}
                    phone={bus.display_phone}
                    pic={bus.image_url}
                />
            })
        })
    }

    let cities = {}
    if (visits) {
        visits.forEach((b, i) => {
            if (b.location.city in cities){
                const busInCity = [...cities[b.location.city]]
                busInCity.push({business: b, index: i})
                cities[b.location.city] = busInCity
            } else {
                cities[b.location.city] = [{business: b, index: i}]
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

export default Visit;