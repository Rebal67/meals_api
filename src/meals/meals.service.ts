import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { Meal } from './entities/meal.entity';

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(Meal)
    private mealsRepository: Repository<Meal>,
  ) {}
  create(createMealDto: CreateMealDto) {
    const meal = this.mealsRepository.create(createMealDto);
    return this.mealsRepository.save(meal);
  }

  findAll() {
    return this.mealsRepository.find({ relations: ['categories'] });
  }

  findOne(id: number) {
    return this.mealsRepository.findOne(id);
  }

  update(id: number, updateMealDto: UpdateMealDto) {
    return this.mealsRepository.update(id, updateMealDto);
  }

  remove(id: number) {
    return this.mealsRepository.delete(id);
  }
}
