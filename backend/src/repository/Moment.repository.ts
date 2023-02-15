import { IMoment, MomentDocument, MomentModel, UserDocument } from "../model";
import { ApiException } from "../exception/api.exception";
import { FilterQuery, UpdateQuery } from "mongoose";

export const MomentRepository = {

   create: async (body: Partial<IMoment>): Promise<MomentDocument> => {
      try {
         return MomentModel.create(body);
      } catch (e) {
         throw ApiException.DatabaseError(e);
      }
   },

   find: async (filter: FilterQuery<IMoment>, searchKey: string): Promise<MomentDocument[]> => {
      try {
         const filterObj = searchKey ? { ...filter, tags: { $in: searchKey } } : { ...filter };
         return MomentModel.find(filterObj).sort({ createdAt: "desc" });
      } catch (e) {
         throw ApiException.DatabaseError(e);
      }
   },

   findByUserId: async (userId: UserDocument["id"]): Promise<MomentDocument[] | null> => {
      try {
         return MomentModel.find({ ownerId: userId });
      } catch (e) {
         throw ApiException.DatabaseError(e);
      }
   },

   findById: async (momentId: MomentDocument["id"]): Promise<MomentDocument | null> => {
      try {
         return MomentModel.findById(momentId);
      } catch (e) {
         throw ApiException.DatabaseError(e);
      }
   },

   findByIdAndUpdate: async (momentId: MomentDocument["id"], update: UpdateQuery<IMoment>): Promise<MomentDocument | null> => {
      try {
         return MomentModel.findByIdAndUpdate(momentId, update, { new: true });
      } catch (e) {
         throw ApiException.DatabaseError(e);
      }
   },

   findByIdAndDelete: async (momentId: MomentDocument["id"]): Promise<MomentDocument | null> => {
      try {
         return MomentModel.findByIdAndDelete(momentId);
      } catch (e) {
         throw ApiException.DatabaseError(e);
      }
   },

   count: async (userId: UserDocument["id"]): Promise<number> => {
      try {
         return MomentModel.count({ ownerId: userId });
      } catch (e) {
         throw ApiException.DatabaseError(e);
      }
   },

};