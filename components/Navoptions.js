import { StyleSheet, Text, View, FlatList,TouchableOpacity,Image, BackHandler } from 'react-native'
import React from 'react'

import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../slice/navSlice';


const data = [
    {
        id: "123",
        title: "Get a ride",
        image: "https://links.papareact.com/3pn",
        screen: "MapScreen"
    },
    {
        id: "456",
        title: "Order Fo0d",
        image: "https://links.papareact.com/28w",
        screen: "EatScreen"
    }
]


const Navoptions = () => {

    const navigation = useNavigation();
    const origin = useSelector(selectOrigin)

  return (
    
      <FlatList 
      
        data={data}
        keyExtractor={(item)=> item.id}
        horizontal
        renderItem={({item})=>(
            <TouchableOpacity 
                onPress={()=> navigation.navigate(item.screen)}
                style={tw`p-10 m-2 bg-gray-200`}
                disabled={!origin}
                >
               <View style={tw`${!origin && " opacity-20 "}`}>
                    <Image
                        
                        style={{width:100, height:100,resizeMode:'contain'}}
                        source={{ uri: item.image }}
                    />
                    <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
                    <Icon 
                    style={
                        tw`p-2 bg-black rounded-full w-10 mt-4`
                    }
                    name="arrowright" 
                    color="white" 
                    type="antdesign"
                    
                    />
               </View>
            </TouchableOpacity>
        )}
      />
    
  )
}

export default Navoptions

const styles = StyleSheet.create({})