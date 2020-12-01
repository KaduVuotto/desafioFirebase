import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Root } from "native-base";

import Home from './scr/Screen/Home'
import Login from './scr/Screen/Login'
import Cadastro from './scr/Screen/Cadastro'
import { StatusBar } from 'react-native';
//import firebase from './scr/Firebase/firebaseConnection'

const Stack = createStackNavigator();

export default function App() {
  return (
    <Root>
      <NavigationContainer>
        <StatusBar backgroundColor={'#418ee8'} />
        <Stack.Navigator>
          <Stack.Screen
            name='Login'
            component={Login}
            options={{
              headerShown: false
            }} />

          <Stack.Screen
            name='Cadastro'
            component={Cadastro}
            options={{
              headerStyle: {
                backgroundColor: '#5298ed',
              },
              headerTintColor: 'white'
            }}
          />

          <Stack.Screen
            name='Home'
            component={Home}
            options={{
              headerShown: false
            }} />

        </Stack.Navigator>
      </NavigationContainer>
    </Root>
  )
}

