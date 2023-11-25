export interface StorageRequest {
  file: Buffer;
  fieldName: string;
  mimeType: string;
  size: number;
  path: string;
  destination: string;
}

export interface StorageResponse {
  id: string;
  field_name: string;
  url: string;
}
