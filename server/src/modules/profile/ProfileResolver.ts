import { User } from './../../entity/User';
import { Profile } from '../../entity/Profile';
import { Context } from 'src/types/ContextInterface';
import { ProfileDto } from './ProfileDto';
import { getCustomRepository, BaseEntity, getConnection, } from "typeorm";
import { Query, Mutation, Arg, Resolver, Ctx, Authorized } from "type-graphql";
import { UserRepository } from '../users/UserRepository';

@Resolver()
export class ProfileResolver extends BaseEntity {
  @Query(() => Profile)
  @Authorized()
  async getProfile(@Ctx() ctx : Context) {
    const userRepository: UserRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne(ctx.user.id, {relations: ["profile"]});
    if(user) {
      return user.profile;
    }
    return null;
  }

  @Mutation(() => Profile)
  async createOrUpdateProfile(
    @Arg("data") {id, handle, company, website, location, status, bio, githubusername, skills} : ProfileDto,
    @Ctx() ctx : Context) {
    const userRepository: UserRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(ctx.user.id, {relations: ["profile"]});
    if(user) {
        const profile = new Profile();
        profile.id = id;
        profile.company = company;
        profile.handle = handle;
        profile.website = website;
        profile.location = location;
        profile.status= status;
        profile.bio = bio;
        profile.date = new Date();
        profile.githubusername = githubusername;
        profile.skills = skills;
    
        const savedProfile = await Profile.save(profile);
        user.profile = savedProfile;
        userRepository.save(user);
        return profile;
       }

    return null;  
  }

  @Mutation(() => Boolean)
  @Authorized()
  async deleteUser(
    @Ctx() ctx : Context) {

      const userRepository: UserRepository = getCustomRepository(UserRepository);

      const user = await userRepository.findOne(ctx.user.id, {relations: ["profile"]});

      if(user) {
        await getConnection()
        .createQueryBuilder()
        .relation(User, "profile")
        .of(user)
        .set(null); 
      }
      else {
        throw new Error("No user found.");
      }

    return true;  
  }

}
