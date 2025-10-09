import { UsersService } from "src/users/users.service";


export class TeacherService{

    constructor(
        private readonly userService : UsersService,
    ){}
}