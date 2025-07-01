import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from "./src/screens/Landing/Landing";
import WriteNote from "./src/screens/WriteNote/WriteNote";
import Processing from "./src/screens/Processing/Processing";
import EmotionResult from "./src/screens/EmotionResult/EmotionResult";
import { RootStackParamList } from "./src/types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
