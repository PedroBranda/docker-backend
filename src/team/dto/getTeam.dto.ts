import { IsDateString, IsNumber, IsObject, IsOptional } from 'class-validator';
import { GetUserDto } from '../../user/dto/getUser.dto';

export class GetTeamDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsNumber()
  @IsOptional()
  teamSizeLimit?: number;

  @IsObject()
  @IsOptional()
  users?: GetUserDto;

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
