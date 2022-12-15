import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { LoginInput, LoginResponse } from './dto/login.dto';
import { JwtPayload } from './jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async login({
    username,
    password,
  }: LoginInput): Promise<LoginResponse | null> {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        username,
      },
    });
    const isPwEqual = await compare(password, user.password);
    if (!isPwEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const token = this._createToken(user);

    return token;
  }

  private _createToken({ id }): any {
    const user: JwtPayload = { id };
    const authorization = this.jwtService.sign(user, {
      secret: process.env.SECRETKEY,
    });
    return {
      token: authorization,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    const id = payload['id'];
    const user = await this.userService.getOne({ id });
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
