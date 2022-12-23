import { VideoRepository } from '@application/repositories/video-repository';
import { Injectable } from '@nestjs/common';
import { StorageProvider } from '@infra/providers/StorageProvider/StorageProvider';
import { Video } from '@application/entities/video';
import { join, resolve } from 'path';
import upload from '@config/upload';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

interface UploadVideoRequest {
  clientId: string;
  title: string;
  video: Express.Multer.File;
}

@Injectable()
export class UploadVideo {
  constructor(
    @InjectQueue('transcode-video-queue') private transcodeVideoQueue: Queue,
    private videoRepository: VideoRepository,
    private storageProvider: StorageProvider,
  ) {}

  async execute(request: UploadVideoRequest): Promise<void> {
    const { clientId, title, video } = request;
    const fileName = video.filename;

    const videoModel = new Video({
      clientId,
      title,
      disk: process.env.FILESYSTEM_DISK ?? 'local',
      originalName: video.originalname,
      storageName: fileName,
    });

    await this.storageProvider.save(fileName, videoModel.id);
    await this.videoRepository.create(videoModel);

    await this.transcodeVideoQueue.add('transcodeVideo', {
      videoId: videoModel.id,
      fileName: fileName,
    });
  }
}
