import React from 'react';
import { NavigationContainer } from'@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import CityScreen from '../screens/home/CityScreen';
import { StyleSheet, Text, View } from 'react-native';



export default function Navigation() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen 
          name="home" 
          component={HomeScreen} 
          options={{

            title: 'Ciudades',

            // DESCOMENTAR EL CÓDIGO DE ABAJO PARA AGREGAR ESTILOS PERSONALIZADOS A LA BARRA DE ARRIBA

            // headerTitle: () => (
            //   <View style={styles.headerBar}>
            //     <Text>Hola</Text>
            //   </View>
            // )
          }}
        />
        <Stack.Screen name="city" component={CityScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    );
}

const styles = StyleSheet.create({
  headerBar: {

  }
})