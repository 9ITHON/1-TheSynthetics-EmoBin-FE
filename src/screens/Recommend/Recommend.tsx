import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { styles, POSTER_WIDTH, POSTER_SPACING } from "./Recommend.styles";
import api from "../../utils/api";
import { useTokenStore } from "../../stores/tokenStore";
import { RecommendRouteProp } from "../../types/recommend";
import { Movie } from "../../types/recommend";

const Recommend = () => {
  const route = useRoute<RecommendRouteProp>();
  const { emotion, message } = route.params;

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const accessToken = useTokenStore((state) => state.accessToken);

  useEffect(() => {
    if (!accessToken) return;
    const fetchRecommend = async () => {
      setLoading(true);
      try {
        const res = await api.post(
          "/api/recommendation/movie",
          {
            emotion,
            message,
            moviecount: 10,
            genre: "",
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (res.data.code === "SUCCESS") {
          setMovies(res.data.data);
        } else {
          console.warn("추천 실패:", res.data.message);
        }
      } catch (err) {
        console.error("추천 API 에러:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommend();
  }, [accessToken, emotion, message]);

  const { width } = Dimensions.get("window");
  const horizontalPadding = (width - POSTER_WIDTH) / 2;

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>이건 어때?</Text>
      <View style={{ paddingHorizontal: horizontalPadding }}>
        <Text style={styles.category}>영화 / 드라마</Text>
      </View>

      <FlatList
        data={movies}
        keyExtractor={(item) => item.title}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={POSTER_WIDTH + POSTER_SPACING}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: horizontalPadding }}
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
    </SafeAreaView>
  );
};

export default Recommend;
