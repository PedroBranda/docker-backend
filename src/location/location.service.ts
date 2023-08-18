import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Locations } from "./location.entity";
import { LocationRepository } from "./location.repository";

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Locations)
    private readonly repository: LocationRepository
  ) {}
}
