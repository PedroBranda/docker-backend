import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "./user.entity";
import { hash } from "bcrypt";
import { type UpdateUserDto } from "./dto/updateUser.dto";
import { UserRepository } from "./user.repository";

// TODO: create JSDoc to all service functions and methods
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly repository: UserRepository
  ) {}

  async findAll() {
    try {
      const [result, total] = await this.repository.findAndCount({
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
        message: "Unable to list the users",
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
        message: `Unable to list the user: ${id}`,
      });
    }
  }

  async hashPassword(password: string) {
    const saltRounds = 10;
    return await hash(password, saltRounds);
  }

  async create(user: Users) {
    const hasUserWithEmail = await this.repository.findOne({
      where: { email: user.email },
    });

    if (hasUserWithEmail) {
      throw new BadRequestException({
        message: "The e-mail given has already been registered",
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
        message: "Unable to create user",
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
        message: `Unable to edit the user: ${id}`,
      });
    }
  }

  async delete(id: number) {
    try {
      await this.repository.softDelete({ id });
    } catch (error) {
      throw new BadRequestException({
        message: `Unable to delete the user: ${id}`,
      });
    }
  }
}
