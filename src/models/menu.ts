import {
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt
} from "sequelize-typescript";

@Table
export class Menus extends Model<Menus> {
  @Column public year!: number;
  @Column public month!: number;
  @Column public day!: number;
  @Column public morning!: string;
  @Column public lunch!: string;
  @Column public dinnerA!: string;
  @Column public dinnerB!: string;
  @Column public dinnerAB!: string;

  @CreatedAt @Column public createdAt!: Date;
  @UpdatedAt @Column public updatedAt!: Date;
}
