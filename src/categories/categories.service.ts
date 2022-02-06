import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepositry: Repository<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    const category = new Category();
    category.name = createCategoryDto.name;
    return this.categoriesRepositry.save(category);
  }

  findAll() {
    return this.categoriesRepositry.find();
  }

  findOne(id: number) {
    return this.categoriesRepositry.findOne(id);
  }

  update(id: number, updateCategoryDto) {
    return this.categoriesRepositry.update(id, updateCategoryDto);
  }

  remove(id: number) {
    return this.categoriesRepositry.delete(id);
  }
}
