import {Body, Controller, Post} from "@nestjs/common";
import {UserService} from "./user.service";
import {SignUpDto} from "./dto/sign-up.dto";
import {UserResponseDto} from "./dto/user-response.dto";

@Controller('users')
export class UserController{
    private readonly userService:UserService;

    constructor(userService:UserService) {
        this.userService = userService;
    }

    @Post('signup')
    async add(@Body() dto: SignUpDto) : Promise<UserResponseDto>{
        return this.userService.signUp(dto);
    }

}