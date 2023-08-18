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
import { ScheduleService } from "./schedule.service";
import { CreateScheduleDto } from "./dto/createSchedule.dto";
import { AuthUser } from "../decorators/authUser.decorator";
import { Users } from "../user/user.entity";
import { GetScheduleDto } from "./dto/getSchedule.dto";

@Controller("schedule")
export class ScheduleController {
  constructor(private readonly service: ScheduleService) {}

  @Get()
  async get(@Query() query: GetScheduleDto) {
    return await this.service.find(query);
  }

  @Get("me")
  async getMineSchedule(
    @Query() query: GetScheduleDto,
    @AuthUser("id") userId: number
  ) {
    return await this.service.findMine(userId, query);
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

  @Delete(":scheduleId")
  async deleteByScheduleId(
    @AuthUser("id") userId: number,
    @Param("scheduleId") scheduleId: number
  ) {
    return await this.service.deleteByScheduleId(userId, scheduleId);
  }
}
