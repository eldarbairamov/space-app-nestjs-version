import { Injectable } from "@nestjs/common";
import { MomentRepository } from "./repository/moment.repository";
import { UserDocument } from "../user/model/user.model";
import { UserRepository } from "../user/repository/user.repository";
import { IMomentResponse, IMomentsResponse } from "./interface/moment-response.interface";
import { MomentPresenter } from "./presenter/moment.presenter";
import { MomentDocument } from "./model/moment.model";
import { UpdateMomentDto } from "./dto";
import * as path from "path";
import { exists } from "../common/helper/exists";
import { unlinker } from "../common/helper/unlinker";
import { staticPath } from "../common/constants/static-path.constant";

@Injectable()
export class MomentService {

   constructor(private momentRepository: MomentRepository, private userRepository: UserRepository, private momentPresenter: MomentPresenter) {
   }

   async getMoments(userId: UserDocument["id"], searchKey: string): Promise<IMomentsResponse> {
      // Find all moments / by search key
      const [ moments, allMoments ] = await Promise.all([
         this.momentRepository.find({ ownerId: userId }, searchKey),
         this.momentRepository.findAllByUserId(userId),
      ]);

      // Defined unique tags
      const tags = allMoments?.map(moment => moment.tags.map(tag => tag));
      const uniqueTags = Array.from(new Set(tags?.flat()));

      // Return presented data to client
      const presentedMoments = this.momentPresenter.array(moments);
      return { data: presentedMoments, tagsForFilter: uniqueTags };
   }

   async addMoment(userId: UserDocument["id"]): Promise<IMomentResponse> {
      // Save moment to DB
      const moment = await this.momentRepository.create({ ownerId: userId });

      // Update user
      await this.userRepository.findByIdAndUpdate(userId, { $push: { momentsIds: moment.id } });

      // Return presented data to client
      return this.momentPresenter.single(moment);
   }

   async getOneMoment(momentId: MomentDocument["id"]): Promise<IMomentResponse> {
      // Find moment in DB
      const moment = await this.momentRepository.findById(momentId);

      // Return presented data to client
      return this.momentPresenter.single(moment);
   }

   async updateMoment(momentId: MomentDocument["id"], dto: UpdateMomentDto): Promise<void> {
      await this.momentRepository.findByIdAndUpdate(momentId, dto);
   }

   async deleteMoment(userId: UserDocument["id"], momentId: MomentDocument["id"]): Promise<void> {
      // Find moment in DB
      const moment = await this.momentRepository.findById(momentId);

      // Define image path, check if image exists and delete
      const imagePath = path.join(staticPath, (moment.photo ? moment.photo : "nothing"));
      const isImageExists = await exists(imagePath);
      if (isImageExists) await unlinker(imagePath);

      // Delete moment and update user
      await Promise.all([
         moment.delete(),
         this.userRepository.findByIdAndUpdate(userId, { $pull: { momentsIds: momentId } }),
      ]);
   }

   async uploadPhoto(momentId: MomentDocument["id"], fileName: string): Promise<void> {
      // Find moment
      const moment = await this.momentRepository.findById(momentId);

      // Delete prev image from hard drive if exists
      const imagePath = path.join(staticPath, (moment.photo ? moment.photo : "nothing"));
      const isImageExists = await exists(imagePath);

      if (isImageExists) await unlinker(imagePath);

      // Save photo do DB
      moment.photo = fileName;
      await moment.save();
   }

}