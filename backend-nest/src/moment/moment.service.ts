import { Injectable } from "@nestjs/common";
import { MomentRepository } from "./repository/moment.repository";
import { IMomentResponse, IMomentsResponse } from "./interface/moment-response.interface";
import { MomentPresenter } from "./presenter/moment.presenter";
import { MomentDocument } from "./model/moment.model";
import { UpdateMomentDto } from "./dto";
import path from "path";
import { UserRepository } from "@src/user/repository/user.repository";
import { UserDocument } from "@src/user/model/user.model";
import { QueryDto } from "@src/common/dto";
import { staticPath } from "@src/common/constants";
import { exists, unlinker } from "@src/common/helper";

@Injectable()
export class MomentService {

   constructor(private momentRepository: MomentRepository, private userRepository: UserRepository, private momentPresenter: MomentPresenter) {
   }

   async getMoments(userId: UserDocument["id"], queryDto: QueryDto): Promise<IMomentsResponse> {
      // Find all moments / by search key
      const [ moments, count, allMoments ] = await Promise.all([
         this.momentRepository.find({ ownerId: userId }, queryDto),
         this.momentRepository.count({ ownerId: userId }, queryDto.searchKey),
         this.momentRepository.findAllByUserId(userId),
      ]);

      // Defined unique tags
      const tags = allMoments.map(moment => moment.tag);
      const uniqueTags = Array.from(new Set(tags.flat()));

      // Return presented data to client
      const presentedMoments = this.momentPresenter.array(moments);
      return { data: presentedMoments, count, tagsForFilter: uniqueTags };
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