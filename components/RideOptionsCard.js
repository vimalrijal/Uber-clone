import { StyleSheet, Text, View,Image } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { Icon } from 'react-native-elements'

import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '../slice/navSlice'

const data = [
    {
        id: "uber-X-123",
        title: "UberX",
        multiplier: 1,
        image: "https://links.papareact.com/3pn"
    },
    {
        id: "uber-XL-456",
        title: "Uber XL",
        multiplier: 1.2,
        image: "https://links.papareact.com/5w8"
    },
    {
        id: "uber-LUX-789",
        title: "Uber LUX",
        multiplier: 1.75,
        image: "https://links.papareact.com/7pf"
    }
]

const SURGE_CHARGE_RATE = 1.5; 

const RideOptionsCard = () => {
    const navigation = useNavigation();
    const [selected, setselected] = useState(null);
    const travellTimeInformation = useSelector(selectTravelTimeInformation);
  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
        {/* <View >
        <TouchableOpacity 
        
        onPress={() => navigation.navigate('NavigateCard')}
        >
            <Icon name="chevron-left" type='font-awesome'/>
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>Select a ride</Text>
        </View> */}
        <Text style={tw`text-center py-5 text-xl`}>Select a ride - {travellTimeInformation?.distance?.text}</Text>

        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem = {({item: {id, image, title, multiplier},item})=> ( 
                <TouchableOpacity 
                onPress={()=>setselected(item)}
                style={tw`flex-row items-center justify-between px-10 ${ id === selected?.id && "bg-gray-200"}`}
                
                >
                    <Image
                        style={{
                            width:100,
                            height:100,
                            resizeMode: "contain"
                        }}
                        source={{ uri: image }}
                    />
                    <View style={tw`-ml-6`}>
                        <Text style={tw`text-xl font-semibold`}>{title}</Text>
                        <Text>{travellTimeInformation?.duration?.text} Travel Time</Text>
                    </View>
                    <Text style={tw`text-xl`}>

                        {
                            new Intl.NumberFormat('en-gb', {
                                style: 'currency',
                                currency: 'GBP'
                            }).format(
                                (travellTimeInformation?.duration?.value * SURGE_CHARGE_RATE * multiplier) / 100 
                            )
                        }


                    </Text>
                </TouchableOpacity>
             )}
        />
        <View>
            <TouchableOpacity 
                disabled={!selected}
                style={tw`bg-black py-3 mx-3 ${!selected && 'bg-gray-300'}`}
            >
            <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text> 
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default RideOptionsCard

const styles = StyleSheet.create({})