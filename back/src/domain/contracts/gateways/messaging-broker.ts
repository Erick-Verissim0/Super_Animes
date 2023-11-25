import { StorageRequest, StorageResponse } from './storage';

export interface SendTopic {
  sendTopic<T = any, R = any>(params: SendTopic.Params<T>): Promise<SendTopic.Result<R>>;
}

export namespace SendTopic {
  export type Params<T = any> = { key?: string; topic: string; message: T };
  export type Result<R = any> = { data: R } | void;
}

export interface SendTopicFile {
  sendFile(params: SendTopicFile.Params): Promise<SendTopicFile.Result>;
}

export namespace SendTopicFile {
  export type Params = {
    message: { isAsync?: boolean; key_provider: string; key_gateway: string; files: StorageRequest | Array<StorageRequest> };
  };
  export type Result = StorageResponse | Array<StorageResponse>;
}
