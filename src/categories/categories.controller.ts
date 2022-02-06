import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Express } from 'express';
import { CategoriesService } from './categories.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiFile } from 'src/decoraters/api-file.decorator';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { NotFoundError } from 'rxjs';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @ApiFile()
  @Post(':id/image')
  upload(@UploadedFile() file: Express.Multer.File, @Param('id') id: number) {
    if (!file)
      throw new BadRequestException({
        statusCode: 400,
        message: ["file shoudn't be empty"],
        error: 'Bad Request',
      });

    this.categoriesService.update(id, { image: file.filename });
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }

  @Get(':id/meals')
  async getMeals(@Param('id') id: number) {
    const categories = await this.categoriesService.findOne(id);
    if (!categories) throw new NotFoundException();
    console.log(categories.meals);
    return categories.meals;
  }
}
