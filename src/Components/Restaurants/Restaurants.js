import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import Restaurant from './Restaurant/Restaurant'
import styles from './Restaurants.module.css'
import Autocomplete from 'react-google-autocomplete'
import Categories from '../Categories/Categories'

const Restaurants = props => {
    
    const [businesses, setBusinesses] = useState([])
    const [loading,setLoading] = useState(false)
    const [searchLocation, setSearchLocation] = useState(null)
    const [categories, setCategories] = useState([])
    const [userPlaces, setUserPlaces] = useState(new Set())

    const deleteBusiness = (index) => {
        const newBus = [...businesses];
        newBus.splice(index, 1);
        setBusinesses(newBus)
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
        .catch(err => console.log(err))
    }

    const updateVisit = (newBus,index) => {
        deleteBusiness(index)
        axios.post("https://local-bytes-api.herokuapp.com/visit/add",{
            userId: props.userId,
            businessID: newBus.id
        },{
            headers: {
                Authorization: 'Bearer ' + props.token
            }
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        async function getRestaurants() {
            await axios.get("https://local-bytes-api.herokuapp.com/visit/all",{
                headers: {
                    Authorization: 'Bearer ' + props.token
                }
            })
            .then(userVisits => {
                if (userVisits.data.restaurants.length > 0) {
                    userVisits.data.restaurants.forEach( el => {
                        setUserPlaces(prev => new Set([...prev,el.id]))
                    })
                }
            })
            .catch((err) => console.log(err))
            await axios.get("https://local-bytes-api.herokuapp.com/visited/all",{
                headers: {
                    Authorization: 'Bearer ' + props.token
                }
            })
            .then(userVisited => {
                if (userVisited.data.restaurants.length > 0) {
                    userVisited.data.restaurants.forEach( el => {
                        setUserPlaces(prev => new Set([...prev,el.id]))
                    })
                }
            })
            .catch((err) => console.log(err))
            await axios.get("https://local-bytes-api.herokuapp.com/restaurants/search", {
                params: {        
                    location: searchLocation,
                    categories: categories.join(',')
                },
                headers: {
                    Authorization: 'Bearer ' + props.token
                }
            }).then((res) => {
                setLoading(false)
                setBusinesses(res.data.businesses)
            }).catch((err) => {
                console.log(err)
            })
        }
        if (searchLocation){
            setLoading(true)
            getRestaurants()
        }
 
    }, [searchLocation,categories,props.token]);
    
    const returnedRes = businesses.map((business, index) => {
        if (!userPlaces.has(business.id)){
            return <Restaurant 
                visit={() => updateVisit(business,index)}
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
        } else return null})

    function categorySelected(category, selected) {
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

    const possibleCat = ['mexican', 'chinese', 'indian', 'burgers', 
        'pizza', 'thai', 'japanese', 'mediterranean', 'mideastern',
        'breakfast_brunch','brazilian','cafes','caribbean','creperies',
        'delis','diners','latin','noodles','sandwiches','polish',
        'portuguese','seafood','soulfood','steak','sushi','vegetarian',
        'waffles','wraps']

    return (
        <Fragment>
            <Autocomplete
            onPlaceSelected={(place) => setSearchLocation(place.formatted_address)}
            className={styles.Search}/>
            <header style={{textAlign: 'left', fontSize: 'large', marginLeft: '3%'}}>Categories</header>
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