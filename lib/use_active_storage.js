import { useEffect, useRef, useState } from "react";
import { checksum } from "./checksum";
import { upload } from "./upload";
const DEFAULT_URL = "/rails/active_storage/direct_uploads";
export const useActiveStorage = (file, callback, csrf /* specify a null CSRF to skips sending an "X-CSRF-TOKEN" header */, URL = DEFAULT_URL /* specify a custom URL to upload the file to */) => {
    const [progress, setProgress] = useState();
    const [uploading, setUploading] = useState(false);
    const ref = useRef(callback);
    useEffect(() => {
        ref.current = callback;
    }, [callback]);
    useEffect(() => {
        if (!file)
            return;
        (async () => {
            setUploading(true);
            setProgress(undefined);
            const token = await (async () => {
                if (typeof csrf === "function") {
                    return await csrf();
                }
                else {
                    return csrf === undefined
                        ? document
                            ?.querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content")
                        : csrf;
                }
            })();
            try {
                const response = await fetch(URL, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        ...(token ? { "X-CSRF-Token": token } : {}),
                    },
                    body: JSON.stringify({
                        blob: {
                            filename: file.name,
                            content_type: file.type,
                            byte_size: file.size,
                            checksum: await checksum(file),
                        },
                    }),
                });
                if (!response.ok)
                    throw new Error(`Unable to upload "${file.name}". Please try again.`);
                const { direct_upload: { url, headers }, ...blob } = await response.json();
                await upload({
                    method: "PUT",
                    url,
                    headers,
                    file,
                    progress: (progress) => {
                        setProgress(progress);
                    },
                });
                ref.current?.({ blob });
            }
            catch (error) {
                ref.current?.({ error: error });
            }
            setUploading(false);
            setProgress(undefined);
        })();
    }, [file]);
    return {
        uploading,
        progress,
    };
};
