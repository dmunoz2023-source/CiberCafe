// create the all routes for the application
import { Router } from 'express';
import { UserController } from './../src/Modules/User/Web/Controller/UserController.js';

export class Routes {
  public router: Router;
  private userController: UserController;

  constructor() {
    this.router = Router();
    this.userController = new UserController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/users/:id', this.userController.findById.bind(this.userController));
    this.router.get('/users', this.userController.findAll.bind(this.userController));
    this.router.post('/users', this.userController.create.bind(this.userController));
    this.router.put('/users/:id', this.userController.update.bind(this.userController));
    this.router.delete('/users/:id', this.userController.delete.bind(this.userController));
  }

  private createUserRoutes(): void {
    this.router.post('/users/login', this.userController.login.bind(this.userController));
    this.router.post('/users/register', this.userController.register.bind(this.userController));
  }
    
}