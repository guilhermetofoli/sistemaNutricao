import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'usuarios', // ou 'users'
})
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({ allowNull: false })
  declare nome: string;

  @Column({ allowNull: false, unique: true })
  declare email: string;

  @Column({ allowNull: false })
  declare senha: string;
  @Column({
    type: DataType.ENUM('ADMIN', 'NUTRI', 'PACIENTE'),
    defaultValue: 'PACIENTE',
  })
  declare tipo: string;
}