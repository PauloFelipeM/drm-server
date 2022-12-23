import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { FFMPEGTranscode } from '@infra/processors/HLSVideoProcessor/FFMPEGTranscode';
import { HLSVideoProcessor } from '@infra/processors/HLSVideoProcessor/HLSVideoProcessor';
import { DatabaseModule } from '@infra/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    BullModule.forRootAsync({
      useFactory: async () => ({
        redis: {
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT),
          password: process.env.REDIS_PASSWORD,
        },
      }),
    }),
    BullModule.registerQueue({
      name: 'transcode-video-queue',
    }),
  ],
  controllers: [],
  providers: [   {
    provide: HLSVideoProcessor,
    useClass: FFMPEGTranscode,
  }],
  exports: [BullModule, HLSVideoProcessor],
})
export class ProcessorsModule {}
