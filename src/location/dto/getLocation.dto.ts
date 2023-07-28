import { IsDateString, IsNumber, IsObject, IsOptional } from "class-validator";

export class GetLocationDto {
  @IsNumber()
  @IsOptional()
  readonly id?: number;

  @IsObject()
  @IsOptional()
  readonly point?: {
    type: "Point";
    coordinates: number;
    bbox: number;
  };

  @IsNumber()
  @IsOptional()
  readonly locationType?: number;

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
