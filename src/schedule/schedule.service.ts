import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, In } from 'typeorm';
import { Schedules } from './schedule.entity';
import { CreateScheduleDto } from './dto/createSchedule.dto';
import { addHours, addMinutes, addSeconds, isBefore } from 'date-fns';
import { LocationTypes } from '../location/location.entity';
import { Users } from '../user/user.entity';
import { TeamRepository } from '../team/team.repository';
import { ScheduleRepository } from './schedule.repository';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedules)
    private readonly repository: ScheduleRepository,
    private readonly teamRepository: TeamRepository,
  ) {}

  async findAll() {
    try {
      const [result, total] = await this.repository.findAndCount({
        relations: ['location', 'team', 'team.users'],
        order: { createdAt: 'DESC' },
      });
      return { result, total };
    } catch (error) {
      throw new BadRequestException({
        message: 'Unable to list the schedules',
      });
    }
  }

  async findMine(id) {
    try {
      const schedules = await this.repository.find({
        where: { team: { users: { id } } },
        select: ['id'],
      });
      const schedulesId = schedules.map((schedule) => schedule.id);
      const [result, total] = await this.repository.findAndCount({
        where: { id: In(schedulesId) },
        relations: ['location', 'team', 'team.users'],
        order: { createdAt: 'DESC' },
      });
      return { result, total };
    } catch (error) {
      throw new BadRequestException({
        message: 'Unable to list mine schedules',
      });
    }
  }

  async create(params: CreateScheduleDto, user: Users) {
    if (
      isBefore(addMinutes(new Date(params.startScheduleDate), 1), new Date())
    ) {
      throw new BadRequestException({
        message: 'Schedule date must be greater or equal now',
      });
    }

    const openedSchedule = await this.repository.findOne({
      where: [
        {
          createdBy: user.id,
          startScheduleDate: Between(
            new Date(params.startScheduleDate),
            addHours(new Date(params.startScheduleDate), params.period),
          ),
        },
        {
          createdBy: user.id,
          endScheduleDate: Between(
            addSeconds(new Date(params.startScheduleDate), 1),
            addHours(new Date(params.startScheduleDate), params.period),
          ),
        },
        {
          team: {
            users: { id: user.id },
          },
          startScheduleDate: Between(
            new Date(params.startScheduleDate),
            addHours(new Date(params.startScheduleDate), params.period),
          ),
        },
        {
          team: {
            users: { id: user.id },
          },
          endScheduleDate: Between(
            addSeconds(new Date(params.startScheduleDate), 1),
            addHours(new Date(params.startScheduleDate), params.period),
          ),
        },
      ],
    });

    if (openedSchedule) {
      throw new BadRequestException({
        message:
          "You can't create a schedule if you're already in a open schedule at that date period",
      });
    }

    try {
      const scheduleToSave = this.repository.create({
        ...params,
        createdBy: user.id,
        endScheduleDate: addHours(
          new Date(params.startScheduleDate),
          params.period,
        ),
        location: {
          locationType: LocationTypes.schedule,
          point: {
            type: 'Point',
            coordinates: [params.lat, params.lng],
          },
        },
        team: {
          users: [user],
          teamSizeLimit: params.teamLimitSize,
        },
      });

      return {
        result: await this.repository.save(scheduleToSave),
      };
    } catch (error) {
      throw new BadRequestException({
        message: 'Unable to create the schedule',
      });
    }
  }

  async joinSchedule(user: Users, scheduleId: number) {
    let scheduleToJoin: Schedules;

    try {
      scheduleToJoin = await this.repository.findOneOrFail({
        where: { id: scheduleId },
        relations: ['team', 'team.users'],
      });
    } catch (error) {
      throw new BadRequestException({
        message: `Schedule: ${scheduleId} was not found`,
      });
    }

    if (scheduleToJoin.endScheduleDate < new Date()) {
      throw new BadRequestException({
        message: `Schedule: ${scheduleId} is closed`,
      });
    }

    if (scheduleToJoin.team.users.length >= scheduleToJoin.team.teamSizeLimit) {
      throw new BadRequestException({
        message: "The schedule team is already full, you can't join it anymore",
      });
    }

    const isInsideTheTeam = await this.teamRepository.findOne({
      where: {
        id: scheduleToJoin.team.id,
        users: { id: user.id },
      },
    });

    if (isInsideTheTeam) {
      throw new BadRequestException({
        message: "You're already inside the schedule team",
      });
    }

    const openedSchedule = await this.repository.findOne({
      where: [
        {
          createdBy: user.id,
          startScheduleDate: Between(
            new Date(scheduleToJoin.startScheduleDate),
            addHours(
              new Date(scheduleToJoin.startScheduleDate),
              scheduleToJoin.period,
            ),
          ),
        },
        {
          createdBy: user.id,
          endScheduleDate: Between(
            addSeconds(new Date(scheduleToJoin.startScheduleDate), 1),
            addHours(
              new Date(scheduleToJoin.startScheduleDate),
              scheduleToJoin.period,
            ),
          ),
        },
        {
          team: {
            users: { id: user.id },
          },
          startScheduleDate: Between(
            new Date(scheduleToJoin.startScheduleDate),
            addHours(
              new Date(scheduleToJoin.startScheduleDate),
              scheduleToJoin.period,
            ),
          ),
        },
        {
          team: {
            users: { id: user.id },
          },
          endScheduleDate: Between(
            addSeconds(new Date(scheduleToJoin.startScheduleDate), 1),
            addHours(
              new Date(scheduleToJoin.startScheduleDate),
              scheduleToJoin.period,
            ),
          ),
        },
      ],
    });

    if (openedSchedule) {
      throw new BadRequestException({
        message:
          "You can't join a schedule if you're already in a open schedule at that date period",
      });
    }

    scheduleToJoin.team.users.push(user);

    try {
      return await this.repository.save({
        ...scheduleToJoin,
        updatedBy: user.id,
        updatedAt: new Date(),
      });
    } catch (error) {
      throw new BadRequestException({ message: 'Unable to join the squad' });
    }
  }

  async leaveSchedule(user: Users, scheduleId: number) {
    let scheduleToLeave: Schedules;

    try {
      scheduleToLeave = await this.repository.findOneOrFail({
        where: { id: scheduleId, team: { users: { id: user.id } } },
        select: ['id', 'endScheduleDate', 'createdBy'],
      });
    } catch (e) {
      throw new BadRequestException({
        message: `Schedule: ${scheduleId} was not found`,
      });
    }

    if (scheduleToLeave.endScheduleDate < new Date()) {
      throw new BadRequestException({
        message: `Schedule: ${scheduleId} is closed`,
      });
    }

    if (scheduleToLeave.createdBy === user.id) {
      throw new BadRequestException({
        message: "You can't leave a self created open schedule",
      });
    }

    scheduleToLeave = await this.repository.findOne({
      where: { id: scheduleToLeave.id },
      relations: ['team', 'team.users'],
    });

    scheduleToLeave.team.users = scheduleToLeave.team.users.filter(
      (_user) => _user.id !== user.id,
    );

    try {
      return await this.repository.save({
        ...scheduleToLeave,
        updatedBy: user.id,
        updatedAt: new Date(),
      });
    } catch (error) {
      throw new BadRequestException({ message: 'Unable to leave the squad' });
    }
  }

  async delete(user: number) {
    try {
      const { id } = await this.repository.findOneOrFail({
        where: { createdBy: user },
        order: { createdAt: 'ASC' },
      });
      await this.repository.softDelete(id);
    } catch (error) {
      throw new BadRequestException({ message: 'Unable to delete schedule' });
    }
  }

  async deleteByScheduleId(user: number, scheduleId: number) {
    try {
      await this.repository.findOneOrFail({
        where: {
          id: scheduleId,
          createdBy: user,
        },
        order: { createdAt: 'ASC' },
      });
      await this.repository.softDelete(scheduleId);
    } catch (error) {
      throw new BadRequestException({
        message: `Unable to delete schedule: ${scheduleId}`,
      });
    }
  }
}
