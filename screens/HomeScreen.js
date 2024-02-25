import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "../api/movieDB";
import Loading from "../components/Loading";
import MovieList from "../components/MovieList";
import TrendingMovies from "../components/TrendingMovies";
import { style } from "../theme";

const ios = Platform.OS === "ios";

const HomeScreen = () => {
  const navigation = useNavigation();

  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    if (data && data.results.length) {
      setTrending(data.results);
      setLoading(false);
    } else {
      setTrending([]);
      setLoading(false);
    }
  };
  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    if (data && data.results.length) {
      setTopRated(data.results);
      setLoading(false);
    } else {
      setTopRated([]);
      setLoading(false);
    }
  };
  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    if (data && data.results.length) {
      setUpcoming(data.results);
      setLoading(false);
    } else {
      setUpcoming([]);
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className={`${ios ? "-mb-2" : "mb-3"}`}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
          <Text className="text-white text-2xl font-bold">
            <Text style={style.text}>M</Text>
            ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {/* Trending Movies */}
          <TrendingMovies data={trending} />
          {/* Upcoming Movies */}
          <MovieList title="Upcoming" data={upcoming} />
          {/* Top Rated */}
          <MovieList title="Top Rated" data={topRated} />
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;
