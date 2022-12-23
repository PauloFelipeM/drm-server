import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateVideoBody } from '../dtos/create-video-body';
import { UploadVideo } from '@application/use-cases/upload-video';
import { FileInterceptor } from '@nestjs/platform-express';
import upload from '@config/upload';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller()
export class VideoController {
  constructor(private uploadVideo: UploadVideo) {}

  @Get(':folder/:fileName')
  getFile(
    @Param('folder') folder: string,
    @Param('fileName') fileName: string,
  ): StreamableFile {
    const file = createReadStream(
      join(process.cwd(), `/tmp/${folder}/chunks/${fileName}`),
    );
    return new StreamableFile(file);
  }

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
