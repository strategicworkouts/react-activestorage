"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useActiveStorage = void 0;
const react_1 = require("react");
const upload_1 = require("./upload");
const DEFAULT_URL = "/rails/active_storage/direct_uploads";
const useActiveStorage = (file, callback, csrf /* specify a null CSRF to skips sending an "X-CSRF-TOKEN" header */, storageHeaders = {}, URL = DEFAULT_URL /* specify a custom URL to upload the file to */) => {
    const [progress, setProgress] = (0, react_1.useState)();
    const [uploading, setUploading] = (0, react_1.useState)(false);
    const ref = (0, react_1.useRef)(callback);
    (0, react_1.useEffect)(() => {
        ref.current = callback;
    }, [callback]);
    (0, react_1.useEffect)(() => {
        if (!file)
            return;
        (async () => {
            setUploading(true);
            setProgress(undefined);
            try {
                const blob = await (0, upload_1.upload)({
                    file,
                    csrf,
                    progress: setProgress,
                    uploadUrl: URL,
                    storageHeaders,
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
exports.useActiveStorage = useActiveStorage;
