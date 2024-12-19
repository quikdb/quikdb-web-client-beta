import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setCookie, destroyCookie, parseCookies } from 'nookies';

export interface AuthState {
  token: string | null;
  userEmail: string | null;
}

const cookies = parseCookies();
const initialState: AuthState = {
  token: cookies.accessToken || null,
  userEmail: cookies.userEmail || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState(state, action: PayloadAction<{ token: string | null; userEmail: string | null }>) {
      state.token = action.payload.token;
      state.userEmail = action.payload.userEmail;

      if (action.payload.token) {
        setCookie(null, 'accessToken', action.payload.token, { path: '/' });
        setCookie(null, 'userEmail', action.payload.userEmail || '', { path: '/' });
      }
    },

    clearAuthState(state) {
      state.token = null;
      state.userEmail = null;

      destroyCookie(null, 'accessToken', { path: '/' });
      destroyCookie(null, 'userEmail', { path: '/' });
    },
  },
});

export const { setAuthState, clearAuthState } = authSlice.actions;

export default authSlice.reducer;
