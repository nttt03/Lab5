import React from 'react';
// import { createStackNavigator } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Customer from '../screens/Customer';
import Admin from '../screens/Admin';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Customer" component={Customer} />
      <Stack.Screen name="Admin" component={Admin} />
    </Stack.Navigator>
  );
};

export default Router;