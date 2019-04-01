import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt
} from "sequelize-typescript";

@Table
export class Menu extends Model<Menu> {
  @Column public year!: number;
  @Column public month!: number;
  @Column public isSaved!: boolean;

  @CreatedAt
  @Column
  public createdAt!: Date;

  @UpdatedAt
  @Column
  public updatedAt!: Date;
}
