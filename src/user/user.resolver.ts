import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { CreateUserInput } from './dtos/create-user.dto';
import { LoginInput } from './dtos/login.dto';
import { User } from './schema/user.schema';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  @Role(['ANY'])
  async me(@AuthUser() user: User) {
    return user;
  }

  @Mutation(() => String)
  async login(@Args('input') input: LoginInput) {
    return this.userService.logUserIn(input);
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput) {
    return this.userService.createUser(input);
  }
}
