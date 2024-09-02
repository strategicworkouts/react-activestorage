type Progress = {
    loaded: number;
    total: number;
};
type Blob = {
    signed_id: string;
    filename: string;
};
type Callback = (params: {
    blob?: Blob;
    error?: Error;
}) => void;
type CSRF = string | null | (() => Promise<string>);
export declare const useActiveStorage: (file?: File, callback?: Callback, csrf?: CSRF, URL?: string) => {
    uploading: boolean;
    progress?: Progress;
};
export {};
