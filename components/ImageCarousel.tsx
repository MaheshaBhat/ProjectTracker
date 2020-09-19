import React, { useCallback, useState } from "react";
import { StyleSheet, View, ScrollView, Dimensions, Image } from "react-native";

const DEVICE_WIDTH = Dimensions.get("window").width;

const ImageCarousel = (props:any) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const ImageScrollHandler = useCallback((event:any) => {
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffset / viewSize);
    setSelectedIndex(index);
  }, []);

  return (
    <View style={{ flex: 3, width: "100%" }}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={ImageScrollHandler}
      >
        {props.images.map((image: any, index: number) => {
          return <Image key={index} source={image} style={styles.Image} />;
        })}
      </ScrollView>
      <View style={styles.CircleDiv}>
        {props.images.map((image: any, index:number) => {
          return (
            <View
              key={index}
              style={[
                styles.WhiteCircle,
                {
                  backgroundColor: index === selectedIndex ? "#00aaff" : "grey",
                },
              ]}
            ></View>
          );
        })}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  Image: {
    height: "100%",
    width: DEVICE_WIDTH,
  },
  WhiteCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    margin: 5,
    backgroundColor: "grey",
  },
  CircleDiv: {
    position: "absolute",
    bottom: 2,
    height: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
export default ImageCarousel;
