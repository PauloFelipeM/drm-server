import { Module } from '@nestjs/common';
import { UploadVideoController } from './controllers/upload-video.controller';
import { UploadVideo } from '@application/use-cases/upload-video';
import { DatabaseModule } from '@infra/database/database.module';
import { ProvidersModule } from '@infra/providers/providers.module';
import { StreamVideoController } from '@infra/http/controllers/stream-video.controller';
import { ProcessorsModule } from '@infra/processors/processors.module';

@Module({
  imports: [DatabaseModule, ProvidersModule, ProcessorsModule],
  controllers: [UploadVideoController, StreamVideoController],
  providers: [UploadVideo],
})
export class HttpModule {}
