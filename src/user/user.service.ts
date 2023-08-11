import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "./user.entity";
import { hash } from "bcrypt";
import { type UpdateUserDto } from "./dto/updateUser.dto";
import { UserRepository } from "./user.repository";
import { isAfter, subYears } from "date-fns";
import { GetUserDto } from "./dto/getUser.dto";

// TODO: create JSDoc to all service functions and methods
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly repository: UserRepository
  ) {}

  async findAll(query: GetUserDto) {
    try {
      const [result, total] = await this.repository.findAndCount({
        where: { ...query },
        select: [
          "id",
          "firstName",
          "lastName",
          "email",
          "document",
          "gender",
          "birthDate",
          "phone",
          "documentType",
          "permissions",
          "createdAt",
          "createdBy",
          "updatedAt",
          "updatedBy",
          "deletedAt",
          "deletedBy",
        ],
        order: { id: "ASC" },
      });

      return { result, total };
    } catch (error) {
      throw new BadRequestException({
        message: "Não foi possível listar os usuários",
      });
    }
  }

  async findOne(id: number) {
    try {
      return {
        result: await this.repository.findOneOrFail({
          withDeleted: false,
          where: { id },
          select: [
            "id",
            "firstName",
            "lastName",
            "email",
            "document",
            "gender",
            "birthDate",
            "phone",
            "documentType",
            "permissions",
            "createdAt",
            "createdBy",
            "updatedAt",
            "updatedBy",
            "deletedAt",
            "deletedBy",
          ],
        }),
      };
    } catch (error) {
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

      return {
        result: await this.repository.save(
          this.repository.create({
            ...user,
            password: hashedPassword,
          })
        ),
      };
    } catch (error) {
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
        result: await this.repository.findOneOrFail({
          where: { id },
          select: [
            "id",
            "firstName",
            "lastName",
            "email",
            "document",
            "documentType",
            "permissions",
            "createdAt",
            "createdBy",
            "updatedAt",
            "updatedBy",
            "deletedAt",
            "deletedBy",
          ],
        }),
      };
    } catch (error) {
      throw new BadRequestException({
        message: `Não foi possível editar o usuário: ${id}`,
      });
    }
  }

  async delete(id: number) {
    try {
      await this.repository.softDelete({ id });
    } catch (error) {
      throw new BadRequestException({
        message: `Não foi possível deletar o usuário: ${id}`,
      });
    }
  }
}
