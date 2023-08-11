import { IsLatitude, IsLongitude } from "class-validator";

export class CreateLocationDto {
  @IsLatitude({ message: "O campo 'lat' deve ser um ponto de latitude" })
  readonly lat: number;

  @IsLongitude({ message: "O campo 'lng' deve ser um ponto de latitude" })
  readonly lng: number;
}
