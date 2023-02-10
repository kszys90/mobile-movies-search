import { useNavigation } from "@react-navigation/native";
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RenderResults } from "../components/RenderResults";
import { ScreenTemplate } from "../components/ScreenTemplate";
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks'


export default function SearchScreen() {
    const navigation = useNavigation();
    const bookmarks = useAppSelector(state => state.bookmarks.bookmarks)
    const dispatch = useAppDispatch()

    return (
        <ScrollView contentContainerStyle={styles.outer}>
            <ScreenTemplate>
                <View style={styles.backgroundContainer}>
                    {bookmarks ?
                        <RenderResults state={bookmarks} tab={'bookmarks'} />
                        :
                        null
                    }
                </View>
            </ScreenTemplate >
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    outer: {
        minHeight: '100%'
    },
    backgroundContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        margin: 0,
        flex: 1,
        overflow: 'scroll'
    },
    navContainer: {
        alignSelf: 'flex-end',
        marginRight: 20
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'black',
        borderColor: 'white',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5
    },
    buttonSearch: {
        alignItems: 'center',
        backgroundColor: 'black',
        borderColor: 'white',
        borderWidth: 1,
        padding: 10,
        paddingTop: 13,
        paddingBottom: 13,
        borderRadius: 5
    },
    buttonText: {
        color: 'white'
    },
    title: {
        marginTop: 15,
        marginBottom: 8,
        color: 'red',
        fontSize: 26,
        fontWeight: '900',
    },
    searchTools: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    input: {
        width: '65%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color: 'white',
        borderColor: 'white',
    },
    text: {
        color: 'white'
    }
})