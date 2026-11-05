import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post} from "@nestjs/common";
import {PostService} from "./post.service";
import {CreatePostDto} from "./dto/create-post.dto";
import {UpdatePostDto} from "./dto/update-post.dto";
import {PostEntity} from "./post.entity";

@Controller('posts')
export class PostController{
    private readonly postService:PostService;

    constructor(postService:PostService) {
        this.postService = postService;

        console.log('PostController 생성자 실행, 받은 것:', postService.constructor.name);
    }

    @Get()
    async findAll(): Promise<PostEntity[]>{
        return this.postService.findAll();
    }

    @Post()
    async add(@Body() dto: CreatePostDto): Promise<PostEntity> {
        return this.postService.add(dto);
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id:number){
        return this.postService.findOne(id);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id:number){
        return this.postService.remove(id);
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id:number, @Body() dto: UpdatePostDto): Promise<PostEntity>{
        return this.postService.updateOne(id, dto);
    }

}
