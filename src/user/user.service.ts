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

  async findOne(id: number) {
    try {
      return {
        result: await this.userRepository.findOneOrFail({
          withDeleted: false,
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
        }),
      };
    } catch (error) {
      throw new BadRequestException({
        message: `Unable to list the user: ${id}`,
        error,
      });
    }
  }

  async findWhere(params: GetUserDto) {
    try {
      return {
        result: await this.userRepository.findOneOrFail({
          where: { ...params },
          select: ['id', 'password'],
        }),
      };
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

      return {
        result: await this.userRepository.save(
          this.userRepository.create({
            ...user,
            password: hashedPassword,
          }),
        ),
      };
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

      return {
        result: await this.userRepository.findOneOrFail({
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
        }),
      };
    } catch (error) {
      throw new BadRequestException({
        message: `Unable to edit the user: ${id}`,
        error,
      });
    }
  }

  async delete(id: number) {
    try {
      await this.userRepository.softDelete({ id });
    } catch (error) {
      throw new BadRequestException({
        message: `Unable to delete the user: ${id}`,
        error,
      });
    }
  }
}
