import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  /* 전체 래퍼 */
  container: {
    flexDirection: "row",
    alignItems: "center",
  },

  /* ◎ 벌브 */
  bulb: {
    width: 48,
    height: 48,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: "#3E4146",
    marginRight: -10,                  // 관과 테두리 겹치기
  },

  /* 관 + 눈금을 담는 래퍼 */
  barWrapper: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
    height: 28 + 12,                  // 관 높이(28) + 큰 눈금 높이(12)
    paddingHorizontal: 4,             // 양쪽 끝 눈금 살짝 안쪽으로
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
  },

  /* 관 내부 채움 */
  fill: {
    height: "100%",
  },

  /* 큰 눈금 */
  tickMajor: {
    position: "absolute",
    top: -6,                          // 위로 6 px, 관 내부로도 6 px
    width: 2,
    height: 12,                       // 기존 대비 2배
    backgroundColor: "#3E4146",
  },

  /* 작은 눈금 */
  tickMinor: {
    position: "absolute",
    top: -3,                          // 큰 눈금 절반 높이로
    width: 1,
    height: 6,
    backgroundColor: "#3E4146",
  },
});
