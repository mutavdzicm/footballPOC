import * as React from "react";
import { Image, SafeAreaView } from "react-native";

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
        style: {height: 130, marginBottom: -34}
      }}
      tabBarComponent={()=> null}
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
                height: 55,
                backgroundColor: color,
                marginTop: 5,
                marginBottom: 10,
                resizeMode: 'contain'
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
                width: 57,
                height: 55,
                backgroundColor: color,
                marginTop: 5,
                marginBottom: 10,
                resizeMode: 'contain'
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
