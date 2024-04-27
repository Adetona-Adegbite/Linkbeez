import React, { useLayoutEffect, useState } from "react";
import { View, StatusBar, Platform, TouchableOpacity } from "react-native";
import {
  NavigationContainer,
  useNavigation,
  useNavigationState,
  useRoute,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/FontAwesome";

import Home from "./screens/Home";
import Explore from "./screens/Explore";
import Inbox from "./screens/Inbox";
import Profile from "./screens/Profile";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsPage from "./screens/Settings";
import CreateScreen from "./screens/Create";
import PostReel from "./screens/PostReel";
import PostAd from "./screens/PostAd";
import { useEffect } from "react";
import CategoryScreen from "./screens/CategoryScreen";
import SearchResultsScreen from "./screens/SearchResultsScreen";
import SavedScreen from "./screens/SavedPage";
import LoginScreen from "./screens/Login";
import RegisterScreen from "./screens/Register1";
import PersonalInfoScreen from "./screens/Register1";
import BioInfoScreen from "./screens/Register2";
import SocialInfoScreen from "./screens/Register3";
import EditProfileScreen from "./screens/EditProfile";
const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

function CreatePage() {
  const navigation = useNavigation();
  const [page, setPage] = useState("Create");

  useLayoutEffect(() => {
    if (page !== "Create") {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: "flex" } });
    }
  }, [navigation, page]);
  return (
    // <NavigationContainer
    //   onStateChange={(item) => {
    //     console.log(item);
    //   }}
    //   independent={true}
    // >
    <Stack.Navigator
      screenOptions={({ route }) => {
        setPage(route.name);
        // console.log("changed", route.name);
        return {
          headerStyle: {
            backgroundColor: "#08A87E",
          },
        };
      }}
    >
      <Stack.Screen name="Create" component={CreateScreen} />
      <Stack.Screen
        options={{ tabBarStyle: { display: "none" } }}
        name="Highlights"
        component={PostReel}
      />
      <Stack.Screen
        options={{ tabBarStyle: { display: "none" } }}
        name="Advertisments"
        component={PostAd}
      />
    </Stack.Navigator>
    // </NavigationContainer>
  );
}
function ProfilePage() {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        options={{ headerShown: false }}
        name="Profile"
        component={Profile}
      />
      <Stack.Screen
        options={{ headerShown: true }}
        name="Edit-Profile"
        component={EditProfileScreen}
      />
      <Stack.Screen name="Settings" component={SettingsPage} />
    </Stack.Navigator>
  );
}
function HomePage() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Main-Home"
        component={Home}
      />
      <Stack.Screen
        options={{
          headerBackTitle: "Home",
          headerStyle: {
            backgroundColor: "#08A87E",
          },
        }}
        name="Categories"
        component={CategoryScreen}
      />
      <Stack.Screen
        options={{
          headerBackTitle: "Home",
          headerStyle: {
            backgroundColor: "#08A87E",
          },
        }}
        name="Search Results"
        component={SearchResultsScreen}
      />
      <Stack.Screen
        options={{
          headerBackTitle: "Home",
          headerStyle: {
            backgroundColor: "#08A87E",
          },
          headerTitle: "Saved",
        }}
        name="Saved"
        component={SavedScreen}
      />
    </Stack.Navigator>
  );
}

function App() {
  // const route = useRoute();

  // // Access the name of the current page from the route object
  // const currentPageName = route.name;
  // console.log(currentPageName);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          display: "flex",
          position: "absolute",
          elevation: 10,
          backgroundColor: "#fffffa",
          borderRadius: 40,
          height: 100,
          width: "100%",
          // borderWidth: 1,
          borderColor: "black",
        },

        tabBarLabelStyle: { color: "black" },
        tabBarShowLabel: true,
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarLabel: "Home",

          tabBarLabelStyle: { color: "black" },
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                top: Platform.OS === "ios" ? 10 : 0,
              }}
            >
              <Icon2
                name="home"
                size={30}
                color={focused ? "#08A87E" : "black"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                top: Platform.OS === "ios" ? 10 : 0,
              }}
            >
              <Icon2
                name="asterisk"
                size={30}
                color={focused ? "#08A87E" : "black"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={CreatePage}
        options={{
          tabBarVisible: false,
          tabBarLabelStyle: {
            position: "relative",
            top: -10,
            color: "black",
            fontSize: 18,
            fontWeight: "bold",
          },
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                top: -20,
                width: Platform.OS === "ios" ? 80 : 60,
                height: Platform.OS === "ios" ? 80 : 60,
                borderRadius: Platform.OS === "ios" ? 25 : 30,
                backgroundColor: "transparent", // Change background color to transparent
              }}
            >
              <Icon
                name="pluscircle"
                size={Platform.OS === "ios" ? 60 : 60}
                color="#08A87E"
                style={{ opacity: 1 }}
              />
            </View>
          ),
          tabBarIconStyle: {},
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={Inbox}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                top: Platform.OS === "ios" ? 10 : 0,
              }}
            >
              <Icon2
                name="inbox"
                size={30}
                color={focused ? "#08A87E" : "black"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                top: Platform.OS === "ios" ? 10 : 0,
              }}
            >
              <Icon2
                // name="infocirlceo"
                name="user"
                size={30}
                color={focused ? "#08A87E" : "black"}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default function Main() {
  return (
    <NavigationContainer>
      <StatusBar animated={true} backgroundColor="#5856D6" />

      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="main"
          component={App}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: "",
          }}
          name="register1"
          component={PersonalInfoScreen}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: "",
            headerBackTitleStyle: { color: "black" },
            headerTintColor: "black",
            headerBackTitle: "back",
          }}
          name="register2"
          component={BioInfoScreen}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTintColor: "black",

            headerTitle: "",
            headerBackTitleStyle: { color: "black" },
            headerBackTitle: "back",
          }}
          name="register3"
          component={SocialInfoScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="login"
          component={LoginScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
