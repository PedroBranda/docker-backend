import { IsLatitude, IsLongitude } from 'class-validator';

export class CreateLocationDto {
  @IsLatitude()
  readonly lat: number;

  @IsLongitude()
  readonly lng: number;
}
