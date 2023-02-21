import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = [];

export const moviesSlice = createSlice({
    name: "movies",
    initialState: { value: initialStateValue },
    reducers: {
        setMovies: (state, action) => {
            state.value = action.payload;
        }
    }
});


export const { setMovies } = moviesSlice.actions;
export default moviesSlice.reducer;