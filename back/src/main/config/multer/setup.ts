import { Injectable } from '@nestjs/common';
import { MulterOptionsFactory } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { resolve } from 'path';
import * as crypto from 'crypto';

export const dest = {
  temp: resolve('temp'),
  base: resolve('temp', 'base'),
};

@Injectable()
export class MulterConfig implements MulterOptionsFactory {
  createMulterOptions(): MulterOptions | Promise<MulterOptions> {
    return {
      dest: dest.temp,
      fileFilter: (request, file, callback) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, extension] = file.originalname.split('.');
        const fileHash = crypto.randomBytes(16).toString('hex');
        const fileName = `${fileHash}.${extension}`;
        file.fieldname = fileName;
        return callback(null, true);
      },
    };
  }
}
