import { BadRequestException, Injectable } from "@nestjs/common";
import { Between, In } from "typeorm";
import { Schedules } from "./schedule.entity";
import { type CreateScheduleDto } from "./dto/createSchedule.dto";
import { addHours, addMinutes, addSeconds, isAfter, isBefore } from "date-fns";
import { LocationTypes } from "../location/location.entity";
import { type Users } from "../user/user.entity";
import { TeamRepository } from "../team/team.repository";
import { ScheduleRepository } from "./schedule.repository";
import { GetScheduleDto } from "./dto/getSchedule.dto";

@Injectable()
export class ScheduleService {
  constructor(
    private readonly repository: ScheduleRepository,
    private readonly teamRepository: TeamRepository
  ) {}

  async findOne(id: number) {
    try {
      return {
        result: await this.repository.findOneOrFail({
          where: { id },
          relations: { location: true, team: { users: true }, creator: true },
          select: {
            id: true,
            sportType: true,
            sportModality: true,
            startScheduleDate: true,
            endScheduleDate: true,
            team: {
              teamSizeLimit: true,
              users: { id: true, firstName: true, lastName: true },
            },
            location: { point: { coordinates: true } },
            creator: { id: true, firstName: true, lastName: true },
          },
          order: { startScheduleDate: "DESC" },
        }),
      };
    } catch (_) {
      throw new BadRequestException({
        message: `Não foi possível listar o time: ${id}`,
      });
    }
  }

  async find(query: GetScheduleDto) {
    try {
      const take = query.perPage;
      const skip = take * (query.page - 1);
      const [result, total] = await this.repository.findAndCount({
        where: {
          sportType: query.sportType || undefined,
          sportModality: query.sportModality || undefined,
          startScheduleDate: this.repository.createStartScheduleDateFilter({
            isOpen: query.isOpen,
            startScheduleDate: query.startScheduleDate,
          }),
          period: query.period || undefined,
          creator: { id: query.createdBy } || undefined,
          updater: { id: query.updatedBy } || undefined,
          deleter: { id: query.deletedBy } || undefined,
        },
        relations: { location: true, team: { users: true }, creator: true },
        select: {
          id: true,
          sportType: true,
          sportModality: true,
          startScheduleDate: true,
          endScheduleDate: true,
          team: {
            teamSizeLimit: true,
            users: { id: true, firstName: true, lastName: true },
          },
          location: { point: { coordinates: true } },
          creator: { id: true, firstName: true, lastName: true },
        },
        order: { startScheduleDate: "DESC" },
        skip: skip || undefined,
        take: take || undefined,
      });
      return { result, total };
    } catch (_) {
      throw new BadRequestException({
        message: "Não foi possível listar os times",
      });
    }
  }

  async findMine(id: number, query: GetScheduleDto) {
    try {
      const take = query.perPage;
      const skip = take * (query.page - 1);
      const teams = await this.teamRepository.find({
        where: { users: { id } },
        select: { id: true },
      });
      const [result, total] = await this.repository.findAndCount({
        where: {
          team: { id: In(teams.map((team) => team.id)) },
          sportType: query.sportType || undefined,
          sportModality: query.sportModality || undefined,
          startScheduleDate: this.repository.createStartScheduleDateFilter({
            isOpen: query.isOpen,
            startScheduleDate: query.startScheduleDate,
          }),
          period: query.period || undefined,
          creator: { id: query.createdBy } || undefined,
          updater: { id: query.updatedBy } || undefined,
          deleter: { id: query.deletedBy } || undefined,
        },
        relations: { location: true, team: { users: true }, creator: true },
        select: {
          id: true,
          sportType: true,
          sportModality: true,
          startScheduleDate: true,
          endScheduleDate: true,
          team: {
            teamSizeLimit: true,
            users: { id: true, firstName: true, lastName: true },
          },
          location: { point: { coordinates: true } },
          creator: { id: true, firstName: true, lastName: true },
        },
        order: { startScheduleDate: "DESC" },
        take: take || undefined,
        skip: skip || undefined,
      });

      return { result, total };
    } catch (_) {
      throw new BadRequestException({
        message: "Não foi possível listar seus times",
      });
    }
  }

  async create(params: CreateScheduleDto, user: Users) {
    if (
      isBefore(addMinutes(new Date(params.startScheduleDate), 1), new Date())
    ) {
      throw new BadRequestException({
        message:
          "A data do agendamento precisa ser maior ou igual a data atual",
      });
    }

    const openedSchedule = await this.repository.findOne({
      where: [
        // {
        //   createdBy: user.id,
        //   startScheduleDate: Between(
        //     new Date(params.startScheduleDate),
        //     addHours(new Date(params.startScheduleDate), params.period)
        //   ),
        // },
        {
          createdBy: user.id,
          endScheduleDate: Between(
            addSeconds(new Date(params.startScheduleDate), 1),
            addHours(new Date(params.startScheduleDate), params.period)
          ),
        },
        // {
        //   team: {
        //     users: { id: user.id },
        //   },
        //   startScheduleDate: Between(
        //     new Date(params.startScheduleDate),
        //     addHours(new Date(params.startScheduleDate), params.period)
        //   ),
        // },
        {
          team: {
            users: { id: user.id },
          },
          endScheduleDate: Between(
            addSeconds(new Date(params.startScheduleDate), 1),
            addHours(new Date(params.startScheduleDate), params.period)
          ),
        },
      ],
      select: { id: true },
    });

    if (openedSchedule) {
      throw new BadRequestException({
        message:
          "Você não pode criar um time se já possuir um time aberto no mesmo período",
      });
    }

    try {
      const scheduleToSave = this.repository.create({
        ...params,
        createdBy: user.id,
        updatedBy: user.id,
        endScheduleDate: addHours(
          new Date(params.startScheduleDate),
          params.period
        ),
        location: {
          locationType: LocationTypes.schedule,
          createdBy: user.id,
          updatedBy: user.id,
          point: {
            type: "Point",
            coordinates: [params.lat, params.lng],
          },
        },
        team: {
          users: [user],
          createdBy: user.id,
          updatedBy: user.id,
          teamSizeLimit: params.teamLimitSize,
        },
      });

      await this.repository.save(scheduleToSave);

      return {
        result: "Time criado com sucesso",
      };
    } catch (_) {
      throw new BadRequestException({
        message: "Não foi possível criar o time",
      });
    }
  }

