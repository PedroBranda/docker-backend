import { IsLatitude, IsLongitude } from 'class-validator';

export class CreateLocationDto {
  @IsLatitude()
  lat: number;

  @IsLongitude()
  lng: number;
}
