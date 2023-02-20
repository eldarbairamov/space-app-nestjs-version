import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMoment } from "../../interface";

interface IMomentInitialState {
   moments: IMoment[];
   count: number,
   activeMoment: IMoment | null
   searchKey: string
   tags: (string | undefined)[]
}

const initialState: IMomentInitialState = {
   moments: [],
   count: 0,
   activeMoment: null,
   searchKey: "",
   tags: [],
};

const momentSlice = createSlice({
   name: "moment",
   initialState,
   reducers: {

      setMoments: (state, { payload }: PayloadAction<IMoment[]>) => {
         state.activeMoment = null;
         state.moments = payload;
      },

      addMoment: (state, { payload }: PayloadAction<IMoment>) => {
         state.moments.push(payload);
         state.moments = state.moments.sort((a, b) => b.createdAt - a.createdAt);
         state.tags = [ ...state.tags, ...payload.tags ];
      },

      deleteMoment: (state, { payload }: PayloadAction<{ momentId: string }>) => {
         state.moments = state.moments.filter(moment => moment.id !== payload.momentId);
      },

      setActiveMoment: (state, { payload }: PayloadAction<IMoment | null>) => {
         state.activeMoment = payload;
      },

      setSearchKey: (state, { payload }: PayloadAction<string>) => {
         state.searchKey = payload;
      },

      setDate: (state, { payload }: PayloadAction<number>) => {
         state.activeMoment!.date = payload;
      },

      deleteTag: (state, { payload }: PayloadAction<{ tagValue: string }>) => {
         state.activeMoment!.tags = state.activeMoment!.tags.filter(tag => tag !== payload.tagValue);
      },

      addTag: (state, { payload }: PayloadAction<{ tagValue: string }>) => {
         state.activeMoment!.tags.push(payload.tagValue);
      },

      setTags: (state, { payload }: PayloadAction<(string | undefined)[]>) => {
         state.tags = payload;
      },

      setPhoto: (state, { payload }: PayloadAction<{ photo: string }>) => {
         state.activeMoment!.photo = payload.photo;
      },

   },
});

export const momentReducer = momentSlice.reducer;
export const momentActions = momentSlice.actions;