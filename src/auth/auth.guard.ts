import { JwtService } from 'src/jwt/jwt.service';
import { UserService } from 'src/user/user.service';

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '@prisma/client';

import { AllowedRole } from './role.decorator';

type Token = {
  id: string;
};

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<AllowedRole[]>(
      'roles',
      context.getHandler(),
    );

    if (!roles) return true;

    const gqlContext = GqlExecutionContext.create(context).getContext();
    const token = gqlContext['token'];

    if (!token) {
      return false;
    }

    let user: User;

    try {
      const { id } = this.jwtService.verify(`${token}`) as Token;
      const foundUser = await this.userService.findUserById(id);

      user = foundUser;
    } catch {
      return false;
    }

    if (!user) return false;

    gqlContext['user'] = user;

    return roles.includes('ANY') || roles.includes(user.role);
  }
}
