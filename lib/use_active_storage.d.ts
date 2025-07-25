import type { ActiveStorageProgress } from "./types/active_storage_progress";
import type { ActiveStorageBlob } from "./types/active_storage_blob";
import type { ActiveStorageCSRF } from "./types/active_storage_csrf";
export declare const useActiveStorage: (file?: File, callback?: (_: {
    blob?: ActiveStorageBlob;
    error?: Error;
}) => void, csrf?: ActiveStorageCSRF, storageHeaders?: Record<string, string>, URL?: string) => {
    uploading: boolean;
    progress?: ActiveStorageProgress;
};
