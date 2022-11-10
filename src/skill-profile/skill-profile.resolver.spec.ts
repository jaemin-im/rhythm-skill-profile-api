import { Test, TestingModule } from '@nestjs/testing';
import { SkillProfileResolver } from './skill-profile.resolver';

describe('SkillProfileResolver', () => {
  let resolver: SkillProfileResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SkillProfileResolver],
    }).compile();

    resolver = module.get<SkillProfileResolver>(SkillProfileResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
