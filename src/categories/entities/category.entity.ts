import { Meal } from 'src/meals/entities/meal.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  image: string;

  @ManyToMany(() => Meal, (meal) => meal.categories)
  meals: Promise<Meal[]>;
}
