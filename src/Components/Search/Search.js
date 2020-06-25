import Autocomplete from 'react-google-autocomplete';
import React, { useState } from 'react';

const Search = props => {
    /**
     * When the user types an address in the search box
     * @param place
     */

    // const [location, setLocation] = useState({
    //     address: '',
    //     area: '',
    //     city: '',
    //     state: '',
    //     markerPosition: {
    //         lat: '',
    //         lng: '' 
    //     },
    //     mapPosition: {
    //         lat: '',
    //         lng: ''
    //     },
    // })

    // const onPlaceSelected = place => {
        // const address = place.formatted_address;
        // const addressArray =  place.address_components;
        // const city = this.getCity( addressArray );
        // const area = this.getArea( addressArray );
        // const state = this.getState( addressArray );
        // const latValue = place.geometry.location.lat();
        // const lngValue = place.geometry.location.lng();
      
        // // Set these values in the state.
        // setLocation({
        //     address: ( address ) ? address : '',
        //     area: ( area ) ? area : '',
        //     city: ( city ) ? city : '',
        //     state: ( state ) ? state : '',
        //     markerPosition: {
        //         lat: latValue,
        //         lng: lngValue 
        //     },
        //     mapPosition: {
        //         lat: latValue,
        //         lng: lngValue
        //     },
        // })
    // };

   return (
       <div>
        <Autocomplete
          style={{
           width: '20%',
           height: '40px',
           paddingLeft: '16px',
           marginTop: '82px',
          }}
          onPlaceSelected={props.location}/>
          </div>
    )
}

export default Search;