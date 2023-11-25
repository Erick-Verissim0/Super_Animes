import { StorageRequest } from '@/domain/contracts/gateways';
import * as fs from 'fs';

export const makeUploadFile = (resource: string) => {
  const normalizeFiles = (files: Array<Express.Multer.File> | Express.Multer.File): StorageRequest[] | StorageRequest | undefined => {
    if (Array.isArray(files) && files.length > 0) {
      return files.map(
        (image): StorageRequest => ({
          file: Buffer.from(fs.readFileSync(image.path)),
          fieldName: image.originalname,
          mimeType: image.mimetype,
          size: image.size,
          path: image.path,
          destination: resource,
        }),
      );
    }
    if (!Array.isArray(files) && files) {
      return {
        file: Buffer.from(fs.readFileSync(files.path)),
        fieldName: files.originalname,
        mimeType: files.mimetype,
        size: files.size,
        path: files.path,
        destination: resource,
      };
    }
    return undefined;
  };
  return { normalizeFiles };
};
