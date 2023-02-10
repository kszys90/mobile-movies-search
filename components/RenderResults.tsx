import React from 'react'
import { GestureResponderEvent, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { addBookmark, bookmark, bookmarksSliceState, removeBookmark } from '../state/bookmarks'
import { movie } from '../types'



export const RenderResults: React.FC<{ state: Array<movie> | bookmarksSliceState, tab: string }> = ({ state, tab }) => {
    const dispatch = useAppDispatch()
    const bookmarks = useAppSelector(state => state.bookmarks.bookmarks)

    function handlePress(event: GestureResponderEvent, movie: movie | bookmark) {
        if (tab === 'search') {
            const currentMovie = {
                imdbID: movie.imdbID,
                Title: movie.Title,
                Year: movie.Year,
                Type: movie.Type,
                Poster: movie.Poster
            }
            dispatch(addBookmark(currentMovie))
        }
        if (tab === 'bookmarks') {
            const currentEl = { imdbID: movie.imdbID }
            dispatch(removeBookmark(currentEl))
        }
    }

    function isInBookmarks(id: string) {
        let result = false
        if (tab === 'search') {
            bookmarks.forEach((item) => {
                if (item.imdbID === id) { result = true }
            })
        }
        return result
    }

    return (
        <View>
            {Array.isArray(state) ?
                state.map((movie: movie) => {
                    return (
                        <View key={movie.imdbID} style={styles.container}>
                            <Text style={styles.title}>{movie.Title}</Text>
                            <Text style={styles.text}>Year: {movie.Year} | Type: {movie.Type}</Text>
                            {movie.Poster === 'N/A' ?
                                <Text style={styles.textNoImg}>Image unavailable</Text>
                                :
                                <Image source={{ uri: movie.Poster }} style={{ width: '100%', height: 250, resizeMode: 'contain' }} />
                            }
                            {isInBookmarks(movie.imdbID) ?
                                null
                                :
                                <TouchableOpacity
                                    style={styles.buttonSearch}
                                    onPress={(event) => handlePress(event, movie)}
                                >
                                    <Text style={styles.buttonText}>{tab === 'search' ? 'Add to Favorites' : 'Remove'}</Text>
                                </TouchableOpacity>}
                        </View>
                    )
                })
                :
                null}
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        maxWidth: '85%',
        minHeight: 100,
        backgroundColor: '#262626',
        marginBottom: 30,
        padding: 10
    },
    title: {
        color: 'white',
        margin: 10,
        fontWeight: '900',
        fontSize: 16
    },
    text: {
        color: 'white',
        margin: 10
    },
    textNoImg: {
        color: 'white',
        margin: 30,
    },
    buttonSearch: {
        alignItems: 'center',
        backgroundColor: 'black',
        borderColor: 'white',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginTop: 15
    },
    buttonText: {
        color: 'white'
    },
})