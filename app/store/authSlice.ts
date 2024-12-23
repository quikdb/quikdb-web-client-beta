import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setCookie, destroyCookie, parseCookies } from 'nookies';

export interface AuthState {
  token: string | null;
  userEmail: string | null;
  credits?: number | null;
  isInternetIdentity?: boolean;
  internetIdentityCLI?: string | null; // Added new state
}

const cookies = parseCookies();
const initialState: AuthState = {
  token: cookies.accessToken || null,
  userEmail: cookies.userEmail || null,
  credits: cookies.credits ? parseFloat(cookies.credits) : undefined,
  isInternetIdentity: cookies.isInternetIdentity ? cookies.isInternetIdentity === 'true' : undefined,
  internetIdentityCLI: cookies.internetIdentityCLI || null, // Initialize from cookies
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
        internetIdentityCLI?: string | null; // Updated payload
      }>
    ) {
      state.token = action.payload.token;
      state.userEmail = action.payload.userEmail;
      state.credits = action.payload.credits;
      state.isInternetIdentity = action.payload.isInternetIdentity;
      state.internetIdentityCLI = action.payload.internetIdentityCLI;

      if (action.payload.token) {
        setCookie(null, 'accessToken', action.payload.token, { path: '/' });
        setCookie(null, 'userEmail', action.payload.userEmail || '', { path: '/' });
        if (action.payload.isInternetIdentity !== undefined) {
          setCookie(null, 'isInternetIdentity', action.payload.isInternetIdentity.toString(), { path: '/' });
        }
        if (action.payload.credits !== undefined) {
          setCookie(null, 'credits', action.payload.credits?.toString() || '0', { path: '/' });
        }
        if (action.payload.internetIdentityCLI !== undefined) {
          setCookie(null, 'internetIdentityCLI', action.payload.internetIdentityCLI || '', { path: '/' });
        }
      }
    },

    clearAuthState(state) {
      state.token = null;
      state.userEmail = null;
      state.credits = undefined;
      state.isInternetIdentity = undefined;
      state.internetIdentityCLI = null; // Clear new state

      destroyCookie(null, 'accessToken', { path: '/' });
      destroyCookie(null, 'userEmail', { path: '/' });
      destroyCookie(null, 'credits', { path: '/' });
      destroyCookie(null, 'isInternetIdentity', { path: '/' });
      destroyCookie(null, 'internetIdentityCLI', { path: '/' }); // Destroy new cookie
    },
  },
});

export const { setAuthState, clearAuthState } = authSlice.actions;

export default authSlice.reducer;
