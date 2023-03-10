import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
    email: '',
    password: '',
    jwt: '',
    isLogin: false,
}

export const userSlice = createSlice({
    name: "user",
    initialState: { value: initialStateValue },
    reducers: {
        login: (state, action) => {
            state.value = action.payload;
        },
        logout: (state) => {
            state.value = initialStateValue;
        }
    }
})


export const { login, logout } = userSlice.actions;

export default userSlice.reducer;