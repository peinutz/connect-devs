
import { Field, InputType } from "type-graphql";

@InputType()
export class ProfileDto {
    @Field({nullable: true})
    id: number

    @Field()
    handle: string

    @Field()
    company: string

    @Field()
    website: string

    @Field()
    location: string

    @Field()
    status: string

    @Field()
    bio: string

    @Field()
    githubusername: string

    @Field()
    skills: string

}