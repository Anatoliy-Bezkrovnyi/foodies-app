import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { setCredentials } from '../auth/authSlice';

export type AuthModal = 'signIn' | 'signUp';

export interface UiState {
  // Which auth modal is open. Any component (e.g. a guest clicking a heart) can open one;
  // the modals themselves are rendered once at the app level.
  authModal: AuthModal | null;
}

const initialState: UiState = {
  authModal: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openAuthModal: (state, action: PayloadAction<AuthModal>) => {
      state.authModal = action.payload;
    },
    closeAuthModal: (state) => {
      state.authModal = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setCredentials, (state) => {
      state.authModal = null;
    });
  },
});

export const { openAuthModal, closeAuthModal } = uiSlice.actions;

export default uiSlice.reducer;
