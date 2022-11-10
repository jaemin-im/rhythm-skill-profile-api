import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SkillProfileModule } from './skill-profile/skill-profile.module';
import { JwtModule } from './jwt/jwt.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './src/schema.gql',
      introspection: process.env.STAGE === 'development',
      playground: process.env.STAGE === 'development',
    }),
    JwtModule.forRoot({
      privateKey: process.env.JWT_SECRET,
    }),
    UserModule,
    AuthModule,
    SkillProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
