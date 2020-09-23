import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import {
  createStackNavigator,
  StackHeaderLeftButtonProps,
} from "@react-navigation/stack";
import { DrawerActions } from '@react-navigation/native';
import * as React from "react";
import { ColorSchemeName, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList, AuthStackParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import SignUp from "../screens/SignUp";
import Signin from "../screens/Signin";
import Landing from "../screens/Landing";

interface NavigationProps {
  colorScheme: ColorSchemeName;
  isAuth: boolean;
}
// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
const Navigation: React.FunctionComponent<NavigationProps> = ({
  colorScheme,
  isAuth,
}: NavigationProps) => {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      {isAuth ? <RootNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
export default Navigation;
// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitle: "Project Tracker",
        // eslint-disable-next-line react/display-name
      }}
    >
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={({ navigation }) => ({
          // eslint-disable-next-line react/display-name
          headerLeft: (props: StackHeaderLeftButtonProps) => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              style={{
                width: 35,
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons size={30} color={props.tintColor} name={"ios-menu"} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}

const AuthStack = createStackNavigator<AuthStackParamList>();

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Landing" component={Landing} />
      <AuthStack.Screen name="Signup" component={SignUp} />
      <AuthStack.Screen name="Signin" component={Signin} />
      <AuthStack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </AuthStack.Navigator>
  );
}
