import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class RefreshGuard extends AuthGuard("refresh") {
   canActivate(context: ExecutionContext) {
      return super.canActivate(context);
   }

   handleRequest(err, data) {
      if (err || !data) throw new UnauthorizedException("Unauthorized");
      return data;
   }

}