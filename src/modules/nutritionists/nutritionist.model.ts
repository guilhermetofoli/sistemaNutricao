import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../users/user.model';

@Table
export class Nutritionist extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  declare id: number;

  @Column({ allowNull: false })
  crn!: string;

  @Column({ allowNull: false })
  especialidade!: string;

  @Column(DataType.FLOAT)
  valor_consulta!: number;

  @Column
  endereco_atendimento!: string;

  // Chave estrangeira para o Usuário
  @ForeignKey(() => User)
  @Column({ allowNull: false })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
}