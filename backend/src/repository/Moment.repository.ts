import { IMoment, MomentDocument, MomentModel, UserDocument } from "../model";
import { ApiException } from "../exception/api.exception";
import { FilterQuery, UpdateQuery } from "mongoose";

export const MomentRepository = {

   create: async (body: Partial<IMoment>): Promise<MomentDocument> => {
      try {
         return MomentModel.create(body);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   find: async (filter: FilterQuery<IMoment>, searchKey: string, limit: string | number): Promise<MomentDocument[]> => {
      const filterObj = searchKey ? { ...filter, tags: { $in: searchKey } } : { ...filter };
      try {
         return MomentModel.find(filterObj).sort({ createdAt: "desc" }).limit(Number(limit));
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   findAllByUserId: async (userId: UserDocument["id"]): Promise<MomentDocument[] | null> => {
      try {
         return MomentModel.find({ ownerId: userId });
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   findById: async (momentId: MomentDocument["id"]): Promise<MomentDocument | null> => {
      try {
         return MomentModel.findById(momentId);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   findByIdAndUpdate: async (momentId: MomentDocument["id"], update: UpdateQuery<IMoment>): Promise<MomentDocument | null> => {
      try {
         return MomentModel.findByIdAndUpdate(momentId, update, { new: true });
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   findByIdAndDelete: async (momentId: MomentDocument["id"]): Promise<MomentDocument | null> => {
      try {
         return MomentModel.findByIdAndDelete(momentId);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   count: async (filter: FilterQuery<IMoment>, searchKey = ""): Promise<number> => {
      const filterObj = searchKey ? { ...filter, tags: { $in: searchKey } } : { ...filter };
      try {
         return MomentModel.count(filterObj);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

};