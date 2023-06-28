import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
import { GetUserDto } from './dto/getUser.dto';
import { hash } from 'bcrypt';
import { UpdateUserDto } from './dto/updateUser.dto';

// TODO: create JSDoc to all service functions and methods
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await hash(password, saltRounds);
  }

  async findAll() {
    try {
      const [result, total] = await this.userRepository.findAndCount({
        select: [
          'id',
          'firstName',
          'lastName',
          'email',
          'document',
          'documentType',
          'permissions',
          'createdAt',
          'createdBy',
          'updatedAt',
          'updatedBy',
          'deletedAt',
          'deletedBy',
        ],
        order: { id: 'ASC' },
      });

      return { result, total };
    } catch (error) {
      throw new BadRequestException({
        message: `Unable to list the users`,
        error,
      });
    }
  }

  async findWhere(user: GetUserDto) {
    try {
      return await this.userRepository.findOneOrFail({
        where: { id: user.id, email: user.email },
      });
    } catch (error) {
      throw new Error();
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.userRepository.findOneOrFail({
        where: { id },
        select: [
          'id',
          'firstName',
          'lastName',
          'email',
          'document',
          'documentType',
          'permissions',
          'createdAt',
          'createdBy',
          'updatedAt',
          'updatedBy',
          'deletedAt',
          'deletedBy',
        ],
      });

      return { result };
    } catch (error) {
      throw new BadRequestException({
        message: `Unable to list the user: ${id}`,
        error,
      });
    }
  }

  async findForAuthentication(email: string) {
    try {
      return await this.userRepository.findOneOrFail({ where: { email } });
    } catch (error) {
      throw new BadRequestException({
        message: 'E-mail or password given can be wrong',
        error,
      });
    }
  }

  async create(user: Users) {
    const hasUserWithEmail = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (hasUserWithEmail) {
      throw new BadRequestException(
        'The e-mail given has already been registered',
      );
    }

    try {
      const hashedPassword = await this.hashPassword(user.password);

      const result = await this.userRepository.save(
        this.userRepository.create({
          ...user,
          password: hashedPassword,
        }),
      );

      return { result };
    } catch (error) {
      throw new BadRequestException({
        message: 'Unable to create user',
        error,
      });
    }
  }

  async update(id: number, user: UpdateUserDto) {
    try {
      await this.userRepository.update(id, {
        ...user,
        updatedBy: id,
      });

      const result = await this.userRepository.findOneOrFail({
        where: { id },
        select: [
          'id',
          'firstName',
          'lastName',
          'email',
          'document',
          'documentType',
          'permissions',
          'createdAt',
          'createdBy',
          'updatedAt',
          'updatedBy',
          'deletedAt',
          'deletedBy',
        ],
      });

      return { result };
    } catch (error) {
      throw new BadRequestException({
        message: `Unable to edit the user: ${id}`,
        error,
      });
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.userRepository.softDelete({ id });
      await this.userRepository.update({ id }, { deletedBy: id });
    } catch (error) {
      throw new BadRequestException({
        message: `Unable to delete the user: ${id}`,
        error,
      });
    }
  }
}
