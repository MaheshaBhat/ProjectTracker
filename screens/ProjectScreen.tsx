import * as React from "react";
import {
  StyleSheet,
  FlatList,
  Dimensions,
  View,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import { Text, View} from '../components/Themed';
import theme from '../constants/Colors';
import StyledText from '../components/StyledText';
// import { TouchableOpacity } from 'react-native-gesture-handler';

const projectData = [
  { id: 1, name: "Home and Hygine" },
  { id: 2, name: "Lux" },
  { id: 3, name: "Ayush" },
  { id: 4, name: "ALE" },
  { id: 5, name: "Advantage" },
];
const DEVICE_WIDTH = Dimensions.get("window").width;

const ProjectScreen: React.FunctionComponent = () => {
  return (
    <View style={styles.container}>
      {projectData.length !== 0 && (
        <View style={{ flex: 1 }}>
          {/* <StyledText style={styles.title}>Projects</StyledText> */}
          <FlatList
            style={{ width: "100%" }}
            contentContainerStyle={{
              width: "100%",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
            data={projectData}
            renderItem={({ item, index }) => (
              <TouchableOpacity style={styles.listItem} key={item.id + index}>
                <Ionicons
                  name="md-rocket"
                  size={24}
                  color={theme.light.projectColor}
                  style={{ marginRight: "2%" }}
                />
                <StyledText style={styles.listText}>{item.name}</StyledText>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
      {projectData.length === 0 && (
        <View
          style={{
            height: "100%",
            width: "100%",
            alignItems: "center",
            paddingTop: "30%",
          }}
        >
          <Ionicons
            name="md-rocket"
            size={50}
            color="#e6e6e6"
            style={{ marginRight: "2%" }}
          />
          <StyledText style={styles.TitleCase}>No Projects</StyledText>
        </View>
      )}
      <TouchableOpacity style={styles.AddButton}>
        <Ionicons name="md-add" size={36} color="#e6e6e6" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.light.background,
    paddingBottom: "5%",
    padding: "10%",
  },
  title: {
    fontSize: 25,
    fontWeight: "700",
    color: theme.light.titleColor,
    width: "100%",
    alignItems: "flex-start",
  },
  TitleCase: {
    fontSize: 25,
    fontWeight: '700',
    color: theme.light.text,

  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  listText: {
    color: theme.light.text,
    fontWeight:"normal"
  },
  listItem: {
    width: DEVICE_WIDTH - 70,
    marginTop: "6%",
    height: 35,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  AddButton: {
    backgroundColor: "#00aaff",
    height: 45,
    width: 45,
    borderRadius: 23,
    position: "absolute",
    bottom: 20,
    right: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProjectScreen;
