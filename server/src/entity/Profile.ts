import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Experience } from "./Experience";

@ObjectType()
@Entity()
export class Profile extends BaseEntity {

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  handle: string;

  @Field()
  @Column()
  company: string;

  @Field()
  @Column()
  website: string;

  @Field()
  @Column()
  location: string;

  @Field()
  @Column()
  status: string;

  @Field()
  @Column()
  date: Date;

  @Field()
  @Column()
  bio: string;

  @Field()
  @Column()
  githubusername: string;

  @Field()
  @Column()
  skills: string;

  @OneToMany(() => Experience, experience => experience.profile)
  experience: Experience[];
}
