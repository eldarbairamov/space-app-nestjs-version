import expressAsyncHandler from "express-async-handler";
import { IRequest, IMomentsResponse, IUpdateMoment, IMomentResponse } from "../interface";
import { Response } from "express";
import { addMomentService, getMomentsService, updateMomentService, uploadPhotoService } from "../service";
import { deleteMomentService, getOneMomentService } from "../service";

export const momentController = {

   addMoment: expressAsyncHandler(async (req: IRequest<any, any, any>, res: Response<IMomentResponse>) => {
      const moment = await addMomentService(req.userId);
      res.status(201).json(moment);
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
      await deleteMomentService(req.userId, req.params.momentId);
      res.json({ message: "Success" });
   }),

   uploadPhoto: expressAsyncHandler(async (req: IRequest<any, { momentId: string }, any>, res: Response<{ image: string }>) => {
      const imageName = await uploadPhotoService(req.files, req.params.momentId);
      res.json({ image: imageName });
   }),

};