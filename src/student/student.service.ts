import { UsersService } from "src/users/users.service";



export class StudentService{

    constructor(
        private readonly userService : UsersService,
    ){}
}