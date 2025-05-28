import { 
  Controller, 
  Get, 
  Param, 
  UseGuards
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { ObjectIdPipe } from 'src/pipes/object-id.pipe';
import { ApiPath } from 'src/common/enums/api/api-path.enum';

@Controller(ApiPath.CATEGORIES)
@UseGuards(AuthGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getAll() {
    const categories = await this.categoriesService.getAll();

    return categories;
  }

  @Get(ApiPath.ID)
  async getbyId(
    @Param('id', ObjectIdPipe) id: string
  ) {
    const category = await this.categoriesService.getById(id);
    
    return category;
  }
}
