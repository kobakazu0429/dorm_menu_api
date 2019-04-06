import {
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt
} from "sequelize-typescript";

@Table({ modelName: "is_saved_menu" })
export class IsSavedMenu extends Model<IsSavedMenu> {
  @Column public year!: number;
  @Column public month!: number;
  @Column public isSaved!: boolean;

  @CreatedAt @Column readonly createdAt!: Date;
  @UpdatedAt @Column readonly updatedAt!: Date;
}
