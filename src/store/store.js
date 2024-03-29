import notesReducer from "../app/NotesSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        notes: notesReducer
    }
})


export default store