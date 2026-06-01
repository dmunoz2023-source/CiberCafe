import { User } from "../../Domain/Entity/User.js";

export interface UserRepositoryInterface {
  findById(id: string): User | null;
  findByUsername(username: string): User | null;
  save(user: User): void;
  findAll(): User[];
}
