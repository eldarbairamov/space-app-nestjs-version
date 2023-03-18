import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserRepository } from "@src/user/repository/user.repository";
import { RegistrationDto } from "@src/auth/dto";

@Injectable()
export class RegistrationGuard implements CanActivate {

   constructor(private userRepository: UserRepository) {
   }

   async canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest();
      const candidate = request.body as RegistrationDto;

      const IsEmailUnique = await this.userRepository.findOne({ email: candidate.email });

      if (IsEmailUnique) {
         throw new HttpException("This email is already in use", HttpStatus.CONFLICT);
      }

      return true;
   }
}