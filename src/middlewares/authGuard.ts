import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject('JwtService') private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const { authorization } = ctx.getContext().req.headers;
    if (!authorization) {
      throw new UnauthorizedException('Not authenticated');
    }

    try {
      const token = authorization.split(' ')[1];
      return true;
    } catch (err) {
      throw new UnauthorizedException('Not authenticated');
    }
  }
}
