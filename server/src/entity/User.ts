import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Profile } from "./Profile";

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

  @Field({nullable: true})
  @Column({ nullable: true })
  avatar: string;

  @Column()
  date: Date;

  @OneToOne(() => Profile, {onDelete: "CASCADE"})
  @JoinColumn()
  @Field()
  profile: Profile;
}
