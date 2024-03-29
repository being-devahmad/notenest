import { createSlice } from "@reduxjs/toolkit";

const notesSlice = createSlice({
    name: 'notes',
    initialState: [],
    reducers: {
        addToNotes(state, action) {
            state.push(action.payload)
        },
        removeFromNotes(state, action) {
            return state.filter((item) => item.id !== action.payload)
        },
        updateNote(state, action) {
            const { id, title, description } = action.payload;
            const noteIndex = state.findIndex((note) => note.id === id);
            if (noteIndex !== -1) {
                state[noteIndex].title = title;
                state[noteIndex].description = description;
            }
        },
        removeAllNotes(state, action) {
            return []
        }
    }
});

export const { addToNotes, removeFromNotes, updateNote, removeAllNotes } = notesSlice.actions;
export default notesSlice.reducer;
