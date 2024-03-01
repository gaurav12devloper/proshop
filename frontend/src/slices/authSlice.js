import {createSlice,} from '@reduxjs/toolkit';

const initialState = {
    userinfo: localStorage.getItem('userinfo') ? JSON.parse(localStorage.getItem('userinfo')) : null,
  };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials(state, action) {
            state.userinfo = action.payload;
            localStorage.setItem('userinfo', JSON.stringify(action.payload));
        },
        logout(state) {
            state.userinfo = null; // set the userinfo to null i.e remove from redux store
            localStorage.removeItem('userinfo'); // remove the userinfo from the local storage
        }
    }
});
export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;