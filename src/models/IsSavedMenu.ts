import {
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt
} from "sequelize-typescript";

interface IMenu {
  id: number;
  year: number;
  month: number;
  isSaved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Table({ modelName: "is_saved_menu" })
export class IsSavedMenu extends Model<IsSavedMenu> {
  public static async isSavedTargetMonth(options: {
    year: number;
    month: number;
  }) {
    const result = (await IsSavedMenu.findOne({
      where: {
        year: options.year,
        month: options.month
      }
    }).toJSON()) as IMenu;

    if (result === null) return false;

    return result.isSaved;
  }

  @Column public year!: number;
  @Column public month!: number;
  @Column public isSaved!: boolean;

  @CreatedAt @Column public readonly createdAt!: Date;
  @UpdatedAt @Column public readonly updatedAt!: Date;
}
