import { InvalidParameterError } from '@/application/errors';
import { FileAllow } from '@/domain/contracts/gateways';

export class FileValidateType implements FileAllow {
  private Collections = {
    baseMaster: [
      'application/vnd.ms-excel.sheet.macroenabled.12',
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ],
  };
  validate(input: FileAllow.Input): FileAllow.Output {
    const checkFile: string = this.Collections[input.collection].find((type: string) => type === input.contentType);
    if (!checkFile) {
      throw new InvalidParameterError(`Invalid file type: ${input.contentType}`);
    }
  }
}
