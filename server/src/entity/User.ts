import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  constructor(name: string, email: string, encryptedPassword: string) {
    super();

    this.name = name;
    this.email = email;
    this.password = encryptedPassword;
    this.date = new Date();
  }

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column("text", { unique: true })
  email: string;

  @Column()
  password: string;

  @Field()
  @Column({ nullable: true })
  avatar: string;

  @Column()
  date: Date;
}
