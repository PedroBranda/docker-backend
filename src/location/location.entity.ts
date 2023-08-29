import { Column, Entity, Index, OneToOne } from "typeorm";
import { Point } from "geojson";
import { AbstractEntity } from "../common/abstract/abstract.entity";
import { Schedules } from "../schedule/schedule.entity";

export enum LocationTypes {
  user = 1,
  schedule = 2,
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
