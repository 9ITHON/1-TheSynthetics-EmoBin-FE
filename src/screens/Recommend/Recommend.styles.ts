import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

/** 영화 포스터·플레이리스트 썸네일 크기 */
export const POSTER_WIDTH = width * 0.5;   // 3장이 화면에 보이도록 조정
export const PLAY_WIDTH   = width * 0.75;
export const POSTER_SPACING = 16;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffbf1",
  },
  scrollContent: { paddingBottom: 40 },

  /* 로딩 센터 */
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fffbf1",
  },

  /* ---------- 헤더 ---------- */
  header: {
    marginTop: 50,
    width: "100%",               // 화면 전체 폭 사용
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    /* 좌우 padding 제거 → 끝까지 붙음 */
    paddingHorizontal: 0,
  },
  logo: {
    width: 80,
    height: 24,
    resizeMode: "contain",
    marginLeft: 20,              // 왼쪽 여백
  },
  profile: {
    width: 28,
    height: 28,
    resizeMode: "contain",
    marginRight: 20,             // 오른쪽 여백
  },

  /* ---------- 배너 ---------- */
  /* 배너는 가운데 여백 유지 */
  banner: {
    width: "100%",          // 화면 전체 폭
    backgroundColor: "#F7D24E",
    paddingVertical: 12,    // 위아래 여백
    paddingHorizontal: 20,  // 좌우 여백(헤더 로고와 맞춤)
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "flex-start", // 왼쪽 정렬
  },
  bannerImg: {
    width: "55%",          // 배너 안의 패딩 범위에서 가득
    height: undefined,
    aspectRatio: 335 / 88,  // PNG 원본 비율(예시)
    resizeMode: "contain",
    marginBottom:10
  },

  /* ---------- 섹션 ---------- */
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#444",
    marginLeft: 20,
    marginBottom: 8,
  },

  /* ---------- 영화 포스터 ---------- */
  poster: {
    height: POSTER_WIDTH * 1.55,
    backgroundColor: "#eee",
    borderRadius: 8,
  },

  /* ---------- 플레이리스트 ---------- */
  playThumb: {
    height: PLAY_WIDTH * 0.56, // 16:9
    borderRadius: 6,
    backgroundColor: "#eee",
  },
  playCaption: {
    width: PLAY_WIDTH,
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
});
