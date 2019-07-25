import { User } from "./../../entity/User";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(name: string, email: string, encryptedPassword: string): Promise<User> {
    const user = await new User(name, email, encryptedPassword);

    return this.manager.save(user);
  }
}