  async joinSchedule(user: Users, scheduleId: number) {
    let scheduleToJoin: Schedules;

    try {
      scheduleToJoin = await this.repository.findOneOrFail({
        where: { id: scheduleId },
        relations: {
          location: true,
          team: { users: true },
        },
      });
    } catch (_) {
      throw new BadRequestException({
        message: `Agendamento do time: ${scheduleId} não foi encontrado`,
      });
    }

    if (isAfter(new Date(), new Date(scheduleToJoin.startScheduleDate))) {
      throw new BadRequestException({
        message: `O agendamento do time: ${scheduleId} está fechado, infelizmente você não pode mais entrar`,
      });
    }

    if (scheduleToJoin.team.users.length >= scheduleToJoin.team.teamSizeLimit) {
      throw new BadRequestException({
        message: "O time está cheio, infelizmente você não pôde entrar",
      });
    }

    const isInsideTheTeam = await this.teamRepository.findOne({
      where: {
        id: scheduleToJoin.team.id,
        users: { id: user.id },
      },
      select: { id: true },
    });

    if (isInsideTheTeam) {
      throw new BadRequestException({
        message: "Você já está no time",
      });
    }

    const openedSchedule = await this.repository.findOne({
      where: [
        // {
        //   createdBy: user.id,
        //   startScheduleDate: Between(
        //     new Date(scheduleToJoin.startScheduleDate),
        //     addHours(
        //       new Date(scheduleToJoin.startScheduleDate),
        //       scheduleToJoin.period
        //     )
        //   ),
        // },
        {
          createdBy: user.id,
          endScheduleDate: Between(
            addSeconds(new Date(scheduleToJoin.startScheduleDate), 1),
            addHours(
              new Date(scheduleToJoin.startScheduleDate),
              scheduleToJoin.period
            )
          ),
        },
        // {
        //   team: {
        //     users: { id: user.id },
        //   },
        //   startScheduleDate: Between(
        //     new Date(scheduleToJoin.startScheduleDate),
        //     addHours(
        //       new Date(scheduleToJoin.startScheduleDate),
        //       scheduleToJoin.period
        //     )
        //   ),
        // },
        {
          team: {
            users: { id: user.id },
          },
          endScheduleDate: Between(
            addSeconds(new Date(scheduleToJoin.startScheduleDate), 1),
            addHours(
              new Date(scheduleToJoin.startScheduleDate),
              scheduleToJoin.period
            )
          ),
        },
      ],
      select: { id: true },
    });

    if (openedSchedule) {
      throw new BadRequestException({
        message:
          "Você não pode entrar no time se já possuir um time aberto no mesmo período",
      });
    }

    scheduleToJoin.team.users.push(user);
    scheduleToJoin.updatedBy = user.id;
    scheduleToJoin.updatedAt = new Date();

    try {
      await this.repository.save(scheduleToJoin);

      return { result: "Você entrou no time com sucesso" };
    } catch (_) {
      throw new BadRequestException({
        message: "Não foi possível entrar no time",
      });
    }
  }

  async leaveSchedule(user: Users, scheduleId: number) {
    let scheduleToLeave: Schedules;

    try {
      scheduleToLeave = await this.repository.findOneOrFail({
        where: { id: scheduleId, team: { users: { id: user.id } } },
        select: { id: true, startScheduleDate: true, createdBy: true },
      });
    } catch (e) {
      throw new BadRequestException({
        message: `Você não participa deste time`,
      });
    }

    if (isAfter(new Date(), new Date(scheduleToLeave.startScheduleDate))) {
      throw new BadRequestException({
        message: `O agendamento do time: ${scheduleId} está fechado, infelizmente você não pode mais entrar`,
      });
    }

    if (scheduleToLeave.createdBy === user.id) {
      throw new BadRequestException({
        message: "Você não pode sair de um time criado por você",
      });
    }

    scheduleToLeave = await this.repository.findOne({
      where: { id: scheduleToLeave.id },
      relations: { team: { users: true }, location: true },
    });

    scheduleToLeave.team.users = scheduleToLeave.team.users.filter(
      (_user) => _user.id !== user.id
    );

    try {
      await this.repository.save({
        ...scheduleToLeave,
        updatedBy: user.id,
        updatedAt: new Date(),
      });

      return { result: "Você saiu do time com sucesso" };
    } catch (_) {
      throw new BadRequestException({
        message: "Não foi possível sair do time",
      });
    }
  }

  async deleteByScheduleId(user: number, scheduleId: number) {
    try {
      const schedule = await this.repository.findOneOrFail({
        where: {
          id: scheduleId,
          createdBy: user,
        },
        relations: { team: true, location: true },
        select: { id: true, location: { id: true }, team: { id: true } },
      });

      await this.repository.softRemove(schedule);

      return { result: "Time excluído com sucesso" };
    } catch (_) {
      throw new BadRequestException({
        message: `Não foi possível excluir o time: ${scheduleId}`,
      });
    }
  }
}
