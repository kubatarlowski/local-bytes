import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BusinessDataset from '../../Yelp_Data/sample_businesses.json'
import Restaurant from './Restaurant/Restaurant'

const Restaurants = () => {
    
    const [businesses, setBusinesses] = useState([])
    const [loading,setLoading] = useState(false)

    const getRestaurants = async () => {
        setLoading(true);
        await axios.get('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search', {
            headers: {

                Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
            
            }, params: {        
                location: 'Hicksville, NY',
                categories: 'mexican'
            },

        }).then((res) => {
            console.log(`[API KEY] ${process.env.REACT_APP_API_KEY}`)
            console.log(res.data)
            setBusinesses(res.data.businesses)
            setLoading(false)

        }).catch((err) => {
            console.log(`[API KEY ERROR] ${process.env.REACT_APP_API_KEY}`)
            console.log(err)
        })
    };

    useEffect(() => {
        setBusinesses(BusinessDataset)
        // getRestaurants();
    }, []);
          
    //rating, price, phone, categories, name
    const returnedRes = businesses.map((business) => {
        return <Restaurant 
            key={business.business_id}
            name={business.name}
            address={business.address}
            city={business.city}
            state={business.state}
            stars={business.stars}
            categories={business.categories}
            phone={business.display_phone}
            hours={business.hours}
        />
    })

    return (
        <div>
            {loading ? <p>Loading ...</p> : returnedRes}
        </div>
    )
}

export default Restaurants;