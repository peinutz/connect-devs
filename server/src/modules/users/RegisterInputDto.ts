import { IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterInputDto {
    @Field()
    name: string

    @Field()
    password: string

    @Field()
    @IsEmail()
    email: string
}