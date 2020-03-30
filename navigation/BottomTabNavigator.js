import * as React from "react";
import { Image } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RankScreen from "../screens/RankScreen";
import LiveScreen from "../screens/LiveScreen";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Rank"
      labeled={false}
      tabBarOptions={{
        activeTintColor: "#2088f0",
        activeBackgroundColor: "#2088f0",
        inactiveTintColor: "#333336",
        inactiveBackgroundColor: "#333336",
        showLabel: false,
        style: {height: 75 }
      }}
      
    >
      <BottomTab.Screen
        name="Rank"
        component={RankScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/images/rank-bar-button.png")}
              style={{
                width: 57,
                height: 49,
                backgroundColor: color,
                marginTop: 10,
                marginBottom: 5
              }}
            />
          )
        }}
      />
      <BottomTab.Screen
        name="Live"
        component={LiveScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/images/live-bar-button.png")}
              style={{
                width: 47,
                height: 49,
                backgroundColor: color,
                marginTop: 10,
                marginBottom: 5
              }}
            />
          )
        }}
        tabBarOptions={{
          style: { backgroundColor: "#2088f0" }
        }}
      />
    </BottomTab.Navigator>
  );
}
