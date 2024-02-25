import { useNavigation, useRoute } from "@react-navigation/native";
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
  fetchPersonDetails,
  fetchPersonMovies,
  image342,
} from "../api/movieDB";
import Loading from "../components/Loading";
import MovieList from "../components/MovieList";
import { style } from "../theme";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";
const verticalMargin = ios ? "" : "my-3";

const PersonScreen = () => {
  const { params: item } = useRoute();
  const [favorite, setFavorite] = useState(false);
  const navigation = useNavigation();
  const [person, setPerson] = useState(null);
  const [personMovies, setPersonMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPersonDetails(item.id);
    getPersonMovies(item.id);
  }, []);

  const getPersonDetails = async (id) => {
    const data = await fetchPersonDetails(id);
    if (data) {
      setPerson(data);
    }
    setLoading(false);
  };
  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id);
    if (data && data.cast) {
      setPersonMovies(data.cast);
    }
    setLoading(false);
  };

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

      {loading ? (
        <Loading />
      ) : (
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
                source={{
                  uri: image342(person?.profile_path) || fallbackMoviePoster,
                }}
                style={{ height: height * 0.43, width: width * 0.74 }}
              />
            </View>
          </View>
          <View className="mt-6">
            <Text className="text-3xl text-white font-bold text-center">
              {person?.name}
            </Text>
            <Text className="text-base text-neutral-500 text-center">
              {person?.place_of_birth}
            </Text>
          </View>
          <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
            <View className="border-r-2 border-r-neutral-400 px-2 items-center bg-neutral-700">
              <Text className="text-white font-semibold">Gender</Text>
              <Text className="text-neutral-300  font-sm">
                {person?.gender === 1 ? "Female" : "Male"}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center bg-neutral-700">
              <Text className="text-white font-semibold">Birthday</Text>
              <Text className="text-neutral-300  font-sm">
                {person?.birthday}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center bg-neutral-700">
              <Text className="text-white font-semibold">Known for</Text>
              <Text className="text-neutral-300  font-sm">
                {person?.known_for_department}
              </Text>
            </View>
            <View className=" items-center bg-neutral-700">
              <Text className="text-white font-semibold">Popularity</Text>
              <Text className="text-neutral-300  font-sm">
                {person?.popularity?.toFixed(2)} %{" "}
              </Text>
            </View>
          </View>
          <View className="my-6 mx-4 space-y-2">
            <Text className="text-white text-lg">Biography</Text>
            <Text className="text-neutral-400 tracking-wide">
              {person?.biography}
            </Text>
          </View>
          {/* Movies */}
          <MovieList title="Movies" hideSeeAll={true} data={personMovies} />
        </View>
      )}
    </ScrollView>
  );
};
export default PersonScreen;
