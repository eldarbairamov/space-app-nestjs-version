import expressAsyncHandler from "express-async-handler";
import { RequestWithBodyAndParam, RequestWithBodyVarParam, RequestWithCustomVar, RequestWithCustomVarAndParam, RequestWithCustomVarAndQuery, RequestWithParam } from "../interface";
import { Response } from "express";
import { MomentRepository, UserRepository } from "../repository";
import { IMomentResponse, IUpdateMoment } from "../interface";
import { addMomentService, deletePhotoService, getMomentsByTagsService, getMomentsService, updateMomentService, uploadPhotoService } from "../service";
import { getOneMomentService } from "../service/moment/get-one-moment.service";

export const momentController = {

   addMoment: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response<IMomentResponse>) => {
      const moment = await addMomentService(req.userId);
      res.json(moment);
   }),

   getMoments: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response<IMomentResponse[]>) => {
      const moments = await getMomentsService(req.userId);
      res.json(moments);
   }),

   getOneMoment: expressAsyncHandler(async (req: RequestWithParam<{ momentId: string }>, res: Response<IMomentResponse>) => {
      const moment = await getOneMomentService(req.params.momentId);
      res.json(moment);
   }),

   updateMoment: expressAsyncHandler(async (req: RequestWithBodyVarParam<IUpdateMoment, { momentId: string }>, res: Response<{ message: string }>) => {
      await updateMomentService(req.params.momentId, req.body);
      res.json({ message: "Success" });
   }),

   deleteMoment: expressAsyncHandler(async (req: RequestWithCustomVarAndParam<{ momentId: string }>, res: Response<{ message: string }>) => {
      await MomentRepository.findByIdAndDelete(req.params.momentId);
      await UserRepository.findByIdAndUpdate(req.userId, { $pull: { momentsIds: req.params.momentId } });
      res.json({ message: "Success" });
   }),

   uploadPhoto: expressAsyncHandler(async (req: RequestWithCustomVarAndParam<{ momentId: string }>, res: Response<{ image: string }>) => {
      const imageName = await uploadPhotoService(req.files, req.params.momentId);
      res.json({ image: imageName });
   }),

   deletePhoto: expressAsyncHandler(async (req: RequestWithBodyAndParam<{ fileName: string }, { momentId: string }>, res: Response<{ message: string }>) => {
      await deletePhotoService(req.body, req.params.momentId);
      res.json({ message: "Success" });
   }),

   getMomentsCount: expressAsyncHandler(async (req: RequestWithCustomVar, res: Response<number>) => {
      const count = await MomentRepository.count(req.userId);
      res.json(count);
   }),

   getMomentsByTags: expressAsyncHandler(async (req: RequestWithCustomVarAndQuery<{ tags: string }>, res: Response<IMomentResponse[]>) => {
      const momentsByTags = await getMomentsByTagsService(req.userId, req.query.tags);
      res.json(momentsByTags);
   }),

};