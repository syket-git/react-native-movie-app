import { Dimensions, View } from "react-native";
import * as Progress from "react-native-progress";
import { theme } from "../theme";
const { width, height } = Dimensions.get("window");

const Loading = () => {
  return (
    <View
      style={{ height, width }}
      className="absolute flex-row justify-center items-center"
    >
      <Progress.CircleSnail
        thickness={10}
        size={150}
        color={theme.background}
      />
    </View>
  );
};
export default Loading;
