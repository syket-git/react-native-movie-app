import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { XMarkIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "../components/Loading";

const { width, height } = Dimensions.get("window");

const SearchScreen = () => {
  const [results, setResults] = useState([1, 2, 3, 4, 5, 6]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const movieName = "Ant-Man and Waspi: Quantumania";
  return (
    <SafeAreaView className={` bg-neutral-800 flex-1`}>
      <View className="mx-4 mt-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
          placeholder="Search Movie"
          placeholderTextColor="lightgray"
          className="pb-1 pl-6 flex-1 font-semibold text-white tracking-wider"
        />
        <TouchableOpacity
          className="rounded-full p-3 m-1 bg-neutral-500"
          onPress={() => navigation.navigate("Home")}
        >
          <XMarkIcon size="25" color="white" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <Loading />
      ) : results.length ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text className="text-white font-semibold ml-1">Results</Text>
          <View className="flex-row justify-between flex-wrap">
            {results.map((item, index) => (
              <TouchableWithoutFeedback
                onPress={() => navigation.push("Movie", item)}
                key={index}
              >
                <View className="space-y-2 mb-4">
                  <Image
                    source={require("../assets/moviePoster.png")}
                    style={{ width: width * 0.44, height: height * 0.3 }}
                  />
                  <Text className="text-neutral-300 ml-1">
                    {movieName?.length > 22
                      ? movieName.slice(0, 22) + "..."
                      : movieName}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <Image
            className="h-96 w-96"
            source={require("../assets/movieTime.png")}
          />
        </View>
      )}
    </SafeAreaView>
  );
};
export default SearchScreen;
