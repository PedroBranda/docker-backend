import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { UserService } from "./user.service";
import { Public } from "src/decorators/public.decorator";
import { AuthUser } from "../decorators/authUser.decorator";

@Controller("user")
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  async get() {
    return await this.usersService.findAll();
  }

  @Get("me")
  async getMe(@AuthUser("id") userId: number) {
    return await this.usersService.findOne(userId);
  }

  @Get(":id")
  async getOne(@Param("id") userId: number) {
    return await this.usersService.findOne(userId);
  }

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Patch()
  async update(
    @AuthUser("id") userId: number,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return await this.usersService.update(userId, updateUserDto);
  }

  @Delete()
  async delete(@AuthUser("id") userId: number) {
    await this.usersService.delete(userId);
  }
}
