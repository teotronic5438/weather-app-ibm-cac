import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../screens/home/Home';
import City from '../screens/home/City';

const Stack = createStackNavigator();

export const AccountStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="home"
                component={Home}
                options={{
                    title: 'Ciudades'
                }}
            />
            <Stack.Screen 
                name="city"
                component={City}
                options={{
                    title: 'Ciudad'
                }}
            />
        </Stack.Navigator>
    )
}

export default AccountStack;
