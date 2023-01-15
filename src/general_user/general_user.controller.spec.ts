import { Test, TestingModule } from '@nestjs/testing';
import { GeneralUserController } from './general_user.controller';
import { GeneralUserService } from './general_user.service';

describe('GeneralUserController', () => {
  let controller: GeneralUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeneralUserController],
      providers: [GeneralUserService],
    }).compile();

    controller = module.get<GeneralUserController>(GeneralUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
