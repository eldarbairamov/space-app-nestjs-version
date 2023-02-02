import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { noteService } from "../../services";
import { catchErrors } from "../../helper";
import { NoteDto } from "../../dto/intex";

interface INotesInitialState {
   activeNoteId: string | undefined,

   notes: NoteDto[],

   activeNote: NoteDto | undefined,

   lastNote: NoteDto | undefined,
   count: number,
   searchKey: string
}

const initialState: INotesInitialState = {
   activeNoteId: undefined,
   notes: [],
   activeNote: undefined,
   lastNote: undefined,
   count: 0,
   searchKey: "",
};


export const addNote = createAsyncThunk<NoteDto, void>(
   "notesSlice/getInitialNote",
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await noteService.addNote();
         return data;

      } catch (e) {
         return rejectWithValue(e);
      }
   },
);


export const getNotes = createAsyncThunk<NoteDto[], void>(
   "notesSlice/getNotes",
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await noteService.getNotes();
         return data;

      } catch (e) {
         return rejectWithValue(e);
      }
   },
);


export const getNotesBySearch = createAsyncThunk<NoteDto[], { searchKey: string }>(
   "notesSlice/getNotesBySearch",
   async ({ searchKey }, { rejectWithValue }) => {
      try {
         const { data } = await noteService.getNotesBySearch(searchKey);
         return data;

      } catch (e) {
         return rejectWithValue(e);
      }
   });

export const deleteNote = createAsyncThunk<void, { noteId: string }>(
   "notesSlice/deleteNote",
   async ({ noteId }, { rejectWithValue }) => {
      try {
         await noteService.deleteNote(noteId);

      } catch (e) {
         return rejectWithValue(e);
      }
   },
);

const notesSlice = createSlice({
   name: "notes",
   initialState,

   reducers: {
      setActiveNoteId: (state, { payload }: PayloadAction<string>) => {
         state.activeNoteId = payload;
         state.activeNote = state.notes.find(({ id }) => id === state.activeNoteId)!;
      },

      updateNote: (state, { payload }: PayloadAction<NoteDto>) => {
         state.notes = state.notes.map(note => {
            if (note.id === payload.id) return payload;
            return note;
         });
         state.activeNote = state.notes.find(({ id }) => id === payload.id)!;
         state.notes = state.notes.sort((a, b) => b.lastModified - a.lastModified);
      },

      showDefaultNote: (state, { payload }: PayloadAction<NoteDto>) => {
         state.activeNote = payload;
      },
      setSearchKey: (state, { payload }) => {
         state.searchKey = payload;
      },
   },

   extraReducers: builder => builder
      // Add note
      .addCase(addNote.fulfilled, (state, { payload }) => {
         state.notes.push(payload);
         state.notes = state.notes.sort((a, b) => b.lastModified - a.lastModified);
         state.activeNoteId = payload.id;
         state.activeNote = state.notes.find(({ id }) => id === state.activeNoteId)!;
      })
      .addCase(addNote.rejected, (state, { payload }) => {
         catchErrors(payload);
      })

      // Get all notes
      .addCase(getNotes.fulfilled, (state, { payload }) => {
         state.notes = payload;
         state.activeNote = payload[0];
      })
      .addCase(getNotes.rejected, (state, { payload }) => {
         catchErrors(payload);
      })

      // Delete note
      .addCase(deleteNote.fulfilled, (state, { meta }) => {
         const targetId = meta.arg.noteId;
         const targetNoteIndex = state.notes.findIndex(item => item.id === targetId);

         state.notes = state.notes.filter(item => item.id !== targetId);
         state.activeNoteId = state.notes[targetNoteIndex] ? state.notes[targetNoteIndex].id : undefined;
         state.activeNote = state.notes[targetNoteIndex] ? state.notes[targetNoteIndex] : state.notes[targetNoteIndex - 1];
      })
      .addCase(deleteNote.rejected, (state, { payload }) => {
         catchErrors(payload);
      })

      // Get notes by search
      .addCase(getNotesBySearch.fulfilled, (state, { payload }) => {
         state.notes = payload;
      })
      .addCase(getNotesBySearch.rejected, (state, { payload }) => {
         catchErrors(payload);
      }),

});

export const notesReducer = notesSlice.reducer;
export const notesActions = notesSlice.actions;
export const asyncNotesActions = {
   addNote,
   getNotes,
   deleteNote,
   getNotesBySearch,
};