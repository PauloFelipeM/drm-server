import { Controller, Get, Param, StreamableFile } from '@nestjs/common';
import upload from '@config/upload';
import { createReadStream } from 'fs';
import { resolve } from 'path';

@Controller()
export class StreamVideoController {
  @Get('stream/:folder/:fileName')
  getFile(
    @Param('folder') folder: string,
    @Param('fileName') fileName: string,
  ): StreamableFile {
    const file = createReadStream(
      resolve(`${upload.uploadFolder}/${folder}/chunks/${fileName}`),
    );
    return new StreamableFile(file);
  }
}
