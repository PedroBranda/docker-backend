import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entity/users.entity';
import { GetUsersDto } from './dto/getUsers.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUsersDto } from './dto/updateUsers.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  }

  async findAll(): Promise<GetUsersDto[]> {
    return await this.userRepository.find({
      select: ['id', 'firstName', 'lastName', 'email'],
    });
  }

  async findOne(id: number): Promise<GetUsersDto> {
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

      throw new BadRequestException('Não foi possível criar usuário!');
    }
  }

  async update(id: number, user: UpdateUsersDto): Promise<Users> {
    console.log({ user });

    await this.userRepository.update(id, user);
    return await this.userRepository.findOne({
      where: { id },
      select: ['id', 'firstName', 'lastName', 'email'],
    });
  }

  async delete(id: number): Promise<void> {
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
