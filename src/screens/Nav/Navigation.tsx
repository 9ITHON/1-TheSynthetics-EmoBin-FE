import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import Landing from "../Landing/Landing";
import History from "../History/History";
import { styles, tabStyles } from "./Navigation.styles";
import { NavParamList } from "../../types/navigation";

const Tab = createBottomTabNavigator<NavParamList>();

const Navigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: tabStyles.tabBar,
        tabBarLabelStyle: tabStyles.tabLabel,
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#BEBEBE",
      }}
    >
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarLabel: "히스토리",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../../assets/icons/history.png")}
              style={[styles.icon, { tintColor: focused ? "#000" : "#BEBEBE" }]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Landing"
        component={Landing}
        options={{
          tabBarLabel: "홈",
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../../assets/icons/home.png")}
              style={[styles.icon, { tintColor: focused ? "#000" : "#BEBEBE" }]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={Landing}
        options={{
          tabBarLabel: "마이페이지",
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../../assets/icons/my.png")}
              style={[styles.icon, { tintColor: focused ? "#000" : "#BEBEBE" }]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Navigator;
