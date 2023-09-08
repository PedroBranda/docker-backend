import { BadRequestException, Injectable } from "@nestjs/common";
import { hash } from "bcrypt";
import { type UpdateUserDto } from "./dto/updateUser.dto";
import { UserRepository } from "./user.repository";
import { isAfter, subYears } from "date-fns";
import { GetUserDto } from "./dto/getUser.dto";
import { ScheduleRepository } from "../schedule/schedule.repository";
import { validateCPF } from "../utils/validators";
import { CreateUserDto } from "./dto/createUser.dto";

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly scheduleRepository: ScheduleRepository
  ) {}

  async find(query: GetUserDto) {
    try {
      const take = query.perPage;
      const skip = take * (query.page - 1);
      const [result, total] = await this.repository.findAndCount({
        where: {
          document: query.document || undefined,
          documentType: query.documentType || undefined,
          gender: query.gender || undefined,
          birthDate:
            (query.birthDate && new Date(query.birthDate)) || undefined,
          phone: query.phone || undefined,
          firstName: query.firstName || undefined,
          lastName: query.lastName || undefined,
        },
        select: {
          firstName: true,
          lastName: true,
          phone: true,
          email: true,
        },
        order: { id: "ASC" },
        take: take || undefined,
        skip: skip || undefined,
      });

      return { result, total };
    } catch (_) {
      throw new BadRequestException({
        message: "Não foi possível listar os usuários",
      });
    }
  }

  async findMe(id: number) {
    try {
      return {
        result: await this.repository.findOneOrFail({
          where: { id },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            birthDate: true,
            document: true,
            gender: true,
            phone: true,
            email: true,
          },
        }),
      };
    } catch (_) {
      throw new BadRequestException({
        message: `Não foi possível listar o usuário: ${id}`,
      });
    }
  }

  async findForAuthentication(id: number) {
    try {
      return {
        result: await this.repository.findOneOrFail({ where: { id } }),
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

  async create(user: CreateUserDto) {
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

    const hasUserWithPhone = await this.repository.findOne({
      where: { phone: user.phone },
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

    if (hasUserWithPhone) {
      throw new BadRequestException({
        message: "O telefone informado já foi registrado",
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
      await this.repository.softDelete({ id });

      const selfOpenedSchedules = await this.scheduleRepository.find({
        where: { createdBy: id },
        relations: { location: true, team: true },
        select: { id: true, location: { id: true }, team: { id: true } },
      });

      await this.scheduleRepository.softRemove(selfOpenedSchedules);

      return { result: "Usuário excluído com sucesso" };
    } catch (_) {
      throw new BadRequestException({
        message: `Não foi possível excluir o usuário: ${id}`,
      });
    }
  }
}
