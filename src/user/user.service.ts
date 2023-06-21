import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
import { GetUserDto } from './dto/getUser.dto';
import { hash } from 'bcrypt';
import { UpdateUserDto } from './dto/updateUser.dto';
import { GetUserWithPasswordDto } from './dto/getUserWithPassword.dto';

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

  async findAll(): Promise<GetUserDto[]> {
    try {
      return await this.userRepository.find({
        select: [
          'id',
          'firstName',
          'lastName',
          'email',
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
    } catch (error) {
      throw new BadRequestException({
        message: `Unable to list the users`,
        error,
      });
    }
  }

  async findWhere(user: GetUserDto): Promise<GetUserDto> {
    try {
      return await this.userRepository.findOneOrFail({ where: { ...user } });
    } catch (error) {
      throw new Error();
    }
  }

  async findOne(id: number): Promise<GetUserDto> {
    try {
      return await this.userRepository.findOneOrFail({
        where: { id },
        select: [
          'id',
          'firstName',
          'lastName',
          'email',
          'permissions',
          'createdAt',
          'createdBy',
          'updatedAt',
          'updatedBy',
          'deletedAt',
          'deletedBy',
        ],
      });
    } catch (error) {
      throw new BadRequestException({
        message: `Unable to list the user: ${id}`,
        error,
      });
    }
  }

  async findForAuthentication(email: string): Promise<GetUserWithPasswordDto> {
    try {
      return await this.userRepository.findOneOrFail({ where: { email } });
    } catch (error) {
      throw new BadRequestException({
        message: 'E-mail or password given can be wrong',
        error,
      });
    }
  }

  async create(user: Users): Promise<Users> {
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

      return await this.userRepository.save(
        this.userRepository.create({
          ...user,
          password: hashedPassword,
        }),
      );
    } catch (error) {
      throw new BadRequestException({
        message: 'Unable to create user',
        error,
      });
    }
  }

  async update(id: number, user: UpdateUserDto): Promise<Users> {
    try {
      await this.userRepository.update(id, {
        ...user,
        updatedBy: id,
      });

      return await this.userRepository.findOneOrFail({
        where: { id },
        select: [
          'id',
          'firstName',
          'lastName',
          'email',
          'permissions',
          'createdAt',
          'createdBy',
          'updatedAt',
          'updatedBy',
          'deletedAt',
          'deletedBy',
        ],
      });
    } catch (error) {
      throw new BadRequestException({
        message: `Unable to edit the user: ${id}`,
        error,
      });
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.userRepository.findOneOrFail({
        where: { id },
      });

      await this.userRepository.softDelete({ id });
    } catch (error) {
      throw new BadRequestException({
        message: `Unable to delete the user: ${id}`,
        error,
      });
    }
  }
}
