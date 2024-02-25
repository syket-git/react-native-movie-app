import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { fallbackMoviePoster, image185 } from "../api/movieDB";
const Cast = ({ cast, navigation }) => {
  return (
    <View className="my-6">
      <Text className="text-white text-lg mx-4 mb-5">Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast &&
          cast.map((person, index) => (
            <TouchableOpacity
              key={index}
              className="mr-4 items-center"
              onPress={() => navigation.navigate("Person", person)}
            >
              <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500">
                <Image
                  source={{
                    uri: image185(person.profile_path) || fallbackMoviePoster,
                  }}
                  className="rounded-2xl h-24 w-20"
                />
              </View>
              <Text className="text-white text-xs mt-1">
                {person?.original_name?.length > 10
                  ? person?.original_name.slice(0, 10) + "..."
                  : person?.original_name}
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};
export default Cast;
