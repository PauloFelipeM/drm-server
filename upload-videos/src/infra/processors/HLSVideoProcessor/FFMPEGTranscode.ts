import { mkdirSync, existsSync, rmSync } from 'fs';
import { spawn } from 'child_process';
import { Processor, Process, InjectQueue } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { HLSVideoProcessor } from '@infra/processors/HLSVideoProcessor/HLSVideoProcessor';
import { resolve } from 'path';
import upload from '@config/upload';
import { VideoRepository } from '@application/repositories/video-repository';

@Processor('transcode-video-queue')
export class FFMPEGTranscode implements HLSVideoProcessor {
  constructor(private videoRepository: VideoRepository) {}

  @Process('transcodeVideo')
  transcode(job: Job) {
    const { videoId, fileName } = job.data;

    const inputPath = resolve(`${upload.uploadFolder}/${videoId}`);
    const outputPath = `${inputPath}/chunks`;

    if (!existsSync(outputPath)) {
      mkdirSync(outputPath);
    }

    const createHLSVOD = spawn('bash', [
      'create-hls-vod.sh',
      inputPath,
      fileName,
      outputPath,
    ]);

    createHLSVOD.on('error', (d) => {
      rmSync(outputPath, { recursive: true, force: true });
    });

    createHLSVOD.on('close', async (code) => {
      if (code !== 0) {
        rmSync(outputPath, { recursive: true, force: true });
      } else {
        const video = await this.videoRepository.findById(videoId);

        if (video) {
          video.process(`${fileName}.m3u8`);
          await this.videoRepository.save(video);
        }
      }
      console.log(`Processo concluído - código: ${code}`);
    });
  }
}
