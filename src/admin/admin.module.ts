import { Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { AdminService } from "./admin.service";


@Module({
    imports : [UsersModule],
    providers : [AdminService]
})

export class AdminModule{}