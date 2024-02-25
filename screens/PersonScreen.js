import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
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
import MovieList from "../components/MovieList";
import { style } from "../theme";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";
const verticalMargin = ios ? "" : "my-3";

const PersonScreen = () => {
  const [favorite, setFavorite] = useState(false);
  const navigation = useNavigation();
  const [personMovies, setPersonMovies] = useState([1, 2, 3, 4, 5, 6, 7, 8]);

  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <SafeAreaView
        className={`${verticalMargin} z-20 w-full flex-row justify-between item-center px-4`}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={style.background}
          className="rounded-xl p-1"
        >
          <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFavorite(!favorite)}>
          <HeartIcon size="35" color={`${favorite ? "red" : "white"}`} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Person details */}
      <View>
        <View
          className="flex-row justify-center"
          style={{
            shadowColor: "gray",
            shadowRadius: 40,
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 1,
          }}
        >
          <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500">
            <Image
              source={require("../assets/moviePoster.png")}
              style={{ height: height * 0.43, width: width * 0.74 }}
            />
          </View>
        </View>
        <View className="mt-6">
          <Text className="text-3xl text-white font-bold text-center">
            Keanu Reeves
          </Text>
          <Text className="text-base text-neutral-500 text-center">
            London, United Kingdom
          </Text>
        </View>
        <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
          <View className="border-r-2 border-r-neutral-400 px-2 items-center bg-neutral-700">
            <Text className="text-white font-semibold">Gender</Text>
            <Text className="text-neutral-300  font-sm">Male</Text>
          </View>
          <View className="border-r-2 border-r-neutral-400 px-2 items-center bg-neutral-700">
            <Text className="text-white font-semibold">Birthday</Text>
            <Text className="text-neutral-300  font-sm">06-06-2001</Text>
          </View>
          <View className="border-r-2 border-r-neutral-400 px-2 items-center bg-neutral-700">
            <Text className="text-white font-semibold">Known for</Text>
            <Text className="text-neutral-300  font-sm">Acting</Text>
          </View>
          <View className=" items-center bg-neutral-700">
            <Text className="text-white font-semibold">Popularity</Text>
            <Text className="text-neutral-300  font-sm">64.23 </Text>
          </View>
        </View>
        <View className="my-6 mx-4 space-y-2">
          <Text className="text-white text-lg">Biography</Text>
          <Text className="text-neutral-400 tracking-wide">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            nemo ullam animi maiores, similique impedit numquam corporis
            voluptas tempore porro, perspiciatis, rerum inventore pariatur
            blanditiis quasi molestias sapiente fugiat totam.
          </Text>
        </View>
        {/* Movies */}
        <MovieList title="Movies" hideSeeAll={true} data={personMovies} />
      </View>
    </ScrollView>
  );
};
export default PersonScreen;
