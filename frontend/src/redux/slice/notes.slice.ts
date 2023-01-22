import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type INote } from "../../interface/note.interface";

interface INotesInitialState {
   activeNoteId: number | undefined,
   notes: INote[],
   activeNote: INote | undefined
}

const initialState: INotesInitialState = {
   activeNoteId: undefined,
   notes: [],
   activeNote: undefined,
};

const notesSlice = createSlice({
   name: "notes",
   initialState,
   reducers: {
      addNote: (state, { payload }: PayloadAction<INote>) => {
         state.notes.push(payload);
         state.activeNoteId = payload.id;
         state.activeNote = state.notes.find(({ id }) => id === state.activeNoteId)!;
      },
      setNotes: (state, { payload }: PayloadAction<INote[]>) => {
         state.notes = payload;
      },
      setActiveNoteId: (state, { payload }: PayloadAction<number>) => {
         state.activeNoteId = payload;
         state.activeNote = state.notes.find(({ id }) => id === state.activeNoteId)!;
      },
      updateNote: (state, { payload }: PayloadAction<INote>) => {
         state.notes = state.notes.map(note => {
            if (note.id === payload.id) return payload;
            return note;
         });

         state.activeNote = state.notes.find(({ id }) => id === state.activeNoteId)!;
      },
   },
});

export const notesReducer = notesSlice.reducer;
export const notesActions = notesSlice.actions;