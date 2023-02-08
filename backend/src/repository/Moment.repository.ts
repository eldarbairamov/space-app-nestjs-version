import { IMoment, MomentDocument, MomentModel, UserDocument } from "../model";
import { ApiException } from "../exception/api.exception";
import { FilterQuery, UpdateQuery } from "mongoose";

export const MomentRepository = {

   create: async (body: Partial<IMoment>): Promise<MomentDocument> => {
      try {
         return MomentModel.create(body);
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

   find: async (filter: FilterQuery<IMoment>): Promise<MomentDocument[]> => {
      try {
         return MomentModel.find(filter).sort({ updatedAt: "desc" });
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

   findById: async (momentId: MomentDocument["id"]): Promise<MomentDocument | null> => {
      try {
         return MomentModel.findById(momentId);
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

   findByIdAndUpdate: async (momentId: MomentDocument["id"], update: UpdateQuery<IMoment>): Promise<MomentDocument | null> => {
      try {
         return MomentModel.findByIdAndUpdate(momentId, update, { new: true });
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

   findByIdAndDelete: async (momentId: MomentDocument["id"]): Promise<MomentDocument | null> => {
      try {
         return MomentModel.findByIdAndDelete(momentId);
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

   count: async (userId: UserDocument["id"]): Promise<number> => {
      try {
         return MomentModel.count({ ownerId: userId });
      } catch (e) {
         throw ApiException.Database(e);
      }
   },

};