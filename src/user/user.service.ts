import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPermissionLevel, Users } from './user.entity';
import { GetUserDto } from './dto/getUser.dto';
import { hash } from 'bcrypt';
import { UpdateUserDto } from './dto/updateUser.dto';
import { GetUserWithPasswordDto } from './dto/getUserWithPassword.dto';

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
        select: ['id', 'firstName', 'lastName', 'email', 'permissionLevel'],
      });
    } catch (error) {
      throw new BadRequestException({
        message: `Não foi possível listar o(s) usuário(s)`,
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
        select: ['id', 'firstName', 'lastName', 'email', 'permissionLevel'],
      });
    } catch (error) {
      throw new BadRequestException({
        message: `Não foi possível listar o usuário: ${id}`,
        error,
      });
    }
  }

  async findForAuthentication(email: string): Promise<GetUserWithPasswordDto> {
    try {
      return await this.userRepository.findOneOrFail({ where: { email } });
    } catch (error) {
      throw new BadRequestException(
        'E-mail ou senha informados podem estar incorretos',
      );
    }
  }

  async create(user: Users): Promise<Users> {
    const hasUserWithEmail = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (hasUserWithEmail) {
      throw new BadRequestException('O e-mail informado já foi cadastrado');
    }

    try {
      const hashedPassword = await this.hashPassword(user.password);

      return await this.userRepository.save(
        this.userRepository.create({
          ...user,
          permissionLevel: UserPermissionLevel.player,
          password: hashedPassword,
        }),
      );
    } catch (error) {
      throw new BadRequestException({
        message: 'Não foi possível criar usuário',
        error,
      });
    }
  }

  async update(id: number, user: UpdateUserDto): Promise<Users> {
    try {
      await this.userRepository.update(id, { ...user });

      return await this.userRepository.findOneOrFail({
        where: { id },
        select: ['id', 'firstName', 'lastName', 'email'],
      });
    } catch (error) {
      throw new BadRequestException({
        message: `Não foi possível editar o usuário: ${id}`,
        error,
      });
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.userRepository.findOneOrFail({
        where: { id },
      });

      await this.userRepository.delete(id);
    } catch (error) {
      throw new BadRequestException({
        message: `Não foi possível excluir o usuário: ${id}`,
        error,
      });
    }
  }
}
