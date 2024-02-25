import { useNavigation } from "@react-navigation/native";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { style } from "../theme/";

const { width, height } = Dimensions.get("window");

const MovieList = ({ title, data, hideSeeAll }) => {
  const navigation = useNavigation();
  const movieName = "Ant-Man and Waspi: Quantumania";

  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between item-center">
        <Text className="text-white text-xl">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text className="text-lg" style={style.text}>
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data?.map((item, key) => (
          <TouchableWithoutFeedback
            key={key}
            onPress={() => navigation.navigate("Movie", item)}
          >
            <View className="space-y-1 mr-4">
              <Image
                className="rounded-3xl"
                style={{ width: width * 0.33, height: height * 0.22 }}
                source={require("../assets/moviePoster.png")}
              />
              <Text className="text-neutral-300 ml-1">
                {movieName.length > 14
                  ? movieName.slice(0, 14) + "..."
                  : { movieName }}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
};
export default MovieList;
