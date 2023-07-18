import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserService } from './user.service';
import { Public } from 'src/decorators/public.decorator';
import { AuthUser } from '../decorators/authUser.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  get() {
    return this.usersService.findAll();
  }

  @Get('me')
  getMe(@AuthUser('id') userId: number) {
    return this.usersService.findOne(userId);
  }

  @Get(':id')
  getOne(@Param('id') userId: number) {
    return this.usersService.findOne(userId);
  }

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch()
  update(@AuthUser('id') userId: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete()
  delete(@AuthUser('id') userId: number) {
    return this.usersService.delete(userId);
  }
}
