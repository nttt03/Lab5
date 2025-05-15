import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { Text as PaperText } from "react-native-paper";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const Home = () => {
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      console.log("Current User Email:", currentUser.email); // Debug email

      const unsubscribeUser = firestore()
        .collection("USERS")
        .where("email", "==", currentUser.email)
        .onSnapshot(
          (querySnapshot) => {
            if (!querySnapshot.empty) {
              const doc = querySnapshot.docs[0];
              console.log("User data:", doc.data()); // Debug user data
              setUser(doc.data());
            } else {
              console.log("Không tìm thấy user với email:", currentUser.email);
            }
          },
          (error) => {
            console.log("Lỗi lấy thông tin user:", error.message);
          }
        );

      const unsubscribeServices = firestore()
        .collection("SERVICES")
        .onSnapshot(
          (querySnapshot) => {
            const serviceList = [];
            querySnapshot.forEach((doc) => {
              serviceList.push({ id: doc.id, ...doc.data() });
            });
            console.log("Services data:", serviceList); // Debug danh sách dịch vụ
            setServices(serviceList);
          },
          (error) => {
            console.log("Lỗi lấy dịch vụ:", error.message);
          }
        );

      return () => {
        unsubscribeUser();
        unsubscribeServices();
      };
    } else {
      console.log("No user logged in");
    }
  }, []);

  // Render mỗi mục dịch vụ
  const renderServiceItem = ({ item }) => (
    <TouchableOpacity
      style={styles.serviceItem}
      onPress={() => {}}
    >
      <Image
        source={require("../assets/service.png")}
        style={styles.serviceImage}
      />
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceName}>{item.name}</Text>
        <Text style={styles.servicePrice}>
          {item.price.toLocaleString("vi-VN")}đ
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
      />
      <Text style={styles.welcome}>Chào mừng, {user?.fullName || "Khách hàng"}!</Text>
      <PaperText style={styles.info}>Email: {user?.email || "Chưa có"}</PaperText>
      <PaperText style={styles.info}>Phone: {user?.phone || "Chưa có"}</PaperText>
      <Text style={styles.serviceTitle}>Danh sách dịch vụ</Text>
      <FlatList
        data={services}
        renderItem={renderServiceItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>Không có dịch vụ nào</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  logo: {
    alignSelf: "center",
    marginVertical: 20,
  },
  welcome: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ff4081",
    textAlign: "center",
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
    color: "gray",
    textAlign: "center",
  },
  serviceTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#ff4081",
  },
  listContainer: {
    paddingBottom: 15,
  },
  serviceItem: {
    flexDirection: "row",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    elevation: 2,
  },
  serviceImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  serviceInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  serviceName: {
    fontSize: 18,
    fontWeight: "bold",
    flexShrink: 1,
  },
  servicePrice: {
    fontSize: 16,
    color: "gray",
  },
  emptyText: {
    textAlign: "center",
    color: "gray",
    marginTop: 20,
  },
});

export default Home;
