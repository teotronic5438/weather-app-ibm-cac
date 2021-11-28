import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home/Home";
import City from "../screens/Cities/City";
import Search from "../screens/Search";

export default function Navigation() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen
          name="home"
          component={Home}
          options={{
            title: "Ice Cream Weather",
          }}
        />
        <Stack.Screen name="city" component={City} />
        <Stack.Screen name="search" component={Search} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
