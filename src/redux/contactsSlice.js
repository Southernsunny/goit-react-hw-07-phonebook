import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.rejected, handleRejected)
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = state.items.filter(contact => contact.id !== action.payload.id);
      });
  },
});

export const contactsReducer = contactsSlice.reducer;

// Попередження:index.ts:765 The object notation for `createSlice.extraReducers` is deprecated, 
// and will be removed in RTK 2.0.Please use the 'builder callback' notation instead:

// const contactsSlice = createSlice({
//   name: 'contacts',
//   initialState,
//   extraReducers: {
//     [fetchContacts.pending]: handlePending,
//     [fetchContacts.rejected]: handleRejected,
//     [fetchContacts.fulfilled](state, action) {
//       state.isLoading = false;
//       state.error = null;
//        state.items = action.payload;
//     },

//     [addContact.pending]: handlePending,
//     [addContact.rejected]: handleRejected,
//     [addContact.fulfilled](state, action) {
//       state.isLoading = false;
//       state.error = null;
//       state.items.push(action.payload);
//     },

//     [deleteContact.pending]: handlePending,
//     [deleteContact.rejected]: handleRejected,
//     [deleteContact.fulfilled](state, action) {
//       state.isLoading = false;
//       state.error = null;
//       state.contacts = state.contacts.filter(contact => contact.id !== action.payload.id);
//     },
//   },
// });
