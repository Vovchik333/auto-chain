import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from 'src/schemas/category.schema';

const DEFAULT_CATEGORIES = [
  { name: 'investment', color: '#4CAF50' }, 
  { name: 'food', color: '#FF7043' }, 
  { name: 'salary', color: '#2E7D32' }, 
  { name: 'education', color: '#42A5F5' }, 
  { name: 'travel', color: '#26C6DA' }, 
  { name: 'business', color: '#7E57C2' }, 
  { name: 'healthcare', color: '#EF5350' }, 
  { name: 'utilities', color: '#FFA726' }, 
  { name: 'shopping', color: '#AB47BC' }, 
  { name: 'entertainment', color: '#FFCA28' }, 
  { name: 'imported', color: '#90A4AE' }, 
  { name: 'other', color: '#BDBDBD' }, 
];

@Injectable()
export class CategorySeeder implements OnModuleInit {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>
  ) {}

  async onModuleInit() {
    const count = await this.categoryModel.estimatedDocumentCount();
    if (count === 0) {
      await this.categoryModel.insertMany(DEFAULT_CATEGORIES);
      console.log('Default categories seeded.');
    } else {
      console.log('Categories already exist. Skipping seed.');
    }
  }
}