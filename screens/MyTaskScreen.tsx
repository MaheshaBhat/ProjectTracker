import { AntDesign, Fontisto, Ionicons } from "@expo/vector-icons";
import * as React from "react";
import {
  StyleSheet,
  FlatList,
  Dimensions,
  View,
  TouchableOpacity,
} from "react-native";
// import { AntDesign } from '@yexpo/vector-icons';
import StyledText from "../components/StyledText";
import { isBefore, parse } from "date-fns";
import theme from "../constants/Colors";

const taskData = [
  {
    id: 1,
    projectName: "Home and Hygine",
    task: "Fix bug",
    due: "22/09/2020",
    completed: false,
  },
  {
    id: 2,
    projectName: "Lux",
    task: "Meeting",
    due: "22/09/2020",
    completed: false,
  },
  {
    id: 3,
    projectName: "Ayush",
    task: "QC",
    due: "23/09/2020",
    completed: false,
  },
  {
    id: 4,
    projectName: "ALE",
    task: "Testing",
    due: "24/09/2020",
    completed: false,
  },
  {
    id: 5,
    projectName: "Advantage",
    task: "Demo",
    due: "24/09/2020",
    completed: false,
  },
];
const today = new Date();
const DEVICE_WIDTH = Dimensions.get("window").width;

const MyTaskScreen: React.FunctionComponent = () => {
  return (
    <View style={styles.container}>
      {/* <StyledText style={styles.title}>My Tasks</StyledText> */}
      {taskData.length !== 0 && (
        <FlatList
          style={{ width: "100%" }}
          contentContainerStyle={{
            width: "100%",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
          data={taskData}
          renderItem={({ item, index }) => {
            const due = parse(item.due, "dd/MM/yyyy", today);
            const check = isBefore(today, due);
            return (
              <TouchableOpacity style={styles.listItem} key={item.id + index}>
                <View style={styles.itemRow}>
                  <Ionicons
                    name="md-rocket"
                    size={20}
                    color={theme.light.projectColor}
                    style={{ marginRight: "2%" }}
                  />
                  <StyledText style={{ color: theme.light.projectColor,fontWeight:"bold"  }}>
                    {item.projectName}
                  </StyledText>
                </View>
                <View style={styles.itemRow}>
                  <StyledText style={{ color: theme.light.text }}>Task : {item.task}</StyledText>
                </View>
                <View style={styles.itemRow}>
                  <Fontisto
                    name="date"
                    size={16}
                    color={check ? "blue" : "orange"}
                    style={{ marginRight: "2%" }}
                  />

                  <StyledText style={{ color: check ? "blue" : "orange" }}>
                    {item.due}
                  </StyledText>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
      {taskData.length === 0 && (
        <View
          style={{
            height: "100%",
            width: "100%",
            alignItems: "center",
            paddingTop: "50%",
          }}
        >
          <AntDesign name="checkcircleo" size={50} color="#e6e6e6" />
          <StyledText style={styles.TitleCase}>No Tasks</StyledText>
          <StyledText style={[styles.TitleCase, { fontSize: 12 }]}>
            Grab a coffee
          </StyledText>
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
    justifyContent: "flex-start",
    backgroundColor: theme.light.background,
    paddingBottom: "5%",
    padding: "5%"
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
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
    width: "80%",
  },
  listText: {
    color: theme.light.text
  },
  listItem: {
    width: DEVICE_WIDTH - 75,
    marginTop: "5%",
    height: 80,
    display: "flex",
    flexDirection: "column",
    // borderBottomColor: "grey",
    // borderBottomWidth: 1,
    backgroundColor: theme.light.taskItemColor,
    borderRadius: 10,
    padding: "2%",
    paddingLeft:"5%",
    paddingRight:"5%",
    borderColor:"silver",
    borderWidth:1,
  },
  itemRow: {
    height: "10%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: "7%"
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
    justifyContent: "center"
  }
});
export default MyTaskScreen;
