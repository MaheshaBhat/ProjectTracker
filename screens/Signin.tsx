import React, { useCallback, useState } from "react";
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { _storeData } from "../functions/SecureStore";
import email from "../assets/images/email_icon.jpg";
import password from "../assets/images/password_icon.png";
import google from "../assets/images/google_icon.png";
import facebook from "../assets/images/facebook_icon.png";
import { HOST_URL } from "../constants/Values";

const Signin = (props: any) => {
  const [Email, setEmail] = useState("cinisusan2010@gmail.com");
  const [Password, setPassword] = useState("Cini@123");
  const [Val, setVal] = useState("");

  const emailHandler = useCallback((text: string) => {
    setEmail(text);
  }, []);

  const passwordHandler = useCallback((text: string) => {
    setPassword(text);
  }, []);

  const loginPressHandler = useCallback(async () => {
    if (Email.trim() === "") {
      setVal("Please enter the email");
    } else if (Password.trim() === "") {
      setVal("Please enter your password");
    } else {
      //const link = `${await HOST_URL()}/api/Login`;
      console.log(await HOST_URL());
      const link='http://192.168.111.110:3000/api/login';
      fetch(encodeURI(link), {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: Email,
          password: Password,
        }),
      })
        .then((response: any) => {
          //console.log(response);
          response.text().then((data: string) => {
            //console.log(data);
            if (data === "logged in") {
              const auth_token = response.headers.map["auth-token"];
              setVal("");
              _storeData("token", auth_token ? auth_token : "");
              props.navigation.navigate("Root");
            } else {
              //console.log(data);
              setVal(data);
            }
          });
        })

        .catch((err) => {
          //console.log(err);
        });
    }
  }, [Email, Password]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign in</Text>
      <View style={styles.inputContainer}>
        <Image source={email} style={styles.icons} />
        <TextInput
          value={Email}
          style={styles.input}
          onChangeText={emailHandler}
          placeholder="Your Email"
        />
      </View>
      <View style={styles.inputContainer}>
        <Image source={password} style={styles.icons} />
        <TextInput
          value={Password}
          style={styles.input}
          onChangeText={passwordHandler}
          secureTextEntry={true}
          placeholder="Choose Password"
        />
      </View>
      <TouchableOpacity
        onPress={loginPressHandler}
        style={[
          styles.button,
          {
            backgroundColor: "#00aaff",
            marginTop: "4%",
            paddingLeft: "0%",
            justifyContent: "center",
          },
        ]}
      >
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>
      <Text style={{ color: "#00aaff", height: "5%", marginBottom: "4%" }}>
        {"Forgot your Password?"}
      </Text>
      <Text style={styles.validationMessage}>{Val}</Text>
      <Text style={styles.greyText}>or with one of these services</Text>
      <TouchableOpacity style={[{ backgroundColor: "#d54c3f" }, styles.button]}>
        <Image source={google} style={styles.icons} />
        <Text style={styles.buttonText}>Sign in With Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[{ backgroundColor: "#3a559f" }, styles.button]}>
        <Image source={facebook} style={styles.icons} />
        <Text style={styles.buttonText}>Sign in With Facebook</Text>
      </TouchableOpacity>
      <Text
        style={[
          { marginTop: "7%", width: "84%", justifyContent: "center" },
          styles.greyText,
        ]}
      >
        By signing up you agree with our terms and to recieve periodic product
        updates and tips.
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "20%",
    padding: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    borderStyle: "solid",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "5%",
    width: "90%",
    height: "7%",
  },
  icons: {
    height: 15,
    width: 15,
    marginRight: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  button: {
    height: "8%",
    width: "80%",
    marginBottom: "4%",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: "5%",
    borderRadius: 5,
  },
  heading: {
    fontSize: 20,
    width: "89%",
    marginBottom: "6%",
  },
  input: {
    flex: 1,
  },
  greyText: {
    color: "grey",
    fontSize: 12,
    marginBottom: "2%",
  },
  validationMessage: {
    color: "#d54c3f",
    height: "5%",
    textTransform: "capitalize",
    marginBottom: "10%",
    fontSize: 15,
  },
});
export default Signin;
