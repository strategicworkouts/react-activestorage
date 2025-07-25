"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const checksum_1 = require("./utils/checksum");
const xhr_1 = require("./utils/xhr");
const URL = "/rails/active_storage/direct_uploads";
const upload = async ({ file, csrf, progress, uploadUrl = URL, storageHeaders = {}, }) => {
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
    const response = await fetch(uploadUrl, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...(token ? { "X-CSRF-Token": token } : {}),
            ...storageHeaders,
        },
        body: JSON.stringify({
            blob: {
                filename: file.name,
                content_type: file.type,
                byte_size: file.size,
                checksum: await (0, checksum_1.checksum)(file),
            },
        }),
    });
    if (!response.ok)
        throw new Error(`Unable to upload "${file.name}". Please try again.`);
    const { direct_upload: { url, headers }, ...blob } = await response.json();
    await (0, xhr_1.xhr)({
        method: "PUT",
        url,
        headers,
        file,
        progress,
    });
    return blob;
};
exports.upload = upload;
