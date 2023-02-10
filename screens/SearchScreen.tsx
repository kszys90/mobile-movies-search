import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, NativeSyntheticEvent, ScrollView, StyleSheet, Text, TextInput, TextInputChangeEventData, TouchableOpacity, View } from "react-native";
import { ScreenTemplate } from '../components/ScreenTemplate'
import { RenderResults } from "../components/RenderResults";
import { searchStateType } from "../types";

const API_KEY = process.env.REACT_APP_API_KEY || 'df031d61'



export default function SearchScreen() {
    let ScreenHeight = Dimensions.get("window").height
    const navigation = useNavigation();
    const [text, setText] = React.useState('');
    const [searchState, setSearchState] = React.useState<searchStateType>({ Error: '', Response: '' })
    const [isLoading, setIsLoading] = React.useState(false)
    const [hasError, setHasError] = React.useState(false)

    const getSearchData = React.useCallback((text: string) => {
        setIsLoading(true)
        fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${text}`)
            .then((r) => r.json())
            .then((responseData) => { setSearchState(responseData) })
            .catch((error) => setHasError(error))
            .finally(() => setIsLoading(false))
    }, [])


    function handleSubmit() {
        if (text !== '') {
            getSearchData(text)
        }
        else {
            setSearchState({ Error: '', Response: '' })
        }
    }
    function handleChange(e: NativeSyntheticEvent<TextInputChangeEventData>) {
        setText(e.nativeEvent.text)
    }

    return (
        <ScrollView contentContainerStyle={styles.outer}>
            <ScreenTemplate>
                <View style={styles.backgroundContainer}>
                    <View style={styles.navContainer}>
                        <TouchableOpacity style={styles.button}
                            onPress={() => navigation.navigate('Favorites')}
                        >
                            <Text style={styles.buttonText}>Favorites</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.title}>MOVIES DATABASE</Text>
                    <View style={styles.searchTools}>
                        <TextInput
                            placeholder="Movie name..."
                            placeholderTextColor={'grey'}
                            style={styles.input}
                            onChange={handleChange}
                            value={text}
                        />
                        <TouchableOpacity style={styles.buttonSearch}
                            onPress={handleSubmit}
                        >
                            <Text style={styles.buttonText}>Search</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        {isLoading ?
                            <Text style={styles.text}>Loading...</Text>
                            :
                            hasError ?
                                <Text style={styles.text}>Error loading movies</Text>
                                :
                                searchState.Response === 'False' ?
                                    <Text style={styles.text}>No data</Text>
                                    :
                                    searchState.Response !== '' && searchState.Search && searchState.Search.length > 0 ?
                                        <RenderResults state={searchState.Search} tab={'search'} />
                                        :
                                        null
                        }
                    </View>
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
        paddingTop: 10,
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