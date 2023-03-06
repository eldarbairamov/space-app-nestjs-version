import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMoment, IMoments } from "../../interface";

interface IMomentInitialState {
   moments: IMoment[];
   count: number;
   activeMoment: IMoment | null;
   searchKey: string;
   tags: (string | undefined)[];
   limit: number;
   total: number;
}

const initialState: IMomentInitialState = {
   moments: [],
   count: 0,
   activeMoment: null,
   searchKey: "",
   tags: [],
   limit: 30,
   total: 30,
};

const momentSlice = createSlice({
   name: "moment",
   initialState,
   reducers: {

      setMoments: (state, { payload }: PayloadAction<IMoments>) => {
         state.activeMoment = null;
         state.moments = payload.data;
         state.tags = payload.tagsForFilter;
         state.count = payload.count;
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

      setPhoto: (state, { payload }: PayloadAction<{ photo: string }>) => {
         state.activeMoment!.photo = payload.photo;
      },

      next: (state) => {
         if (state.total <= state.count) {
            state.total = state.total + state.limit;
         }
      },

   },
});

export const momentReducer = momentSlice.reducer;
export const momentActions = momentSlice.actions;