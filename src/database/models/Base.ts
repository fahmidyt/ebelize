import {
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

@Table({ paranoid: true, timestamps: true })
class Base<
    TModelAttributes extends {} = any,
    TCreationAttributes extends {} = TModelAttributes
  >
  extends Model<TModelAttributes, TCreationAttributes>
  implements BaseEntity
{
  @IsUUID(4)
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  public declare id: string;

  @CreatedAt
  @Column({ allowNull: false })
  public declare createdAt: Date;

  @UpdatedAt
  @Column({ allowNull: false })
  public declare updatedAt: Date;

  @DeletedAt
  public declare deletedAt: Date | null;
}

export default Base;
