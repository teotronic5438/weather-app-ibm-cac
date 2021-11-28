import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home/Home";
import City from "../screens/Cities/City";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={Home}
        options={{
          title: "Ciudades",
        }}
      />
      <Stack.Screen
        name="city"
        component={City}
        options={{
          title: "Ciudad",
        }}
      />
    </Stack.Navigator>
  );
}
