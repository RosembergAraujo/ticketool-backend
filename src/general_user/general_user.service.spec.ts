import { Test, TestingModule } from '@nestjs/testing';
import { GeneralUserService } from './general_user.service';

describe('GeneralUserService', () => {
  let service: GeneralUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneralUserService],
    }).compile();

    service = module.get<GeneralUserService>(GeneralUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
