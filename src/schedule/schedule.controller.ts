import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/createSchedule.dto';
import { AuthUser } from '../decorators/authUser.decorator';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get()
  get() {
    return this.scheduleService.findAll();
  }

  @Get('me')
  getMineSchedule(@AuthUser('id') id: number) {
    return this.scheduleService.findMineSchedule(id);
  }

  @Post()
  create(@AuthUser('id') id: number, @Body() createUserDto: CreateScheduleDto) {
    return this.scheduleService.create(createUserDto, id);
  }

  @Delete()
  delete(@AuthUser('id') id: number) {
    return this.scheduleService.delete(id);
  }
}
