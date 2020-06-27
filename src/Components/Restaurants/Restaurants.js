import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import Restaurant from './Restaurant/Restaurant'
import firebase from '../../axios-restaurants';
import styles from './Restaurants.module.css'
import Autocomplete from 'react-google-autocomplete'
import Categories from '../Categories/Categories'

const Restaurants = () => {
    
    const [businesses, setBusinesses] = useState([])
    const [loading,setLoading] = useState(true)
    const [searchLocation, setSearchLocation] = useState(null)
    const [categories, setCategories] = useState([])
    const [categoryIndex, setCategoryIndex] = useState({})

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


    useEffect(() => {
        console.log(categories)
        async function getRestaurants() {
            await axios.get("https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search", {
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
                }, params: {        
                    location: searchLocation,
                    categories: categories.join(',')
                }, 
    
            }).then((res) => {
                setLoading(false)
                setBusinesses(res.data.businesses)
    
            }).catch((err) => {
                console.log(err)
            })
        }
        if (searchLocation){
            getRestaurants()
        }
 
    }, [searchLocation,categories]);
          
    //rating, price, phone, categories, name

    const returnedRes = businesses.map((business, index) => {
        return <Restaurant 
            visit={() => updateVisit(business,index)}
            visited={() => updateVisited(business,index)}
            key={business.id}
            name={business.name}
            address={business.location.address1}
            city={business.location.city}
            state={business.location.state}
            stars={business.rating}
            // categories={business.categories}
            phone={business.display_phone}
        />
    })

    function categorySelected(category, selected) {
        console.log(category, selected)
        if (selected) {
            const oldSelected = [...categories]
            oldSelected.push(category)
            setCategories(oldSelected)
        } else {
            const newSelected = categories.filter((el) => {
                return category!==el
            })
            setCategories(newSelected)
        }
    }

    const possibleCat = ['mexican', 'chinese', 'indian', 'burgers']

    return (
        <Fragment>
            <Autocomplete
            onPlaceSelected={(place) => setSearchLocation(place.formatted_address)}
            className={styles.Search}/>
            <Categories
                categories={possibleCat}
                checked={categorySelected}/>
            <div className = {styles.Restaurants}
                style={{marginTop:'5px'}}>
                {loading ? <p>Loading ...</p> : returnedRes}
            </div>
        </Fragment>
    )
}

export default Restaurants;