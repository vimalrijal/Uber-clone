import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'

import { Icon } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'


const data = [
    {
        id: "123",
        icon: "home",
        location: "Home",
        destination: "10/73 macquarie road auburn 2144"
    },
    {
        id: "456",
        icon: "briefcase",
        location: "Work",
        destination: "10/51 northumberland auburn 2144"
    }
]

const NavFavourities = () => {
  return <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => (
                <View style={[tw`bg-gray-200`, {height:0.5}]}/>
            )}
            renderItem={({item: {icon,location,destination}})=> (
                <TouchableOpacity style={tw`flex-row items-center p-5`}>
                    <Icon
                    style={tw`mr-4 rounded-full bg-gray-300 p-3`}
                    name={icon}
                    type="ionicon"
                    color="white"
                    size={18}
                    />
                    <View>
                    <Text style={tw`font-semibold text-lg`}>{location}</Text>
                    <Text style={tw`text-gray-500`}>{destination}</Text>
                    </View>
                </TouchableOpacity>
                
            )}
        />
}

export default NavFavourities

const styles = StyleSheet.create({})