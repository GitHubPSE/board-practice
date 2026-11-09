import {ConflictException, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./user.entity";
import {Repository} from "typeorm";
import {SignUpDto} from "./dto/sign-up.dto";
import {UserResponseDto} from "./dto/user-response.dto";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {
    }

    async signUp(dto: SignUpDto): Promise<UserResponseDto>{
       const exists = await this.userRepository.findOneBy({email: dto.email});
       if(exists){
           throw new ConflictException('이미 가입된 이메일입니다.');
       }
       const hashed = await bcrypt.hash(dto.password, 10);
       const user = this.userRepository.create({email:dto.email, password:hashed});
       const saved = await this.userRepository.save(user);
       return {id: saved.id, email: saved.email, createdAt: saved.createdAt};
    }

}