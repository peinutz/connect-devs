import { getCustomRepository, BaseEntity } from "typeorm";
import { Query, Mutation, Arg, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { UserRepository } from "./UserRepository";
import * as bcrypt from "bcryptjs";

@Resolver()
export class RegisterResolver extends BaseEntity {
  @Query(() => String)
  async hello() {
    return "dsdasdsd!!!";
  }

  @Mutation(() => User)
  async register(
    @Arg("name") name: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<User> {
    const userRepository: UserRepository = getCustomRepository(UserRepository);

    const encryptedPassword = await bcrypt.hash(password, 12);
    const user = await userRepository.createUser(name, email, encryptedPassword);
    return user;
  }
}
