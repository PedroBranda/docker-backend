import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { Point } from "geojson";
import { AbstractEntity } from "../abstract/abstract.entity";

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
}
