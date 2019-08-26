import { Context } from 'src/types/ContextInterface';
import { User } from './../../entity/User';
import { Profile } from './../../entity/Profile';
import { getCustomRepository, BaseEntity, } from "typeorm";
import { Query, Arg, Resolver, Authorized, Mutation, Ctx } from "type-graphql";
import { UserRepository } from '../users/UserRepository';

@Resolver()
export class UserResolver extends BaseEntity {
  @Query(() => User!)
  @Authorized()
  async getUser(@Arg("handle") handle : string) {
    
    const user = await getCustomRepository(UserRepository)
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.profile", "profile", "profile.id = user.profile")
    .where("profile.handle = :handle", {handle})
    .getOne();

    if(user) {
      return user;
    }
    return null;
  }

  @Authorized()
  @Query(() => [User])
  async getAllUsers() {
    const userRepository: UserRepository = getCustomRepository(UserRepository);
    const users = await userRepository.find({relations: ["profile"] });
    return users;
  }

  @Mutation(() => Boolean)
  @Authorized()
  async deleteUser(
    @Ctx() ctx : Context) {

      const userRepository: UserRepository = getCustomRepository(UserRepository);

      const user = await userRepository.findOne(ctx.user.id, {relations: ["profile"]});

      if(user) {
        const profile = user.profile;
        userRepository.delete(user);
        Profile.delete(profile);
      }
      else {
        throw new Error("No user found.");
      }

    return true;  
  }

}
