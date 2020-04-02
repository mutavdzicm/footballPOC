import * as React from "react";
import { Image, Platform } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RankScreen from "../screens/RankScreen";
import LiveScreen from "../screens/LiveScreen";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const isIOS = () => Platform.OS === 'ios';
  return (
    <BottomTab.Navigator
      initialRouteName="Rank"
      labeled={false}
      tabBarOptions={{
        activeTintColor: "#313B49",
        activeBackgroundColor: "#313B49",
        inactiveTintColor: "#333336",
        inactiveBackgroundColor: "#333336",
        showLabel: false,
        style: isIOS() && {height: 110, marginBottom: -34} || {height: 75}
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
              style={
                  isIOS() &&
                  {
                      width: 31,
                      height: 33,
                      backgroundColor: color,
                      marginTop: 5,
                      marginBottom: 10,
                      resizeMode: 'contain'
                  }
                  ||
                  {
                      width: 31,
                      height: 33,
                      backgroundColor: color,
                      marginTop: 5,
                      resizeMode: 'contain'
                  }
              }
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
              style={
                  isIOS() &&
                  {
                      width: 32,
                      height: 33,
                      backgroundColor: color,
                      marginTop: 5,
                      marginBottom: 10,
                      resizeMode: 'contain'
                  }
                  ||
                  {
                      width: 32,
                      height: 33,
                      backgroundColor: color,
                      marginTop: 5,
                      resizeMode: 'contain'
                  }
              }
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
