import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Profile } from "./Profile";

@ObjectType()
@Entity()
export class Experience extends BaseEntity {

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  company: string;

  @Field()
  @Column()
  location: string;

  @Field()
  @Column()
  current: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  from: Date;

  @Field()
  @Column()
  to: Date;

  @ManyToOne(() => Profile, profile => profile.experience)
  profile: Profile;
}
