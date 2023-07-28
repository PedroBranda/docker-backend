import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ScheduleService } from "./schedule.service";
import { CreateScheduleDto } from "./dto/createSchedule.dto";
import { AuthUser } from "../decorators/authUser.decorator";
import { Users } from "../user/user.entity";

@Controller("schedule")
export class ScheduleController {
  constructor(private readonly service: ScheduleService) {}

  @Get()
  async get() {
    return await this.service.findAll();
  }

  @Get("me")
  async getMineSchedule(@AuthUser("id") userId: number) {
    return await this.service.findMine(userId);
  }

  @Post()
  async create(
    @AuthUser() user: Users,
    @Body() createUserDto: CreateScheduleDto
  ) {
    return await this.service.create(createUserDto, user);
  }

  @Post(":scheduleId")
  async joinSchedule(
    @AuthUser() user: Users,
    @Param("scheduleId") scheduleId: number
  ) {
    return await this.service.joinSchedule(user, scheduleId);
  }

  @Patch(":scheduleId")
  async leaveSchedule(
    @AuthUser() user: Users,
    @Param("scheduleId") scheduleId: number
  ) {
    return await this.service.leaveSchedule(user, scheduleId);
  }

  @Delete()
  async delete(@AuthUser("id") userId: number) {
    await this.service.delete(userId);
  }

  @Delete(":scheduleId")
  async deleteByScheduleId(
    @AuthUser("id") userId: number,
    @Param("scheduleId") scheduleId: number
  ) {
    await this.service.deleteByScheduleId(userId, scheduleId);
  }
}
