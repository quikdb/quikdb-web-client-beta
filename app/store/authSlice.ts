import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setCookie, destroyCookie, parseCookies } from 'nookies';

export interface AuthState {
  token: string | null;
  userEmail: string | null;
  credits?: number | null;
  isInternetIdentity?: boolean;
}

const cookies = parseCookies();
const initialState: AuthState = {
  token: cookies.accessToken || null,
  userEmail: cookies.userEmail || null,
  credits: cookies.credits ? parseFloat(cookies.credits) : undefined,
  isInternetIdentity: cookies.isInternetIdentity ? cookies.isInternetIdentity === 'true' : undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState(
      state,
      action: PayloadAction<{
        token: string | null;
        userEmail: string | null;
        credits?: number | null;
        isInternetIdentity?: boolean; 
      }>
    ) {
      state.token = action.payload.token;
      state.userEmail = action.payload.userEmail;
      state.credits = action.payload.credits;
      state.isInternetIdentity = action.payload.isInternetIdentity;

      if (action.payload.token) {
        setCookie(null, 'accessToken', action.payload.token, { path: '/' });
        setCookie(null, 'userEmail', action.payload.userEmail || '', { path: '/' });
        if (action.payload.isInternetIdentity !== undefined) {
          setCookie(null, 'isInternetIdentity', action.payload.isInternetIdentity.toString(), { path: '/' });
        }
        if (action.payload.credits !== undefined) {
          setCookie(null, 'credits', action.payload.credits?.toString() || '0', { path: '/' });
        }
      }
    },

    clearAuthState(state) {
      state.token = null;
      state.userEmail = null;
      state.credits = undefined;
      state.isInternetIdentity = undefined;

      destroyCookie(null, 'accessToken', { path: '/' });
      destroyCookie(null, 'userEmail', { path: '/' });
      destroyCookie(null, 'credits', { path: '/' });
      destroyCookie(null, 'isInternetIdentity', { path: '/' });
    },
  },
});

export const { setAuthState, clearAuthState } = authSlice.actions;

export default authSlice.reducer;
