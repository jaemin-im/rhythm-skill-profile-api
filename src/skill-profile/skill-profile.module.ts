import { Module } from '@nestjs/common';
import { SkillProfileResolver } from './skill-profile.resolver';
import { SkillProfileService } from './skill-profile.service';

@Module({
  providers: [SkillProfileResolver, SkillProfileService],
})
export class SkillProfileModule {}
