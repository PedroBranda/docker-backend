import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/createSchedule.dto';
import { AuthUser } from '../decorators/authUser.decorator';
import { Users } from '../user/user.entity';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly service: ScheduleService) {}

  @Get()
  get() {
    return this.service.findAll();
  }

  @Get('me')
  getMineSchedule(@AuthUser('id') userId: number) {
    return this.service.findMine(userId);
  }

  @Post()
  create(@AuthUser() user: Users, @Body() createUserDto: CreateScheduleDto) {
    return this.service.create(createUserDto, user);
  }

  @Post(':scheduleId')
  joinSchedule(
    @AuthUser() user: Users,
    @Param('scheduleId') scheduleId: number,
  ) {
    return this.service.joinSchedule(user, scheduleId);
  }

  @Patch(':scheduleId')
  leaveSchedule(
    @AuthUser() user: Users,
    @Param('scheduleId') scheduleId: number,
  ) {
    return this.service.leaveSchedule(user, scheduleId);
  }

  @Delete()
  delete(@AuthUser('id') userId: number) {
    return this.service.delete(userId);
  }

  @Delete(':scheduleId')
  deleteByScheduleId(
    @AuthUser('id') userId: number,
    @Param('scheduleId') scheduleId: number,
  ) {
    return this.service.deleteByScheduleId(userId, scheduleId);
  }
}
