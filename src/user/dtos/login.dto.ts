import { IsString } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field(() => String)
  @IsString()
  username: string;

  @Field(() => String)
  @IsString()
  password: string;
}
