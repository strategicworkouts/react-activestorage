import type { ActiveStorageBlob } from "./types/active_storage_blob";
import type { ActiveStorageCSRF } from "./types/active_storage_csrf";
import type { ActiveStorageProgress } from "./types/active_storage_progress";
export declare const upload: ({ file, csrf, progress, uploadUrl, storageHeaders, }: {
    file: File;
    csrf?: ActiveStorageCSRF;
    progress?(_: ActiveStorageProgress): void;
    uploadUrl?: string;
    storageHeaders?: Record<string, string>;
}) => Promise<ActiveStorageBlob>;
