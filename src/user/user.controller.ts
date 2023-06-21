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

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch()
  update(
    @AuthUser('id') authUser: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(authUser, updateUserDto);
  }

  @Delete()
  delete(@AuthUser('id') authUser: number) {
    return this.usersService.delete(authUser);
  }
}
