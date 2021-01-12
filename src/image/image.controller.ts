import { Controller, Post } from '@nestjs/common';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  async postImage() {
    return this.imageService.receiveAndEdit();
  }
}
