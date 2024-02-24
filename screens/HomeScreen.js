import { StatusBar } from "expo-status-bar";
import { useState } from "react";
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
import MovieList from "../components/MovieList";
import TrendingMovies from "../components/TrendingMovies";
import { style } from "../theme";

const ios = Platform.OS === "ios";

const HomeScreen = () => {
  const [trending, setTrending] = useState([1, 2, 3]);
  const [upcoming, setUpcoming] = useState([1, 2, 3]);
  const [topRated, setTopRated] = useState([1, 2, 3]);

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
          <TouchableOpacity>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
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
    </View>
  );
};

export default HomeScreen;
