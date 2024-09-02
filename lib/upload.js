const ASYNC = true;
export const upload = ({ url, method, file, headers, progress, }) => new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, ASYNC);
    for (const key in headers) {
        xhr.setRequestHeader(key, headers[key]);
    }
    xhr.onload = (event) => {
        progress?.({
            loaded: event.loaded,
            total: event.total,
        });
        if (xhr.status > 299 || xhr.status < 200)
            reject(new Error(`Unable to upload "${file.name}". Please try again.`));
        else
            resolve();
    };
    xhr.onerror = (event) => {
        reject(event);
    };
    xhr.upload.onprogress = (event) => {
        progress?.({
            loaded: event.loaded,
            total: event.total,
        });
    };
    xhr.send(file);
});
