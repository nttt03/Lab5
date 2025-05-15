import { View,Image } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import { login, useMyContextController } from "../store";

const Login = ({ navigation }) => {
  const [controller, dispatch] = useMyContextController();
  const { userLogin } = controller;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hiddenPassword, setHiddenPassword] = useState(true);

  const hasErrorEmail = () => !email.includes("@");
  const hasErrorPassword = () => password.length < 6;

  const handleLogin = (dispatch, email, password) => {
    login(dispatch, email, password);
  };

  useEffect(() => {
    if (userLogin != null) {
      if (userLogin.role === "admin") {
        navigation.navigate("Admin");
      } else {
        navigation.navigate("Home");
      }
    }
  }, [userLogin]);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Image
              source={require("../assets/login.png")}
              style={{
                alignSelf: "center",
                marginVertical: 50,
                width: 150,
                height: 150
              }}
            />
      <TextInput
        label={"Email"}
        value={email}
        onChangeText={setEmail}
      />
      <HelperText type="error" visible={hasErrorEmail()}>
        Địa chỉ Email không hợp lệ
      </HelperText>
      <TextInput
        label={"Password"}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={hiddenPassword}
        right={<TextInput.Icon icon={"eye"} onPress={() => setHiddenPassword(!hiddenPassword)} />}
      />
      <HelperText type="error" visible={hasErrorPassword()}>
        Password phải 6 ký tự
      </HelperText>
      <Button
        mode="contained"
        buttonColor="#ff4081"
        onPress={() => handleLogin(dispatch, email, password)}
      >
        Login
      </Button>
      <View
        style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}
      >
        <Button onPress={() => navigation.navigate("Register")}>
          Create new account
        </Button>
      </View>
      <View
        style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}
      >
        <Button onPress={() => navigation.navigate("ForgotPassword")}>
          Forgot Password
        </Button>
      </View>
    </View>
  );
};
export default Login;