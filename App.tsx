import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import Landing from "./src/screens/Landing/Landing";
import WriteNote from "./src/screens/WriteNote/WriteNote";
import Processing from "./src/screens/Processing/Processing";
import EmotionResult from "./src/screens/EmotionResult/EmotionResult";
import History from "./src/screens/History/History";
import Navigation from "./src/screens/Nav/Navigation";
import MyPage from "./src/screens/MyPage/MyPage";
import UserInfo from "./src/screens/UserInfo/UserInfo";
import Notice from "./src/screens/Notice/Notice";
import HelpCenter from "./src/screens/HelpCenter/HelpCenter";
import { RootStackParamList } from "./src/types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();


export default function App() {
  return (
    <NavigationContainer>
       {/* 
      <Stack.Navigator initialRouteName="MyPage">
        <Stack.Screen
          name="MyPage"
          component={MyPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserInfo"
          component={UserInfo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notice"
          component={Notice}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HelpCenter"
          component={HelpCenter}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      */}

      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen
          name="Landing"
          component={Landing}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WriteNote"
          component={WriteNote}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Processing"
          component={Processing}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EmotionResult"
          component={EmotionResult}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="History"
          component={Navigation}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
