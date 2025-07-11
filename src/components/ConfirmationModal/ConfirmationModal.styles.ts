import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // 배경 dim
  },

  modalView: {
    width: '65%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingTop: 20,
    paddingBottom: 0,
    paddingHorizontal: 24,
    alignItems: 'center',
  },

  closeButton: {
    position: 'absolute',
    top: 14,
    left: 14,
    padding: 6,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },

  modalMessage: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
  },

  horizontalDivider: {
    width: '100%',
    height: 1,
    backgroundColor: '#9E9E9E',
  },

  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    height: 52,
  },

  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },

  verticalDivider: {
    width: 1,
    backgroundColor: '#9E9E9E',
  },
});
