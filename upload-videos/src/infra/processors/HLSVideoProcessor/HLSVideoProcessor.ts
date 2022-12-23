import { Job } from 'bull';

export abstract class HLSVideoProcessor {
  abstract transcode(job: Job);
}
