import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import * as WebBrowser from "expo-web-browser";
WebBrowser.maybeCompleteAuthSession();

export default function App() {
  return (
    <LoginScreen />
  );
}

