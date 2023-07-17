import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Locations } from './location.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Locations)
    private readonly scheduleRepository: Repository<Locations>,
  ) {}
}
