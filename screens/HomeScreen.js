import { StyleSheet, Text, View, SafeAreaView, Image} from 'react-native'
import React from 'react'

import tw from 'tailwind-react-native-classnames';
import Navoptions from '../components/Navoptions';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from "@env"
import { useDispatch } from 'react-redux';

import { setDestination, setOrigin } from '../slice/navSlice';
import NavFavourities from '../components/NavFavourities';
 

 const HomeScreen = () => {

    const dispatch = useDispatch()

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
        <View style={ tw`px-5`}>
            <Image 
                style={{
                    width:100,
                    height:100,
                    resizeMode:'contain'
                }}
                source={{
                    uri: "https://links.papareact.com/gzs"
                }}
            />  
            <GooglePlacesAutocomplete
                styles={{
                    container:{
                        flex:0,

                    },
                    textInput:{
                        fontSize:18,
                    }
                }}
                placeholder='Where From?'
                query={{
                    key:GOOGLE_MAPS_APIKEY,
                    language:'en',
                }}
                enablePoweredByContainer={false}
                minLength={2}   
                nearbyPlacesAPI="GooglePlacesSearch"
                debounce={400}
                returnKeyType={"search"}
                fetchDetails={true}
                onPress={(data, details = null ) => {
                    
                   dispatch(setOrigin({
                    location: details.geometry.location,
                    description: data.description
                   }))
                   dispatch(setDestination(null))
                }}

            />   
        <Navoptions/>
        <NavFavourities/>
        </View>
           
     </SafeAreaView>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({})