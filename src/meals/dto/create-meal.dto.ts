import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Category } from 'src/categories/entities/category.entity';
import { Complexity, Effort } from '../entities/meal.entity';

export class CreateMealDto {
  @IsString()
  title: string;

  @IsEnum(Effort)
  effort: Effort;

  @IsEnum(Complexity)
  complexity: Complexity;

  @IsNumber()
  duration: number;

  @IsOptional()
  @IsBoolean()
  isGlutenFree: boolean;

  @IsOptional()
  @IsBoolean()
  isVegan: boolean;

  @IsOptional()
  @IsBoolean()
  isVegetarian: boolean;

  @IsArray()
  @IsString({ each: true })
  ingredients: string[];

  @IsArray()
  @IsString({ each: true })
  steps: string[];

  mealImage;

  @Type(() => Category)
  categories: Category[];
}
