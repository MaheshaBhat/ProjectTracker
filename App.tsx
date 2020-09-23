import { StatusBar } from "expo-status-bar";
import React, { useEffect, useCallback, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import AuthContext from "./context/AuthContext";
import { _retrieveData } from "./functions/SecureStore";


export default function App() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const colorScheme = useColorScheme();

  const setAuth = useCallback((flag: boolean) => {
    setIsAuth(flag);
  }, []);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      let auth = false;
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
        });

        //verify token before automatic login
        const auth_token = await _retrieveData("token");
        const link = "http://192.168.111.110:3000/api/ValidToken";
        const res = await fetch(encodeURI(link), {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "auth-token": auth_token ? auth_token : "",
          },
        });
        const result = await res.json();
        if (result && !!auth_token) {
          auth = true;
        }
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        //console.warn(e);
      } finally {
        setIsAuth(auth);
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthContext.Provider value={{ setAuth }}>
          <Navigation colorScheme={colorScheme} isAuth={isAuth} />
        </AuthContext.Provider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
