import { Keyboard, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'tailwind-react-native-classnames'

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import {GOOGLE_MAPS_APIKEY} from "@env"
import { useDispatch } from 'react-redux'

import { setDestination } from '../slice/navSlice'
import { useNavigation } from '@react-navigation/native'
import RideOptionsCard from './RideOptionsCard'
import NavFavourities from './NavFavourities'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Icon } from 'react-native-elements'


const NavigateCard = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();


  return (
    <SafeAreaView 
        style={tw`bg-white flex-1`}
    >
        <Text style={tw`text-center py-5 text-xl`}>Good morninng, Vimal Rijal</Text>

        <View style={tw`border-t border-gray-200 flex-shrink`}>
            <View>
                <GooglePlacesAutocomplete
                    placeholder='where to?'
                    debounce={400}
                    styles={toInputBoxStyle}
                    fetchDetails={true}
                    enablePoweredByContainer={false}
                    nearbyPlacesAPI="GooglePlacesSearchs"
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language:'en'
                    }}
                    onPress={(data, details=0) => {
                        dispatch(setDestination({
                            location: details.geometry.location,
                            description: data.description
                        }))
                        
                        navigation.navigate(RideOptionsCard)
                    }}
                />
            </View>
            <NavFavourities/>
        </View>
        <View style={tw`flex-row bg-white justify-evenly py-2 m-auto border-t border-gray-100`}>
            <TouchableOpacity 
                style={tw`flex flex-row justify-between bg-black w-24 p-4 py-3 rounded-full`}
                onPress={()=> navigation.navigate('RideOptionsCard')}
            >
                <Icon name="car" type="font-awesome" color="white" size={16} />
                <Text style={tw`text-white text-center`}>Rides</Text>
            </TouchableOpacity>

            <TouchableOpacity style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}>
                <Icon name="fast-food-outline" type="ionicon" color="black" size={16} />
                <Text style={tw`text-white text-center text-black`}>Eats</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default NavigateCard

const toInputBoxStyle = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingTop: 20,
        flex: 0
    },
    textInput: {
        backgroundColor: "#DDDDDF",
        borderRadius: 0,
        fontSize: 18
    },
    textInputContainer: {
        paddingHorizontal: 20, 
        paddingBottom: 0,
        
    }
})