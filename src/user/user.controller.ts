import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { UserService } from "./user.service";
import { Public } from "src/decorators/public.decorator";
import { AuthUser } from "../decorators/authUser.decorator";
import { GetUserDto } from "./dto/getUser.dto";
import { ChangePasswordDto } from "./dto/changePassword.dto";

@Controller("user")
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  async get(@Query() query: GetUserDto) {
    return await this.usersService.find(query);
  }

  @Get("me")
  async getMe(@AuthUser("id") userId: number) {
    return await this.usersService.findMe(userId);
  }

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Patch("password")
  async updatePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @AuthUser("id") userId: number
  ) {
    return await this.usersService.updatePassword(userId, changePasswordDto);
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
    return await this.usersService.delete(userId);
  }
}
