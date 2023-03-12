import { Test, TestingModule } from '@nestjs/testing';
import { EventEntityService } from './event-entity.service';

describe('EventEntityService', () => {
  let service: EventEntityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventEntityService],
    }).compile();

    service = module.get<EventEntityService>(EventEntityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
