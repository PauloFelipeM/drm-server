import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateVideoBody } from '../dtos/create-video-body';
import { UploadVideo } from '@application/use-cases/upload-video';
import { FileInterceptor } from '@nestjs/platform-express';
import upload from '@config/upload';

@Controller()
export class UploadVideoController {
  constructor(private uploadVideo: UploadVideo) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('video', {
      storage: upload.storage,
    }),
  )
  async upload(
    @Body() body: CreateVideoBody,
    @UploadedFile() video: Express.Multer.File,
  ) {
    const { clientId, title } = body;

    await this.uploadVideo.execute({
      clientId,
      title,
      video,
    });
  }
}
