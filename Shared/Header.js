import React from "react"
import { StyleSheet, Image, View, Dimensions } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context';
var { height, width } = Dimensions.get('window')
const Header = () => {
    return (
        //<View style={styles.header}>
        <SafeAreaView style={styles.header}>

            <Image
                source={require("../assets/Logo.png")}
                resizeMode="contain"
                style={{ height: 50 }}
            />

        </SafeAreaView>
        //</View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        flexDirection: 'row',
        alignContent: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 20,
    }
})

export default Header;