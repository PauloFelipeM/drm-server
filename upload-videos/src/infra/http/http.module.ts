import { Module } from '@nestjs/common';
import { VideoController } from './controllers/video.controller';
import { UploadVideo } from '@application/use-cases/upload-video';
import { DatabaseModule } from '@infra/database/database.module';
import { ProvidersModule } from '@infra/providers/providers.module';

@Module({
  imports: [DatabaseModule, ProvidersModule],
  controllers: [VideoController],
  providers: [UploadVideo],
})
export class HttpModule {}
