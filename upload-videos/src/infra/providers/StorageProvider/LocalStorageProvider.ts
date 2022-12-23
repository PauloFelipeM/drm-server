import { promises } from 'fs';
import { resolve } from 'path';

import upload from '@config/upload';
import { StorageProvider } from './StorageProvider';

export class LocalStorageProvider implements StorageProvider {
  async delete(file: string, folder: string): Promise<void> {
    const filename = resolve(`${upload.uploadFolder}/${folder}`, file);

    try {
      await promises.stat(filename);
    } catch (error) {
      return;
    }

    await promises.unlink(filename);
  }

  async save(file: string, folder: string): Promise<string> {
    await promises.cp(
      resolve(upload.uploadFolder, file),
      resolve(`${upload.uploadFolder}/${folder}`, file),
    );
    await promises.unlink(`${upload.uploadFolder}/${file}`);
    return file;
  }
}
