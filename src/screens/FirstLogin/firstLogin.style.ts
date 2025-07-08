import { StyleSheet, Platform, StatusBar } from "react-native";

const topInset = (Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0) + 24;


export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFBF1',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: topInset,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 8,
  },
  section: {
    marginBottom: 32,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#C4C4C4',
    paddingVertical: Platform.OS === 'ios' ? 10 : 8,
    fontSize: 16,
    color: '#000',
  },

  genderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 48,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#C4C4C4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  radioOuterActive: {
    borderColor: '#000',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#000',
  },
  genderText: {
    fontSize: 16,
  },

  birthRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerWrapper: {
    flex: 1,
    paddingVertical: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#C4C4C4',
  },
  pickerMargin: {
    marginRight: 8,
  },
  picker: {
    height: Platform.OS === 'ios' ? 180 : 56,
  },


  submitButton: {
    marginTop: 64,
    backgroundColor: '#4A4A4A',
    borderRadius: 24,
    paddingVertical: 18,
    alignItems: 'center',
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});