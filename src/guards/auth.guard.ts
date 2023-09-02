import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { UsersRepository } from "../users/users.repository";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly usersService: UsersService,
    private readonly usersRepository: UsersRepository,
  ) { }


  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest(); 
    const { authorization } = request.headers;

    // regras
    try {
      const data = this.usersService.checkToken((authorization ?? "").split(" ")[1]); 
      const user = await this.usersRepository.getById(parseInt(data.sub));
      request.user = user; 
      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException()
    }
  }

}