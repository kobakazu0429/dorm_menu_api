import {
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt
} from "sequelize-typescript";

@Table({ modelName: "menus" })
export class Menu extends Model<Menu> {
  @Column public year!: number;
  @Column public month!: number;
  @Column public date!: number;
  @Column public morning!: string;
  @Column public lunch!: string;
  @Column public dinnerA!: string;
  @Column public dinnerB!: string;
  @Column public dinnerAB!: string;

  @CreatedAt @Column readonly createdAt!: Date;
  @UpdatedAt @Column readonly updatedAt!: Date;
}
