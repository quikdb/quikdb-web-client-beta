// store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setCookie, destroyCookie, parseCookies } from 'nookies';

export interface AuthState {  // Make sure AuthState is exported
  token: string | null;
  userEmail: string | null;
}

// Read cookies to initialize the state when app loads
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

      // Set cookies whenever the auth state is set
      if (action.payload.token) {
        setCookie(null, 'accessToken', action.payload.token, { path: '/' });
        setCookie(null, 'userEmail', action.payload.userEmail || '', { path: '/' });
      }
    },
    clearAuthState(state) {
      state.token = null;
      state.userEmail = null;

      // Clear cookies on logout
      destroyCookie(null, 'accessToken');
      destroyCookie(null, 'userEmail');
    },
  },
});

export const { setAuthState, clearAuthState } = authSlice.actions;

export default authSlice.reducer;
