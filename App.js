import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import MapScreen  from './screens/MapScreen';
import { store } from './store';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

// tailwind css
import tw from 'tailwind-react-native-classnames';

 const App = () => {

  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
    <NavigationContainer>
      <SafeAreaProvider>
        <KeyboardAvoidingView 
        style={{flex:1}}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
        >
        <Stack.Navigator>
            <Stack.Screen 
              name="HomeScreen"
              component={HomeScreen}
              options={{
                headerShown: false
                
              }}
            />
            <Stack.Screen 
              name="MapScreen"
              component={MapScreen}
              options={{
                headerShown: false
                
              }}
            />
        </Stack.Navigator>
        </KeyboardAvoidingView>
        

      </SafeAreaProvider> 
    </NavigationContainer>
    </Provider>
  );
}

export default App;

