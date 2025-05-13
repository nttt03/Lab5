import { Image, View } from "react-native";
import { IconButton, Text } from "react-native-paper";

const Services = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require("../assets/logo.png")}
        style={{
          alignSelf: "center",
          marginVertical: 50,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 48, fontWeight: "bold" }}>
          Danh sách dịch vụ
        </Text>
        <IconButton
          icon={"plus-circle"}
          iconColor="red"
          size={48}
          onPress={() => navigation.navigate("AddNewService")}
        />
      </View>
    </View>
  );
};

export default Services;