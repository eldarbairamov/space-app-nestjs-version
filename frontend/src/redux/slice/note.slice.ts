import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INote } from "../../interface";

interface INoteInitialState {
   activeNoteId: string | null,
   notes: INote[],
   activeNote: INote | null,
   lastNote: INote | null,
   searchKey: string
}

const initialState: INoteInitialState = {
   activeNoteId: null,
   notes: [],
   activeNote: null,
   lastNote: null,
   searchKey: "",
};

const noteSlice = createSlice({
   name: "notes",
   initialState,
   reducers: {
      setActiveNoteId: (state, { payload }: PayloadAction<string>) => {
         state.activeNoteId = payload;
         state.activeNote = state.notes.find(({ id }) => id === state.activeNoteId)!;
      },

      updateNote: (state, { payload }: PayloadAction<INote>) => {
         state.notes = state.notes.map(note => {
            if (note.id === payload.id) return payload;
            return note;
         });
         state.activeNote = state.notes.find(({ id }) => id === payload.id)!;
         state.notes = state.notes.sort((a, b) => b.lastModified - a.lastModified);
      },

      showDefaultNote: (state, { payload }: PayloadAction<INote>) => {
         state.activeNote = payload;
      },
      setSearchKey: (state, { payload }: PayloadAction<string>) => {
         state.searchKey = payload;
      },

      getNotes: (state, { payload }: PayloadAction<INote[]>) => {
         state.notes = payload;
         state.activeNote = payload[0];
      },

      addNote: (state, { payload }: PayloadAction<INote>) => {
         state.notes.push(payload);
         state.notes = state.notes.sort((a, b) => b.lastModified - a.lastModified);
         state.activeNoteId = payload.id;
         state.activeNote = state.notes.find(({ id }) => id === state.activeNoteId)!;
      },

      deleteNote: (state, { payload }: PayloadAction<string>) => {
         const targetId = payload;
         const targetNoteIndex = state.notes.findIndex(item => item.id === targetId);

         state.notes = state.notes.filter(item => item.id !== targetId);
         state.activeNoteId = state.notes[targetNoteIndex] ? state.notes[targetNoteIndex].id : null;
         state.activeNote = state.notes[targetNoteIndex] ? state.notes[targetNoteIndex] : state.notes[targetNoteIndex - 1];
      },

      getNotesBySearch: (state, { payload }: PayloadAction<INote[]>) => {
         state.notes = payload;
      },
   },

});

export const noteReducer = noteSlice.reducer;
export const noteActions = noteSlice.actions;