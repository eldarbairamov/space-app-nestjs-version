import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type INoteDto } from "../../interface/note.interface";
import { noteService } from "../../services/note.service";
import toast from "react-hot-toast";
import { catchErrors } from "../../helper/catch-errors.helper";

interface INotesInitialState {
   activeNoteId: string | undefined,
   notes: INoteDto[],
   activeNote: INoteDto | undefined,
   lastNote: INoteDto | undefined,
   count: number
}

const initialState: INotesInitialState = {
   activeNoteId: undefined,
   notes: [],
   activeNote: undefined,
   lastNote: undefined,
   count: 0,
};

export const addNote = createAsyncThunk<INoteDto, void>(
   "notesSlice/getInitialNote",
   async (_, { rejectWithValue }) => {
      try {
         const loading = toast.loading("Зачекайте...");

         const { data } = await noteService.addNote();

         toast.dismiss(loading);

         return data;

      } catch (e) {
         return rejectWithValue(e);
      }
   },
);

export const getNotes = createAsyncThunk<INoteDto[], void>(
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

export const getNotesCount = createAsyncThunk<number, void>(
   "notesSlice/getNotesCount",
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await noteService.getNotesCount();
         return data;

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
      updateNote: (state, { payload }: PayloadAction<INoteDto>) => {
         state.notes = state.notes.map(note => {
            if (note.id === payload.id) return payload;
            return note;
         });
         state.activeNote = state.notes.find(({ id }) => id === payload.id)!;
         state.notes = state.notes.sort((a, b) => b.lastModified - a.lastModified);
      },
      showDefaultNote: (state, { payload }: PayloadAction<INoteDto>) => {
         state.activeNote = payload;
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

      // Get notes count
      .addCase(getNotesCount.fulfilled, (state, { payload }) => {
         state.count = payload;
      })
      .addCase(getNotesCount.rejected, (state, { payload }) => {
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
      }),

});

export const notesReducer = notesSlice.reducer;
export const notesActions = notesSlice.actions;
export const asyncNotesActions = {
   addNote,
   getNotes,
   deleteNote,
   getNotesCount,
};