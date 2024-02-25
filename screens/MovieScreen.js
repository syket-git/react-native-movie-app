import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  fallbackMoviePoster,
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
} from "../api/movieDB";
import Cast from "../components/Cast";
import Loading from "../components/Loading";
import MovieList from "../components/MovieList";
import { style, theme } from "../theme";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";
const topMargin = ios ? "" : "mt-3";

const MovieScreen = () => {
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const { params: item } = useRoute();
  const [cast, setCast] = useState([]);
  const [details, setDetails] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    console.log("id", item.id);
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    if (data) {
      setDetails(data);
      setLoading(false);
    }
  };
  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    if (data && data.cast) {
      setCast(data.cast);
    }
  };
  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);
    if (data && data.results) {
      setSimilarMovies(data.results);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      {loading ? (
        <Loading />
      ) : (
        <View>
          {/* Movie poster */}
          <View className="w-full">
            <SafeAreaView
              className={`${topMargin} absolute z-20 w-full flex-row justify-between item-center px-4`}
            >
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={style.background}
                className="rounded-xl p-1"
              >
                <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setFavorite(!favorite)}>
                <HeartIcon
                  size="35"
                  color={`${favorite ? theme.background : "white"}`}
                />
              </TouchableOpacity>
            </SafeAreaView>

            <View>
              <Image
                source={{
                  uri: image500(details?.poster_path) || fallbackMoviePoster,
                }}
                style={{ width: width, height: height * 0.55 }}
              />
              <LinearGradient
                colors={[
                  "transparent",
                  "rgba(23,23,23,0.8)",
                  "rgba(23,23,23,1)",
                ]}
                style={{ width, height: height * 0.4 }}
                start={{ x: 0.5, h: 0 }}
                end={{ x: 0.5, h: 1 }}
                className="absolute bottom-0"
              />
            </View>
          </View>
          {/* Movie Details */}
          <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
            <Text className="text-white text-center text-3xl font-bold tracking-wider">
              {details?.title}
            </Text>
            {/* Status, release, runtime */}
            <Text className="text-neutral-400 font-semibold text-base text-center">
              {details?.status} - {details?.release_date?.split("-")?.[0]} -{" "}
              {details?.runtime} min
            </Text>
            <View className="flex-row justify-center mx-4 space-x-2">
              {details?.genres?.map((genre, index) => {
                let showDot = index + 1 !== details.genres.length;
                return (
                  <Text
                    key={index}
                    className="text-neutral-400 font-font-semibold text-base text-center"
                  >
                    {genre?.name} {showDot && "-"}
                  </Text>
                );
              })}
            </View>
            <Text className="text-neutral-400 mx-4 tracking-wide text-center">
              {details?.overview}
            </Text>
          </View>
        </View>
      )}
      {/* Cast */}
      <Cast navigation={navigation} cast={cast} />
      {/* Similar Movies */}
      <MovieList
        title="Similar Movies"
        data={similarMovies}
        hideSeeAll={true}
      />
    </ScrollView>
  );
};
export default MovieScreen;
