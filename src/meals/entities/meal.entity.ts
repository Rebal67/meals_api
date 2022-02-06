import { Category } from 'src/categories/entities/category.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
export enum Complexty {
  Simple,
  Difficult,
  Hard,
}

export enum Effort {
  Little,
  Min,
  Max,
}
@Entity()
export class Meal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'enum', enum: Effort })
  effort: Effort;

  @Column({ type: 'enum', enum: Complexty })
  complexity: Complexty;

  @Column({ nullable: true })
  mealImage: string;

  @Column()
  duration: number;

  @Column({ default: false })
  isGlutenFree: boolean;

  @Column({ default: false })
  isVegan: boolean;

  @Column({ default: false })
  isVegetarian: boolean;

  @Column('simple-array')
  ingredients: string[];

  @Column('simple-array')
  steps: string[];

  @ManyToMany(() => Category, (category) => category.meals)
  @JoinTable()
  categories: Category[];
}
