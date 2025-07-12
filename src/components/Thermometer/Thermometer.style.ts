import { StyleSheet } from "react-native";
const INNER_PAD = 4;         // ← 여유 공간(px) – 0 ~ 3 사이에서 원하는 값
const BULB_SIZE = 48;
const BULB_PAD  = 4;   

export const styles = StyleSheet.create({
  /* 전체 래퍼 */
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,      // ← 원하는 만큼(예: 8~12) 조절
  },

  /* ◎ 벌브 껍데기 */
  bulb: {
    width: BULB_SIZE,
    height: BULB_SIZE,
    borderRadius: BULB_SIZE / 2,
    borderWidth: 3,
    borderColor: "#3E4146",
    padding: BULB_PAD,               // ★ 안쪽 여유
    marginRight: -11,
    justifyContent: "center",
    alignItems: "center",
  },

  /* ◎ 벌브 내부 색상 원 */
  bulbInner: {
    flex: 1,                          // padding 덕분에 자동으로 작아짐
    width: "100%",
    height: "100%",
    borderRadius: (BULB_SIZE - BULB_PAD * 2) / 2,
  },

  barWrapper: {
    /* flex: 1,          // ❌ 주석 처리 */
    width: 400,          // ✅ 원하는 폭(px) 지정
    position: "relative",
    justifyContent: "center",
    height: 28 + 12,
    paddingHorizontal: 4,
  },

  /* ─── 관(튜브) */
  tube: {
    height: 28,
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,
    borderWidth: 3,
    borderLeftWidth: 0,
    borderColor: "#3E4146",
    overflow: "hidden",

    /* ★ 추가: 안쪽 여백 */
    paddingVertical: INNER_PAD,
    paddingRight: INNER_PAD,   // 오른쪽도 살짝 떨어지게
  },

  /* 관 내부 채움 */
  fill: {
    height: "100%",            // 패딩 덕분에 이미 줄어들었다!
    borderTopRightRadius: 8,   // 모서리 둥글림 조금 줄여 자연스럽게
    borderBottomRightRadius: 8,
  },
  /* 큰 눈금 */
  tickMajor: {
    position: "absolute",
    top: -4,                            // 위·아래 2배 길이
    width: 2,
    height: 12,
    backgroundColor: "#000",
  },

  /* 작은 눈금 */
  tickMinor: {
    position: "absolute",
    top: -1,
    width: 1,
    height: 6,
    backgroundColor: "#000",
  },
});
