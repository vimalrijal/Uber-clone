import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import MapView,{ Marker }from 'react-native-maps';
import tw from 'tailwind-react-native-classnames';
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slice/navSlice';
import { Button } from 'react-native-elements';

import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_APIKEY} from "@env"

const Map = () => {

    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapref = useRef(null);
    const dispatch = useDispatch()

    // this hooks runs when ever the cpmponent rerender ( in this case this will run whenever the origin and destination )
    useEffect(()=>{
        if(!origin || !destination) return;

        //zoom and fit marker 
        mapref.current.fitToSuppliedMarkers(['origin', 'destination'],{
            edgePadding:{ top: 50, right: 50, left: 50, bottom: 50 },
        })
    },[origin, destination])

    useEffect( () => {
        // this is where we are calculating the time travell time 

        if(!origin || !destination) return;
        const getTravellTime = async () => {
            fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`)
                .then( (res) => res.json())
                .then((data) => {
                    
                    dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
                });
        };
        getTravellTime();

    },[origin, destination, GOOGLE_MAPS_APIKEY])

  return (
    
      
        <MapView
            ref={mapref}
            style={tw`flex-1`}
            mapType="standard"
            initialRegion={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        }}>

        {origin?.location && 
            <Marker 
                coordinate={{
                    latitude: origin.location.lat,
                    longitude: origin.location.lng,
                }}
                title="origin"
                description={origin.description}
                identifier="origin"
                
            />        
            
        }

        {destination?.location && 
                    <Marker 
                        coordinate={{
                            latitude: destination.location.lat,
                            longitude: destination.location.lng,
                        }}
                        title="destination"
                        description={origin.description}
                        identifier="destination"
                        
                    />  
        }

        {origin && destination && (
            <MapViewDirections
                origin= {origin.description}
                destination= {destination.description}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                strokeColor="black"
            />
        ) }
     </MapView>
     
     
     
    
  )
}

export default Map

const styles = StyleSheet.create({})