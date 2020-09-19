import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const Home = (props: any) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const ScrollHandler = useCallback((event: any) => {
        const viewSize = event.nativeEvent.layoutMeasurement.width;
        const contentOffset = event.nativeEvent.contentOffset.x;
        const index = Math.floor(contentOffset / viewSize);
        setSelectedIndex(index);
    }, []);
    return (
        <View style={styles.ScreenContainer}>
            <ScrollView pagingEnabled
                horizontal
                onMomentumScrollEnd={ScrollHandler}>
                    <Text>Welcome</Text>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        width: "100%",
        padding:"10%"
    }
})
export default Home;