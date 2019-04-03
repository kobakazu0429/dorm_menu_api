import {
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt
} from "sequelize-typescript";

@Table
export class IsSaved extends Model<IsSaved> {
  @Column public year!: number;
  @Column public month!: number;
  @Column public isSaved!: boolean;

  @CreatedAt @Column public createdAt!: Date;
  @UpdatedAt @Column public updatedAt!: Date;
}
