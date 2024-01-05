import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryColumn("varchar")
  username: string;

  @Column("varchar", {nullable: true})
  password: string;

  @Column("integer")
  balance: number;

  @Column("boolean")
  isAdmin: boolean;

  @Column("varchar", { nullable: true })
  token: string;
}
