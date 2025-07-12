import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  TouchableOpacity,   // 🔄
  Linking,            // 🔄
} from "react-native";
import { useRoute } from "@react-navigation/native";
import {
  styles,
  POSTER_WIDTH,
  POSTER_SPACING,
  PLAY_WIDTH,
} from "./Recommend.styles";
import api from "../../utils/api";
import { useTokenStore } from "../../stores/tokenStore";
import { RecommendRouteProp } from "../../types/recommend";
import { Movie, PlayItem } from "../../types/recommend";

const Recommend = () => {
  const route = useRoute<RecommendRouteProp>();
  const { emotion, message } = route.params;

  const [movies, setMovies] = useState<Movie[]>([]);
  const [plays, setPlays] = useState<PlayItem[]>([]);
  const [loading, setLoading] = useState(false);
  const accessToken = useTokenStore((state) => state.accessToken);

  /* ---------- helper : 유튜브 썸네일 ---------- */
  const getYoutubeId = (url: string) => {
    const match = url.match(
      /(?:v=|\/embed\/|\/watch\/|youtu\.be\/|\/v\/|\/videos\/|start_radio=1\&list=[^&]*&v=)([0-9A-Za-z_-]{11})/
    );
    return match ? match[1] : "";
  };
  const getThumbnail = (url: string) =>
    `https://img.youtube.com/vi/${getYoutubeId(url)}/hqdefault.jpg`;

  /* ---------- 영화 추천 ---------- */
  const fetchMovies = async () => {
    const res = await api.post(
      "/api/recommendation/movie",
      { emotion, message, moviecount: 10, genre: "" },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    if (res.data.code === "SUCCESS") setMovies(res.data.data);
  };

  /* ---------- 플레이리스트 ---------- */
  const fetchPlays = async () => {
    const res = await api.post(
      "/api/recommendation/music",
      { emotion, message },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    if (res.data.code === "SUCCESS") setPlays(res.data.data);
  };

  useEffect(() => {
    if (!accessToken) return;
    (async () => {
      try {
        setLoading(true);
        await Promise.all([fetchMovies(), fetchPlays()]);
      } catch (e) {
        console.warn("추천 API 에러:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, [accessToken, emotion, message]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ---------- 헤더 ---------- */}
        <View style={styles.header}>
          <Image
            source={require("../../../assets/Emobin.png")}
            style={styles.logo}
          />
          <Image
            source={require("../../../assets/logo.png")}
            style={styles.profile}
          />
        </View>

        {/* ---------- 배너 ---------- */}
        <View style={styles.banner}>
          <Image
            source={require("../../../assets/subtail.png")}
            style={styles.bannerImg}
          />
        </View>

        {/* ---------- 영화 섹션 ---------- */}
        <Text style={styles.sectionTitle}>영화 / 드라마</Text>
        <FlatList
          data={movies}
          keyExtractor={(item) => item.title}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={POSTER_WIDTH + POSTER_SPACING}
          decelerationRate="fast"
          contentContainerStyle={{
            paddingHorizontal:
              (Dimensions.get("window").width - POSTER_WIDTH) / 2,
          }}
          ItemSeparatorComponent={() => (
            <View style={{ width: POSTER_SPACING }} />
          )}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item.posterUrl }}
              style={[styles.poster, { width: POSTER_WIDTH }]}
              resizeMode="cover"
            />
          )}
        />

        {/* ---------- 플레이리스트 섹션 ---------- */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>플레이리스트</Text>
        <FlatList
          data={plays}
          keyExtractor={(item, idx) => `${idx}-${item.musicUrl}`} // 🔄
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={PLAY_WIDTH + 12}
          decelerationRate="fast"
          contentContainerStyle={{
            paddingHorizontal:
              (Dimensions.get("window").width - PLAY_WIDTH) / 2,
          }}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => Linking.openURL(item.musicUrl)} // 🔄
            >
              <Image
                source={{ uri: getThumbnail(item.musicUrl) }} // 🔄
                style={[styles.playThumb, { width: PLAY_WIDTH }]}
                resizeMode="cover"
              />
              <Text style={styles.playCaption} numberOfLines={1}>
                {item.musictitle} {/* 🔄 */}
              </Text>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Recommend;
