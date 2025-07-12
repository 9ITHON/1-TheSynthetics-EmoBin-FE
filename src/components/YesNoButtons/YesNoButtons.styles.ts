import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%',
  },
  yesButton: {
    flex: 1,
    marginRight: 10,
  },
  noButton: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: '#ccc', 
  },
});
