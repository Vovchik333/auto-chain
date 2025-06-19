import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Category, CategorySchema } from 'src/schemas/category.schema';
import { CategorySeeder } from 'src/modules/categories/categories.seed';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema }
    ]),
    SharedModule
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategorySeeder],
  exports: [CategoriesService]
})
export class CategoriesModule {}
