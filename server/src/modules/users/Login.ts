import { Mutation, Arg, Resolver } from "type-graphql";
import { UserRepository } from "./UserRepository";
import { getCustomRepository } from "typeorm";
import * as bcrypt from "bcryptjs";
import * as  jsonwebtoken from 'jsonwebtoken';

@Resolver()
export class LoginResolver {

    @Mutation(() => String)
    async login(@Arg("email") email : string, @Arg("password") password :string) {
        const userRepository : UserRepository = getCustomRepository(UserRepository);
        
        const user = await userRepository.findOne({where: {email}});
        
        if (!user) {
            throw new Error('No user with that email')
        }

        const valid = await bcrypt.compare(password, user.password);

        if(!valid) {
            throw new Error('Wrong password');
        }

        return jsonwebtoken.sign(
            { id: user.id, email: user.email },
            "secret",
            { expiresIn: '1d' }
        )
    }
}