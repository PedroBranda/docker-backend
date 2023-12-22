import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Locations } from "./location.entity";
import { LocationRepository } from "./location.repository";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";
import * as process from "process";
import { Nominatim } from "../types/address";
import { AxiosResponse } from "axios";

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Locations)
    private readonly repository: LocationRepository,
    private readonly httpService: HttpService
  ) {}

  async getReverseGeocoding(lat: number, lon: number) {
    try {
      const { data } = await lastValueFrom<AxiosResponse<Nominatim>>(
        this.httpService.get(process.env.REVERSE_GEOCODING_API_URL, {
          params: {
            format: "json",
            lat,
            lon,
          },
        })
      );

      return data.address;
    } catch (_) {
      throw new BadRequestException({
        message: "Não foi possível buscar o endereço",
      });
    }
  }
}
