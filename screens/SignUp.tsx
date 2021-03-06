import React, { useCallback, useState } from "react";
import {
  View,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthScreenNavigationProp } from "../types";

// import { _storeData } from "../functions/SecureStore";
import { HOST_URL } from "../constants/Values";
import {
  MaterialIcons,
  EvilIcons,
  Entypo,
  AntDesign,
} from "@expo/vector-icons";

interface Props {
  navigation: AuthScreenNavigationProp;
}

const SignUp: React.FunctionComponent<Props> = (props: Props) => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Val, setVal] = useState("");

  const nameHandler = useCallback((text: string) => {
    setName(text);
  }, []);

  const emailHandler = useCallback((text: string) => {
    setEmail(text);
  }, []);

  const passwordHandler = useCallback((text: string) => {
    setPassword(text);
  }, []);

  const SignupPressHandler = useCallback(async () => {
    if (Name.trim() === "") {
      setVal("Name field is required");
    } else if (Email.trim() === "") {
      setVal("Email field is required");
    } else if (Password.trim() === "") {
      setVal("Password field is required");
    } else {
      const link = `http://192.168.111.110:3000/api/SignUp`;
      fetch(encodeURI(link), {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: Name,
          username: Email,
          password: Password,
        }),
      })
        .then((response) => {
          return response.text();
        })
        .then((data: string) => {
          if (data === "registered") {
            Alert.alert(
              "Info",
              "You have registered successfully. Login to continue"
            );
            props.navigation.navigate("Signin");
          } else {
            setVal(data);
          }
        })

        .catch((err) => {
          console.log(err);
        });
    }
  }, [Name, Email, Password]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign Up</Text>
      <View style={styles.inputContainer}>
        <AntDesign name="user" size={24} color="black" style={styles.icons} />

        <TextInput
          placeholder="Name"
          style={styles.input}
          value={Name}
          onChangeText={nameHandler}
        />
      </View>
      <View style={styles.inputContainer}>
        <MaterialIcons
          name="email"
          size={24}
          color="black"
          style={styles.icons}
        />
        <TextInput
          value={Email}
          style={styles.input}
          onChangeText={emailHandler}
          placeholder="Your Email"
        />
      </View>
      <View style={styles.inputContainer}>
        <Entypo name="lock" size={24} color="black" style={styles.icons} />
        <TextInput
          value={Password}
          style={styles.input}
          onChangeText={passwordHandler}
          secureTextEntry={true}
          placeholder="Choose Password"
        />
      </View>
      <TouchableOpacity
        onPress={SignupPressHandler}
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
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      {/* <Text style={{ color: "#00aaff", height: "5%", marginBottom: "9%" }}>
              
            </Text> */}
      <Text style={styles.validationMessage}>{Val}</Text>
      <Text style={styles.greyText}>or with one of these services</Text>
      <TouchableOpacity style={[{ backgroundColor: "#d54c3f" }, styles.button]}>
        <EvilIcons
          name="sc-google-plus"
          size={24}
          color="white"
          style={styles.icons}
        />
        <Text style={styles.buttonText}>Sign Up With Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[{ backgroundColor: "#3a559f" }, styles.button]}>
        <EvilIcons
          name="sc-facebook"
          size={24}
          color="white"
          style={styles.icons}
        />
        <Text style={styles.buttonText}>Sign Up With Facebook</Text>
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
    marginRight: "2%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
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
export default SignUp;
