import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MealsModule } from './meals/meals.module';
import { CategoriesModule } from './categories/categories.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    MealsModule,
    TypeOrmModule.forRoot(),
    CategoriesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'upload'),
      exclude: ['/api*'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
