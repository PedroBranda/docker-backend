import { Column, Entity, Index, OneToOne } from "typeorm";
import { Point } from "geojson";
import { AbstractEntity } from "../abstract/abstract.entity";
import { Schedules } from "../schedule/schedule.entity";

export enum LocationTypes {
  user,
  schedule,
}

@Entity()
export class Locations extends AbstractEntity {
  @Index({ spatial: true })
  @Column({
    type: "geography",
    srid: 4326,
    spatialFeatureType: "Point",
  })
  point: Point;

  @Column({ type: "enum", enum: LocationTypes })
  locationType: number;

  // RELATIONS

  @OneToOne(() => Schedules, (schedule) => schedule.location)
  schedule: Schedules;
}
