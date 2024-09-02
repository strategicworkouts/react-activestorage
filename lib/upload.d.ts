export declare const upload: ({ url, method, file, headers, progress, }: {
    url: string;
    method: string;
    file: File;
    headers: Record<string, string>;
    progress?(_: {
        loaded: number;
        total: number;
    }): void;
}) => Promise<void>;
