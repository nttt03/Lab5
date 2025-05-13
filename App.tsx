import { MyContextControllerProvider } from "./android/app/src/store";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./android/app/src/routers/Router";

const App = () => {
  const USERS = firestore().collection("USERS");
  const admin = {
    fullName: "Admin",
    email: "admin@gmail.com",
    password: "123456",
    phone: "1234567890",
    address: "Binh Duong",
    role: "admin"
  };

  useEffect(() => {
    const unsubscribe = USERS.doc(admin.email)
      .onSnapshot((snapshot) => {
        if (!snapshot.exists) {
          auth()
            .createUserWithEmailAndPassword(admin.email, admin.password)
            .then((response) => {
              return USERS.doc(admin.email).set(admin);
            })
            .then(() => {
              console.log("Add new account admin");
            })
            .catch((error) => {
              console.log("Lỗi tạo tài khoản:", error.message);
            });
        }
      }, (error) => {
        console.log("Lỗi snapshot:", error.message);
      });

    return () => unsubscribe();
  }, []);

  return (
    <MyContextControllerProvider>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </MyContextControllerProvider>
  );
};
export default App;