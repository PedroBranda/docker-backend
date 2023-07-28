import { IsDateString, IsNumber, IsObject, IsOptional } from "class-validator";
import { GetTeamDto } from "../../team/dto/getTeam.dto";
import { GetLocationDto } from "../../location/dto/getLocation.dto";

export class GetScheduleDto {
  @IsNumber()
  @IsOptional()
  readonly id?: number;

  @IsNumber()
  @IsOptional()
  readonly sportType?: number;

  @IsNumber()
  @IsOptional()
  readonly sportModality?: number;

  @IsDateString()
  readonly startScheduleDate?: Date;

  @IsDateString()
  @IsOptional()
  readonly endScheduleDate?: Date;

  @IsObject()
  @IsOptional()
  readonly location?: GetLocationDto;

  @IsObject()
  @IsOptional()
  readonly team?: GetTeamDto;

  @IsNumber()
  @IsOptional()
  readonly period?: number;

  @IsDateString()
  @IsOptional()
  readonly createdAt?: Date;

  @IsDateString()
  @IsOptional()
  readonly updatedAt?: Date;

  @IsDateString()
  @IsOptional()
  readonly deletedAt?: Date;

  @IsNumber()
  @IsOptional()
  readonly createdBy?: number;

  @IsNumber()
  @IsOptional()
  readonly updatedBy?: number;

  @IsNumber()
  @IsOptional()
  readonly deletedBy?: number;
}
