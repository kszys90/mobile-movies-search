import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";


export interface RemoveBookmarkActionType {
    imdbID: string
}

export interface bookmark {
    Title: string
    imdbID: string
    Year: string
    Type: string
    Poster: string
}

export interface bookmarksSliceState {
    bookmarks: bookmark[]
}

const initialState: bookmarksSliceState = {
    bookmarks: []
}

export const bookmarksSlice = createSlice({
    name: 'bookmarks',
    initialState,
    reducers: {
        removeBookmark: (state, action: PayloadAction<any>) => {
            state.bookmarks = state.bookmarks.filter(({ imdbID }) => imdbID !== action.payload.imdbID)
        },
        addBookmark: (state, action: PayloadAction<bookmark>) => {
            state.bookmarks = [
                ...state.bookmarks,
                {
                    imdbID: action.payload.imdbID,
                    Title: action.payload.Title,
                    Year: action.payload.Year,
                    Type: action.payload.Type,
                    Poster: action.payload.Poster,
                }
            ]
        }
    }
})


export const { addBookmark, removeBookmark } = bookmarksSlice.actions
export const bookmarksSelector = (state: RootState) => state.bookmarks

export default bookmarksSlice.reducer