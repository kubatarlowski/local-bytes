import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Restaurant from '../../Restaurants/Restaurant/Restaurant'
import styles from '../../Restaurants/Restaurants.module.css'

const Visit = props => {
    const [visits, setVisits] = useState([])
    const [loading,setLoading] = useState(false)

    const deleteBusiness = (index) => {
        const newBus = [...visits];
        newBus.splice(index, 1);
        setVisits(newBus)
    }

    const updateVisited = (newBus,index) => {
        deleteBusiness(index)
        axios.post("http://localhost:5000/visited/add",{
            userId: props.userId,
            businessID: newBus.id
        },{
            headers: {
                Authorization: 'Bearer ' + props.token
            }
        })
        .then(_res => {
            axios.post("http://localhost:5000/visit/delete",{
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
        setLoading(true)
        axios.get("http://localhost:5000/visit/all",{
            headers: {
                Authorization: 'Bearer ' + props.token
            }
        })
        .then(userVisits => {
            if (userVisits.data.restaurants.length > 0) {
                setVisits(userVisits.data.restaurants)
            }
            setLoading(false)
        })
        .catch((err) => console.log(err))}
    ,[props.token])

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