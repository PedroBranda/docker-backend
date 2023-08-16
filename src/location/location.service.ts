import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Locations } from "./location.entity";
import { LocationRepository } from "./location.repository";
import { Repository } from "typeorm";

@Injectable()
export class LocationService extends Repository<Locations> {
  constructor(
    @InjectRepository(Locations)
    private readonly repository: LocationRepository
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
