import React, { useCallback } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import ImageCarousel from '../components/ImageCarousel';
import one from "../assets/images/1.jpg";
import two from '../assets/images/2.jpg';
import three from '../assets/images/3.jpg';
import four from '../assets/images/4.jpg';

const Images = [one, two, three, four];
const Landing = (props: any) => {
    const SignPressHandler = useCallback((type: string) => {
        if (type === "Signup") {
            props.navigation.navigate("Signup");
        }
        else {
            props.navigation.navigate("Signin");
        }
    }, [])
    return (
        <View style={{ flex: 1, paddingTop: "10%", backgroundColor: "white" }}>
            <ImageCarousel images={Images} />
            <View style={styles.ButtonContainer}>
                <TouchableOpacity style={styles.Button}
                    onPress={SignPressHandler.bind(null, "Signin")}>
                        <Text style={[{ color: "white" }, styles.ButtonText]}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={SignPressHandler.bind(null, "Signup")}
                    style={[styles.Button, { backgroundColor: "white" }]}>
                    <Text style={[{ color: "#00aaff" }, styles.ButtonText]}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    ButtonContainer: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    Button: {
        height: "30%",
        width: "60%",
        marginBottom: "6%",
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: "#00aaff",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#00aaff"
    },
    ButtonText: {
        fontSize: 20,
        fontWeight: "bold"
    }
});
export default Landing;
