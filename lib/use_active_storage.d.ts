type Progress = {
    loaded: number;
    total: number;
};
type Blob = {
    signed_id: string;
    filename: string;
};
interface HashMap<T> {
    [key: string]: T;
}
type Callback = (params: {
    blob?: Blob;
    error?: Error;
}) => void;
export declare const useActiveStorage: (file?: File, callback?: Callback, storageHeaders?: HashMap<string>, URL?: string) => {
    uploading: boolean;
    progress?: Progress;
};
export {};
