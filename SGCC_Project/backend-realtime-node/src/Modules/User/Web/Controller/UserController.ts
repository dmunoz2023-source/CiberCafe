import { UserRepository } from "../../Infrastructure/Repository/UserRepositoryInterface.js";

export class UserController {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async findById(req: any, res: any): Promise<void> {
    // logic to find a user by id
  }
  public async findAll(req: any, res: any): Promise<void> {
    // logic to find all users
  }
  public async create(req: any, res: any): Promise<void> {
    // logic to create a new user
  }
  public async update(req: any, res: any): Promise<void> {
    // logic to update a user by id
  }
  public async delete(req: any, res: any): Promise<void> {
    // logic to delete a user by id
  }
  public async login(req: any, res: any): Promise<void> {
    // logic to login a user
  }
  public async register(req: any, res: any): Promise<void> {
    // logic to register a new user
  }
}