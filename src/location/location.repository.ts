import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Locations } from './location.entity';

export class LocationRepository extends Repository<Locations> {
  constructor(
    @InjectRepository(Locations)
    private readonly repository: Repository<Locations>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
