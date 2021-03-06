import * as React from "react";
import { Platform, StatusBar, StyleSheet, View, Image} from "react-native";
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import DetailsScreen from "./screens/DetailsScreen";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import useLinking from "./navigation/useLinking";
import { Header } from "react-native/Libraries/NewAppScreen";

const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          helvetica: require("./assets/fonts/HelveticaNeue.ttf")
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);
  const stackScrOpt = {
    headerTitle: () => (
      <Image
        style={styles.image}
        source={require("./assets/images/football.png")}
      />
    )
  };
  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        <NavigationContainer
          ref={containerRef}
          initialState={initialNavigationState}
        >
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: "#313B49",
                shadowColor: 'transparent',
              },
              headerTitleAlign: "center",
              headerTintColor: "#FFFFFF",
              headerBackTitle: "Back"
            }}
          >
            <Stack.Screen
              name="Root"
              component={BottomTabNavigator}
              options={stackScrOpt}
            />
            <Stack.Screen
              name="Details"
              component={DetailsScreen}
              options={stackScrOpt}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  image: {
    height: 58,
    width: 58
  }
});
