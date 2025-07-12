// src/screens/Nav/Navigation.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Landing from "../Landing/Landing";
import History from "../History/History";
import Recommend from "../Recommend/Recommend";
import MyPage from "../MyPage/MyPage";

import { styles, tabStyles } from "./Navigation.styles";
import HistoryIcon from "../../../assets/icons/history.svg";
import HomeIcon from "../../../assets/icons/emobin.svg";
import MyPageIcon from "../../../assets/icons/my.svg";

import type {
  NavParamList,
  HistoryStackParamList,
} from "../../types/navigation";

const Tab = createBottomTabNavigator<NavParamList>();
const HistoryStack = createNativeStackNavigator<HistoryStackParamList>();

function HistoryStackNav() {
  return (
    <HistoryStack.Navigator screenOptions={{ headerShown: false }}>
      <HistoryStack.Screen name="HistoryMain" component={History} />
      <HistoryStack.Screen name="Recommend" component={Recommend} />
    </HistoryStack.Navigator>
  );
}

export default function Navigation() {
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
        component={HistoryStackNav}
        options={{
          tabBarLabel: "히스토리",
          tabBarIcon: ({ focused }) => (
            <HistoryIcon
              fill={focused ? "#000" : "#BEBEBE"}
              style={styles.icon}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Landing"
        component={Landing}
        options={{
          tabBarLabel: "홈",
          tabBarIcon: ({ focused }) => (
            <HomeIcon fill={focused ? "#000" : "#BEBEBE"} style={styles.icon} />
          ),
        }}
      />

      <Tab.Screen
        name="MyPage"
        component={MyPage}
        options={{
          tabBarLabel: "마이페이지",
          tabBarIcon: ({ focused }) => (
            <MyPageIcon
              fill={focused ? "#000" : "#BEBEBE"}
              style={styles.icon}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
