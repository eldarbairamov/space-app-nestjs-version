import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type INoteDto } from "../../interface/note.interface";
import { type AxiosApiError } from "../../services";
import { noteService } from "../../services/note.service";
import toast from "react-hot-toast";

interface INotesInitialState {
   activeNoteId: string | undefined,
   notes: INoteDto[],
   activeNote: INoteDto | undefined,
   lastNote: INoteDto | undefined
}

const initialState: INotesInitialState = {
   activeNoteId: undefined,
   notes: [],
   activeNote: undefined,
   lastNote: undefined,
};

export const addNote = createAsyncThunk<INoteDto, void, { rejectValue: string }>(
   "notesSlice/getInitialNote",
   async (_, { rejectWithValue }) => {
      try {
         const loading = toast.loading("Зачекайте...");

         const { data } = await noteService.addNote();

         toast.dismiss(loading);
         return data;

      } catch (e) {
         const axiosError = e as AxiosApiError;
         const response = axiosError.response?.data.message as string;

         toast.dismiss();
         toast.error(response ? response : axiosError.message);
         return rejectWithValue(response);
      }
   },
);

export const getNotes = createAsyncThunk<INoteDto[], void, { rejectValue: string }>(
   "notesSlice/getNotes",
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await noteService.getNotes();
         return data;

      } catch (e) {
         const axiosError = e as AxiosApiError;
         const response = axiosError.response?.data.message as string;

         toast.dismiss();
         toast.error(response ? response : axiosError.message);
         return rejectWithValue(response);
      }
   },
);

export const deleteNote = createAsyncThunk<void, { noteId: string }, { rejectValue: string }>(
   "notesSlice/deleteNote",
   async ({ noteId }, { rejectWithValue }) => {
      try {
         await noteService.deleteNote(noteId);

      } catch (e) {
         const axiosError = e as AxiosApiError;
         const response = axiosError.response?.data.message as string;

         toast.dismiss();
         toast.error(response ? response : axiosError.message);
         return rejectWithValue(response);
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
         state.activeNote = state.notes.find(({ id }) => id === state.activeNoteId)!;
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

      // Get all notes
      .addCase(getNotes.fulfilled, (state, { payload }) => {
         state.notes = payload;
         state.lastNote = state.notes[0];
      })

      // Delete note
      .addCase(deleteNote.fulfilled, (state, { meta }) => {
         const targetId = meta.arg.noteId;
         const targetNoteIndex = state.notes.findIndex(item => item.id === targetId);

         state.notes = state.notes.filter(item => item.id !== targetId);
         state.activeNoteId = state.notes[targetNoteIndex] ? state.notes[targetNoteIndex].id : undefined;
         state.activeNote = state.notes[targetNoteIndex] ? state.notes[targetNoteIndex] : state.notes[targetNoteIndex - 1];
      }),

});

export const notesReducer = notesSlice.reducer;
export const notesActions = notesSlice.actions;
export const asyncNotesActions = {
   addNote,
   getNotes,
   deleteNote,
};