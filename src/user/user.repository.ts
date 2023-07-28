import { Repository } from "typeorm";
import { Users } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";

export class UserRepository extends Repository<Users> {
  constructor(
    @InjectRepository(Users)
    private readonly repository: Repository<Users>
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
