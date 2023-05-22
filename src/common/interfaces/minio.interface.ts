import * as Enums from 'common/enums';

enum EnumAppMimeType {
    'image/png' = 'image/png',
    'image/jpeg' = 'image/jpeg',
}

export interface BufferedFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: EnumAppMimeType;
    size: number;
    buffer: Buffer | string;
}

export interface HasFile {
    file: Buffer | string;
}

export interface FileInfo {
    file: BufferedFile;
    parentDir: Enums.UploadDirectory;
    objectName?: string;
}

export interface StoredFile extends HasFile, StoredFileMetadata {}

export interface StoredFileMetadata {
    id: string;
    name: string;
    encoding: string;
    mimetype: EnumAppMimeType;
    size: number;
    updatedAt: Date;
    fileSrc?: string;
}

export interface UploadResponse {
    url: string;
    fileDirectory: string;
}
