import { randomBytes } from 'node:crypto';
import { diskStorage } from 'multer';
import { resolve, parse } from 'path';

const tmpFolder = resolve(__dirname, '..', '..', '..', 'tmp');

export default {
  tmpFolder,
  storage: diskStorage({
    destination: tmpFolder,
    filename: (request, file, callback) => {
      const fileHash = 'file-' + randomBytes(10).toString('hex');
      const extension = parse(file.originalname).ext;
      const fileName = `${fileHash}${extension}`;
      return callback(null, fileName);
    },
  }),
};
