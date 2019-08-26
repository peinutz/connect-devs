import { Context } from 'src/types/ContextInterface';
import { Resolver, Query, Ctx } from "type-graphql";
import { UserRepository } from './UserRepository';
import { getCustomRepository } from 'typeorm';
import { User } from "../../entity/User";
import { AuthenticationError } from 'apollo-server-core';

@Resolver()
export class CurrentUser {

    @Query(() => User)
        async currentUser(@Ctx() ctx : Context) {
            if(ctx.user === null) {
                throw new AuthenticationError("Error.");
            }
            const userRepository : UserRepository = getCustomRepository(UserRepository);
        
            let user =  await userRepository.findOne(ctx.user.id, {relations: ["profile"]});
            return user;  
    }
}