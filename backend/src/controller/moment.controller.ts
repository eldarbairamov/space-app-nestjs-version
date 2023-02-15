import expressAsyncHandler from "express-async-handler";
import { IRequest, IMomentsResponse } from "../interface";
import { Response } from "express";
import { MomentRepository, UserRepository } from "../repository";
import { IMomentResponse, IUpdateMoment } from "../interface";
import { addMomentService, getMomentsService, updateMomentService, uploadPhotoService } from "../service";
import { getOneMomentService } from "../service/moment/get-one-moment.service";

export const momentController = {

   addMoment: expressAsyncHandler(async (req: IRequest<any, any, any>, res: Response<IMomentResponse>) => {
      const moment = await addMomentService(req.userId);
      res.json(moment);
   }),

   getMoments: expressAsyncHandler(async (req: IRequest<any, any, { searchKey: string }>, res: Response<IMomentsResponse>) => {
      const moments = await getMomentsService(req.userId, req.query.searchKey);
      res.json(moments);
   }),

   getOneMoment: expressAsyncHandler(async (req: IRequest<any, { momentId: string }, any>, res: Response<IMomentResponse>) => {
      const moment = await getOneMomentService(req.params.momentId);
      res.json(moment);
   }),

   updateMoment: expressAsyncHandler(async (req: IRequest<IUpdateMoment, { momentId: string }, any>, res: Response<{ message: string }>) => {
      await updateMomentService(req.params.momentId, req.body);
      res.json({ message: "Success" });
   }),

   deleteMoment: expressAsyncHandler(async (req: IRequest<any, { momentId: string }, any>, res: Response<{ message: string }>) => {
      await MomentRepository.findByIdAndDelete(req.params.momentId);
      await UserRepository.findByIdAndUpdate(req.userId, { $pull: { momentsIds: req.params.momentId } });
      res.json({ message: "Success" });
   }),

   uploadPhoto: expressAsyncHandler(async (req: IRequest<any, { momentId: string }, any>, res: Response<{ image: string }>) => {
      const imageName = await uploadPhotoService(req.files, req.params.momentId);
      res.json({ image: imageName });
   }),

};