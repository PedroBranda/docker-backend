import { BadRequestException, Injectable } from "@nestjs/common";
import { Users } from "./user.entity";
import { hash } from "bcrypt";
import { type UpdateUserDto } from "./dto/updateUser.dto";
import { UserRepository } from "./user.repository";
import { isAfter, subYears } from "date-fns";
import { GetUserDto } from "./dto/getUser.dto";
import { ScheduleRepository } from "../schedule/schedule.repository";
import { LocationRepository } from "../location/location.repository";
import { TeamRepository } from "../team/team.repository";
import { FindOptionsSelect } from "typeorm";
import { validateCPF } from "../utils/validators";

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly scheduleRepository: ScheduleRepository,
    private readonly teamRepository: TeamRepository,
    private readonly locationRepository: LocationRepository
  ) {}

  async findAll(query: GetUserDto) {
    try {
      const [result, total] = await this.repository.findAndCount({
        where: { ...query },
        select: {
          firstName: true,
          lastName: true,
        },
        order: { id: "ASC" },
      });

      return { result, total };
    } catch (_) {
      throw new BadRequestException({
        message: "Não foi possível listar os usuários",
      });
    }
  }

  async findOne(id: number, select?: FindOptionsSelect<Users>) {
    try {
      return {
        result: await this.repository.findOneOrFail({
          withDeleted: false,
          where: { id },
          select: { ...select },
        }),
      };
    } catch (_) {
      throw new BadRequestException({
        message: `Não foi possível listar o usuário: ${id}`,
      });
    }
  }

  async hashPassword(password: string) {
    const saltRounds = 10;
    return await hash(password, saltRounds);
  }

  async create(user: Users) {
    const isValidDocument = validateCPF(user.document);

    const isUnderAge = isAfter(
      new Date(user.birthDate),
      new Date(subYears(new Date().setHours(0, 0, 0, 0), 18))
    );

    const hasUserWithEmail = await this.repository.findOne({
      where: { email: user.email },
    });

    const hasUserWithDocument = await this.repository.findOne({
      where: { document: user.document },
    });

    if (!isValidDocument) {
      throw new BadRequestException({
        message: "Você deve informar um CPF válido",
      });
    }

    if (isUnderAge) {
      throw new BadRequestException({
        message: "Você deve ser maior de idade para se registrar",
      });
    }

    if (hasUserWithEmail) {
      throw new BadRequestException({
        message: "O e-mail informado já foi registrado",
      });
    }

    if (hasUserWithDocument) {
      throw new BadRequestException({
        message: "O documento informado já foi registrado",
      });
    }

    try {
      const hashedPassword = await this.hashPassword(user.password);
      await this.repository.save(
        this.repository.create({
          ...user,
          password: hashedPassword,
        })
      );
      return {
        result: "Usuário criado com sucesso",
      };
    } catch (_) {
      throw new BadRequestException({
        message: "Não foi possível criar o usuário",
      });
    }
  }

  async update(id: number, user: UpdateUserDto) {
    try {
      await this.repository.update(id, {
        ...user,
        updatedBy: id,
      });

      return {
        result: "Usuário atualizado com sucesso",
      };
    } catch (_) {
      throw new BadRequestException({
        message: `Não foi possível editar o usuário: ${id}`,
      });
    }
  }

  async delete(id: number) {
    try {
      const selfOpenedSchedules = await this.scheduleRepository.find({
        where: { createdBy: id },
        relations: { location: true, team: true },
        select: { id: true, location: { id: true }, team: { id: true } },
      });

      const schedulesId = selfOpenedSchedules.map((schedule) => schedule.id);
      const teamsId = selfOpenedSchedules.map(({ team }) => team.id);
      const locationsId = selfOpenedSchedules.map(
        ({ location }) => location.id
      );

      await this.scheduleRepository.softDelete(schedulesId);
      await this.teamRepository.softDelete(teamsId);
      await this.locationRepository.softDelete(locationsId);
      await this.repository.softDelete({ id });

      return { result: "Usuário deletado com sucesso" };
    } catch (_) {
      throw new BadRequestException({
        message: `Não foi possível deletar o usuário: ${id}`,
      });
    }
  }
}
