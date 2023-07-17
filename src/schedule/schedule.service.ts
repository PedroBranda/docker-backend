import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedules } from './schedule.entity';
import { CreateScheduleDto } from './dto/createSchedule.dto';
import { addHours, isBefore } from 'date-fns';
import { LocationTypes } from '../location/location.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedules)
    private readonly scheduleRepository: Repository<Schedules>,
  ) {}

  async findAll() {
    try {
      const [result, total] = await this.scheduleRepository.findAndCount({
        relations: ['location'],
        order: { createdAt: 'DESC' },
      });
      return { result, total };
    } catch (error) {
      throw new BadRequestException({
        message: `Unable to list the schedules`,
      });
    }
  }

  async findMineSchedule(id) {
    try {
      return {
        result: await this.scheduleRepository.findOneOrFail({
          where: { createdBy: id },
          relations: ['location'],
        }),
      };
    } catch (error) {
      throw new BadRequestException({
        message: `Unable to list mine schedule`,
      });
    }
  }

  async create(params: CreateScheduleDto, id: number) {
    const openedSchedule = await this.scheduleRepository.findOne({
      where: { createdBy: id },
      order: { createdAt: 'DESC' },
    });

    if (openedSchedule) {
      if (
        isBefore(
          new Date(),
          addHours(openedSchedule.scheduleDate, openedSchedule.period),
        )
      ) {
        throw new BadRequestException(
          "You can't create an schedule if there is an open schedule in your response",
        );
      }
    }

    try {
      const scheduleToSave = this.scheduleRepository.create({
        ...params,
        createdBy: id,
        location: {
          locationType: LocationTypes.schedule,
          point: {
            type: 'Point',
            coordinates: [params.lat, params.lng],
          },
        },
      });
      return {
        result: await this.scheduleRepository.save(scheduleToSave),
      };
    } catch (error) {
      throw new BadRequestException({
        message: 'Unable to create the schedule',
        error,
      });
    }
  }

  async delete(user: number) {
    try {
      const { id } = await this.scheduleRepository.findOneOrFail({
        where: { createdBy: user },
      });
      await this.scheduleRepository.softDelete(id);
    } catch (error) {
      throw new BadRequestException('Unable to delete schedule');
    }
  }
}
