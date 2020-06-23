import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BusinessDataset from '../../Yelp_Data/sample_businesses.json'
import Restaurant from './Restaurant/Restaurant'
import firebase from '../../axios-restaurants';
import styles from './Restaurants.module.css'
const Restaurants = () => {
    
    const [businesses, setBusinesses] = useState([])
    const [loading,setLoading] = useState(false)

    const deleteBusiness = (index) => {
        const newBus = [...businesses];
        newBus.splice(index, 1);
        setBusinesses(newBus)
    }

    const updateVisited = (newBus,index) => {
        deleteBusiness(index)
        firebase.post('/visited.json',{id: newBus.business_id})
            .catch(err => console.log(err))
    }

    const updateVisit = (newBus,index) => {
        deleteBusiness(index)
        firebase.post('/visit.json',{id:newBus.business_id})
            .catch(err => console.log(err))
    }

    const getRestaurants = async () => {
        setLoading(true);

        let myVisit = [];
        let myVisited = [];
        await axios.get('https://local-byte.firebaseio.com/visited.json')
        .then(res => {
            const tmpVisited = Object.keys(res.data)
            const visitedIds = tmpVisited.map((key) => {
                return res.data[key].id
            })
            myVisited = [...visitedIds];
        }).catch(err => {
            console.log(err)
        })
        await axios.get('https://local-byte.firebaseio.com/visit.json')
        .then(res => {
            const tmpVisit = Object.keys(res.data)
            const visitIds = tmpVisit.map((key) => {
                return res.data[key].id
            })
            myVisit = [...visitIds];
        }).catch(err => {
            console.log(err)
        })
        if (BusinessDataset){
            const myRest = myVisit.concat(myVisited)
            const homeRest = BusinessDataset.filter( ( el ) => !myRest.includes( el.business_id ) );
            setBusinesses(homeRest)
            setLoading(false)
            return
        }
        await axios.get('https://api.yelp.com/v3/businesses/search', {
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
        getRestaurants();        
    }, []);
          
    //rating, price, phone, categories, name

    const returnedRes = businesses.map((business, index) => {
        return <Restaurant 
            visit={() => updateVisit(business,index)}
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

    return (
        <div className = {styles.Restaurants}>
            {loading ? <p>Loading ...</p> : returnedRes}
        </div>
    )
}

export default Restaurants;