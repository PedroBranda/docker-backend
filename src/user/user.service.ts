import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
import { GetUserDto } from './dto/getUser.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  }

  async findAll(): Promise<GetUserDto[]> {
    return await this.userRepository.find({
      select: ['id', 'firstName', 'lastName', 'email'],
    });
  }

  async findOne(id: number): Promise<GetUserDto> {
    const hasUser = await this.userRepository.findOne({ where: { id } });

    if (!hasUser) {
      throw new BadRequestException(`O usuário: ${id}, não existe`);
    }

    try {
      return await this.userRepository.findOne({
        where: { id },
        select: ['id', 'firstName', 'lastName', 'email'],
      });
    } catch (error) {
      console.log(error);

      throw new BadRequestException(`Não foi possível listar o usuário: ${id}`);
    }
  }

  async create(user: Users): Promise<Users> {
    const hasEmail = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (hasEmail) {
      throw new BadRequestException('O e-mail informado já foi cadastrado');
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
      console.log(error);

      throw new BadRequestException('Não foi possível criar usuário');
    }
  }

  async update(id: number, user: UpdateUserDto): Promise<Users> {
    try {
      await this.userRepository.update(id, user);
      return await this.userRepository.findOne({
        where: { id },
        select: ['id', 'firstName', 'lastName', 'email'],
      });
    } catch (error) {
      console.log(error);

      throw new BadRequestException(`Não foi possível editar o usuário: ${id}`);
    }
  }

  async delete(id: number): Promise<void> {
    const hasUser = await this.userRepository.findOne({ where: { id } });

    if (!hasUser) {
      throw new BadRequestException(`O usuário: ${id}, não existe`);
    }

    try {
      await this.userRepository.delete(id);
    } catch (error) {
      console.log(error);

      throw new BadRequestException(
        `Não foi possível excluir o usuário: ${id}`,
      );
    }
  }
}
