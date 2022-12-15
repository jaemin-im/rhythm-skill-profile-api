import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthenticationError } from 'apollo-server-express';
import { JwtService } from 'src/jwt/jwt.service';
import { PrismaService } from 'src/prisma.service';
import { CreateUserInput } from './dtos/create-user.dto';
import { LoginInput } from './dtos/login.dto';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async createUser(input: CreateUserInput) {
    return this.prisma.user.create({
      data: input,
    });
  }

  async logUserIn(input: LoginInput) {
    const { username, password } = input;

    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        username,
      },
    });

    if (!user) {
      throw new AuthenticationError('Check your username and password.');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      return this.jwtService.sign(user.id);
    } else {
      throw new AuthenticationError('Check your username and password.');
    }
  }

  async getOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async findUserById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}
