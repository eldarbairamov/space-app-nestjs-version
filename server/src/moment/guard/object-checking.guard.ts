import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { MomentRepository } from "@src/moment/repository/moment.repository";

@Injectable()
export class ObjectCheckingGuard implements CanActivate {

   constructor( private momentRepository: MomentRepository ) {
   }

   async canActivate( context: ExecutionContext ): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const momentId = request.params.momentId;

      if ( !Types.ObjectId.isValid( momentId ) ) throw new HttpException( "Object ID is not valid", HttpStatus.BAD_REQUEST );

      const isObjectExists = await this.momentRepository.findById( momentId );
      if ( !isObjectExists ) throw new HttpException( "Object does not exist", HttpStatus.NOT_FOUND );

      return true;
   }

}