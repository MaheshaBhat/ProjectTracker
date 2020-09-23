/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/display-name */
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
} from "@react-navigation/stack";
import * as React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import TabOneScreen from "../screens/TabOneScreen";
import ProjectScreen from "../screens/ProjectScreen";
import MyTaskScreen from "../screens/MyTaskScreen";
import TabFourScreen from "../screens/TabFourScreen";
import {
  BottomTabParamList,
  TabOneParamList,
  TabTwoParamList,
  TabThreeParamList,
  TabFourParamList,
} from "../types";
import AuthContext from "../context/AuthContext";
import { _deleteData } from "../functions/SecureStore";
import layout from "../constants/Layout";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator: React.FunctionComponent = () => {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }: { color: string }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Projects"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }: { color: string }) => (
            <TabBarIcon name="ios-checkbox-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Tasks"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: ({ color }: { color: string }) => (
            <TabBarIcon name="ios-paper-plane" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="TabFour"
        component={TabFourNavigator}
        options={{
          tabBarIcon: ({ color }: { color: string }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

//export default BottomTabNavigator;
// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TabOneNavigator({ navigation }: { navigation: any }) {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        // options={{
        //   headerTitle: "Checklist",
        //   //headerLeftContainerStyle: { padding: 20 },
        //   //headerStyle: { flex: 1 },
        //   headerTitleAlign: "left",
        //   headerLeft: (props: StackHeaderLeftButtonProps) => (
        //     <TouchableOpacity
        //       onPress={() => navigation.toggleDrawer()}
        //       style={{
        //         width: 35,
        //         height: "100%",
        //         justifyContent: "center",
        //         alignItems: "center",
        //       }}
        //     >
        //       <Ionicons size={30} color={props.tintColor} name={"ios-menu"} />
        //     </TouchableOpacity>
        //   ),
        // }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TabTwoNavigator({ navigation }: { navigation: any }) {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="ProjectScreen"
        component={ProjectScreen}
        // options={{
        //   headerTitle: "Checklist",
        //   //headerLeftContainerStyle: { padding: 20 },
        //   //headerStyle: { flex: 1 },
        //   headerTitleAlign: "left",
        // }}
          
      />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator<TabThreeParamList>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TabThreeNavigator({ navigation }: { navigation: any }) {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="MyTaskScreen"
        component={MyTaskScreen}
        // options={{
        //   headerTitle: "Checklist",
        //   headerLeft: (props: StackHeaderLeftButtonProps) => (
        //     <TouchableOpacity
        //       onPress={() => navigation.toggleDrawer()}
        //       style={{
        //         width: 35,
        //         height: "100%",
        //         justifyContent: "center",
        //         alignItems: "center",
        //       }}
        //     >
        //       <Ionicons size={30} color={props.tintColor} name={"ios-menu"} />
        //     </TouchableOpacity>
        //   ),
        // }}
      />
    </TabThreeStack.Navigator>
  );
}

const TabFourStack = createStackNavigator<TabFourParamList>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TabFourNavigator({ navigation }: { navigation: any }) {
  return (
    <TabFourStack.Navigator>
      <TabFourStack.Screen
        name="TabFourScreen"
        component={TabFourScreen}
        // options={{
        //   headerTitle: "Checklist",
        //   //headerLeftContainerStyle: { padding: 20 },
        //   //headerStyle: { flex: 1 },
        //   headerTitleAlign: "left",
        //   headerLeft: (props: StackHeaderLeftButtonProps) => (
        //     <TouchableOpacity
        //       onPress={() => navigation.toggleDrawer()}
        //       style={{
        //         width: 35,
        //         height: "100%",
        //         justifyContent: "center",
        //         alignItems: "center",
        //       }}
        //     >
        //       <Ionicons size={30} color={props.tintColor} name={"ios-menu"} />
        //     </TouchableOpacity>
        //   ),
        // }}
      />
    </TabFourStack.Navigator>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomDrawerContent(props: any) {
  const setAuth = React.useContext(AuthContext)?.setAuth;
  const logout = React.useCallback(async () => {
    await _deleteData("token");
    setAuth(false);
  }, [setAuth]);
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Logout"
        onPress={logout}
        icon={({ color }) => (
          <Ionicons color={color} size={30} name={"ios-log-out"} {...props} />
        )}
      />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

export default function LeftDrawer() {
  
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      edgeWidth={layout.window.width / 2}
    >
      <Drawer.Screen
        name="root"
        component={BottomTabNavigator}
        // options={{
        //   drawerLabel: () => null,
        //   title: undefined,
        //   drawerIcon: () => null,
        // }}
      />
    </Drawer.Navigator>
  );
}
