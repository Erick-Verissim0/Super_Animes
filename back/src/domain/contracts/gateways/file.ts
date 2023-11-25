export interface FileAllow {
  validate: (input: FileAllow.Input) => FileAllow.Output;
}
export namespace FileAllow {
  export type Input = { contentType: string; collection: Collection };
  export type Output = void;

  export enum Collection {
    baseMaster = 'baseMaster',
  }
}
