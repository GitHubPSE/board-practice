import {Injectable, NotFoundException} from "@nestjs/common";
import {CreatePostDto} from "./dto/create-post.dto";
import {UpdatePostDto} from "./dto/update-post.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {PostEntity} from "./post.entity";
import {Repository} from "typeorm";

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostEntity)
        private readonly postRepository: Repository<PostEntity>,
    ) {
        console.log('PostService 생성자 실행');
    }

    async findAll(): Promise<PostEntity[]> {
        return await this.postRepository.find();
    }

    async add(dto: CreatePostDto): Promise<PostEntity> {
        const addPost = this.postRepository.create({title: dto.title, content: dto.content})
        return await this.postRepository.save(addPost);
    }

    async findOne(id: number): Promise<PostEntity>{
        const findPost = await this.postRepository.findOneBy({id:id});
        if(!findPost){
            throw new NotFoundException('글이 없습니다.');
        }
        return findPost;
    }

    async remove(id: number): Promise<void>{
        const delPost = await this.findOne(id);
        await this.postRepository.remove(delPost);
    }

    async updateOne(id:number, dto: UpdatePostDto): Promise<PostEntity>{
        const updatePost = await this.findOne(id);
        if (dto.title !== undefined){
            updatePost.title = dto.title;
        }
        if (dto.content !== undefined){
            updatePost.content = dto.content;
        }
        return await this.postRepository.save(updatePost);
    }

}