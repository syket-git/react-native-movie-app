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
import Cast from "../components/Cast";
import MovieList from "../components/MovieList";
import { style, theme } from "../theme";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";
const topMargin = ios ? "" : "mt-3";

const MovieScreen = () => {
  const [favorite, setFavorite] = useState(false);
  const { params: item } = useRoute();
  const [cast, setCast] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [similarMovies, setSimilarMovies] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9,
  ]);
  const navigation = useNavigation();
  const movieName = "Ant-Man and Waspi: Quantumania";

  useEffect(() => {}, [item]);

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
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
            source={require("../assets/moviePoster.png")}
            style={{ width: width, height: height * 0.55 }}
          />
          <LinearGradient
            colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
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
          {movieName}
        </Text>
        {/* Status, release, runtime */}
        <Text className="text-neutral-400 font-semibold text-base text-center">
          Released - 2020 - 170 min
        </Text>
        <View className="flex-row justify-center mx-4 space-x-2">
          <Text className="text-neutral-400 font-font-semibold text-base text-center">
            Action -
          </Text>
          <Text className="text-neutral-400 font-font-semibold text-base text-center">
            Thrill -
          </Text>
          <Text className="text-neutral-400 font-font-semibold text-base text-center">
            Comedy
          </Text>
        </View>
        <Text className="text-neutral-400 mx-4 tracking-wide text-center">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique,
          magnam ullam iure sint quae, reiciendis quia animi nisi dolores atque
          quaerat? Hic quae ex corrupti recusandae expedita voluptatibus!
          Eligendi, voluptas?
        </Text>
      </View>
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
