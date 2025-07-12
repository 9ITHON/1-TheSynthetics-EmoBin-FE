import { StyleSheet } from "react-native";
const INNER_PAD = 4;         
const BULB_SIZE = 48;
const BULB_PAD  = 4;   

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,   
  },

  bulb: {
    width: BULB_SIZE,
    height: BULB_SIZE,
    borderRadius: BULB_SIZE / 2,
    borderWidth: 3,
    borderColor: "#3E4146",
    padding: BULB_PAD,             
    marginRight: -11,
    justifyContent: "center",
    alignItems: "center",
  },

  bulbInner: {
    flex: 1,                        
    width: "100%",
    height: "100%",
    borderRadius: (BULB_SIZE - BULB_PAD * 2) / 2,
  },

  barWrapper: {
    width: 280,       
    position: "relative",
    justifyContent: "center",
    height: 28 + 12,
    paddingHorizontal: 4,
  },

  tube: {
    height: 28,
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,
    borderWidth: 3,
    borderLeftWidth: 0,
    borderColor: "#3E4146",
    overflow: "hidden",

    paddingVertical: INNER_PAD,
    paddingRight: INNER_PAD,   
  },

  fill: {
    height: "100%",           
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  tickMajor: {
    position: "absolute",
    top: -4,                        
    width: 2,
    height: 12,
    backgroundColor: "#000",
  },

  tickMinor: {
    position: "absolute",
    top: -1,
    width: 1,
    height: 6,
    backgroundColor: "#000",
  },
});
