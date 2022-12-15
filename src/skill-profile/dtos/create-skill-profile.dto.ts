import { IsEmail, IsString } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

// import { UserRole } from '../enums/user-role.enum';

@InputType()
export class CreateSkillProfileInput {
  @Field(() => String)
  @IsString()
  username: string;

  @Field(() => String)
  @IsString()
  password: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  //   @Field(() => UserRole, { nullable: true })
  //   @IsEnum(UserRole)
  //   role?: UserRole;
}
