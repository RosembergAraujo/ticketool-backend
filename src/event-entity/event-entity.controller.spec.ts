import { Test, TestingModule } from '@nestjs/testing';
import { EventEntityController } from './event-entity.controller';
import { EventEntityService } from './event-entity.service';

describe('EventEntityController', () => {
  let controller: EventEntityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventEntityController],
      providers: [EventEntityService],
    }).compile();

    controller = module.get<EventEntityController>(EventEntityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
