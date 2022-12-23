import { VideoRepository } from '@application/repositories/video-repository';
import { Injectable } from '@nestjs/common';
import { StorageProvider } from '@infra/providers/StorageProvider/StorageProvider';
import { Video } from '@application/entities/video';

interface UploadVideoRequest {
  clientId: string;
  title: string;
  video: Express.Multer.File;
}

@Injectable()
export class UploadVideo {
  constructor(
    private videoRepository: VideoRepository,
    private storageProvider: StorageProvider,
  ) {}

  async execute(request: UploadVideoRequest): Promise<void> {
    const { clientId, title, video } = request;
    const fileName = video.filename;

    const newUploadVideo = new Video({
      clientId,
      title,
      disk: process.env.FILESYSTEM_DISK ?? 'local',
      originalName: video.originalname,
      storageName: fileName,
    });

    await this.storageProvider.save(fileName, newUploadVideo.id);
    await this.videoRepository.create(newUploadVideo);
  }
}
