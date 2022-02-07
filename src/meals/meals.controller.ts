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
} from '@nestjs/common';
import { MealsService } from './meals.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiFile } from 'src/decoraters/api-file.decorator';

@ApiTags('meals')
@Controller('meals')
export class MealsController {
  constructor(private readonly mealsService: MealsService) {}

  @Post()
  create(@Body() createMealDto: CreateMealDto) {
    return this.mealsService.create(createMealDto);
  }

  @Get()
  findAll() {
    return this.mealsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mealsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMealDto: UpdateMealDto) {
    return this.mealsService.update(+id, updateMealDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mealsService.remove(+id);
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

    return this.mealsService.update(id, { mealImage: file.filename });
  }
  @Get('/category/:id')
  getByCategory(@Param('id') id: number) {
    return this.mealsService.getByCategory(id);
  }
}
