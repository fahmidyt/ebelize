import type { Optional } from "sequelize";
import Base from "./Base";
import { Column, DataType, Table } from "sequelize-typescript";

interface SessionAttributes {
  id: string;
  UserId: string;
  token: string;
  ipAddress: string;
  device?: string;
  platform?: string;
  latitude?: number;
  longitude?: number;
}

interface SessionCreationAttributes extends Optional<SessionAttributes, "id"> {}

@Table({ paranoid: true })
class Session extends Base<SessionAttributes, SessionCreationAttributes> {
  @Column({ allowNull: false, type: DataType.UUIDV4 })
  public UserId: string;

  @Column({ allowNull: false, type: DataType.STRING })
  public token: string;

  @Column({ allowNull: false, type: DataType.STRING })
  public ipAddress: string;

  @Column({ type: DataType.STRING })
  public device: string | null;

  @Column({ type: DataType.STRING })
  public platform: string | null;

  @Column({ type: DataType.FLOAT })
  public latitude: number;

  @Column({ type: DataType.FLOAT })
  public longitude: number;
}

export default Session;
