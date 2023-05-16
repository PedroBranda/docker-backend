import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUsersDto } from './dto/createUsers.dto';
import { GetUsersDto } from './dto/getUsers.dto';
import { UsersService } from './users.service';
import { UpdateUsersDto } from './dto/updateUsers.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  get(): Promise<GetUsersDto[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number): Promise<GetUsersDto> {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() usersDto: CreateUsersDto) {
    return this.usersService.create(usersDto);
  }

  @Patch()
  update(@Body() usersDto: UpdateUsersDto) {
    return this.usersService.update(usersDto.id, usersDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.usersService.delete(id);
  }
}
