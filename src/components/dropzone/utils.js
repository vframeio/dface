/**
 * MagicDropZone utilities
 * @module components/dropzone/utils.js
 */

export const supportMultiple =
  typeof document !== "undefined" && document && document.createElement
    ? "multiple" in document.createElement("input")
    : true;

export function getDataTransferItems(event) {
  let dataTransferItemsList = [];
  if (event.dataTransfer) {
    const dt = event.dataTransfer;
    if (dt.files && dt.files.length) {
      dataTransferItemsList = dt.files;
    } else if (dt.items && dt.items.length) {
      // During the drag even the dataTransfer.files is null
      // but Chrome implements some drag store, which is accesible via dataTransfer.items
      return Array.prototype.slice
        .call(dt.items)
        .filter((item) => item.kind === "file");
    }
  } else if (event.target && event.target.files) {
    dataTransferItemsList = event.target.files;
  }
  // Convert from DataTransferItemsList to the native Array
  return Array.prototype.slice.call(dataTransferItemsList);
}

// Firefox versions prior to 53 return a bogus MIME type for every file drag, so dragovers with
// that MIME type will always be accepted
export function fileAccepted(file, accept) {
  return file.type === "application/x-moz-file" || accepts(file, accept);
}

export function fileMatchSize(file, maxSize, minSize) {
  return file.size <= maxSize && file.size >= minSize;
}

export function allFilesAccepted(files, accept) {
  return files.every((file) => fileAccepted(file, accept));
}

// allow the entire document to be a drag target
export function onDocumentDragOver(e) {
  e.preventDefault();
}

function accepts(file, acceptedFiles) {
  if (file && acceptedFiles) {
    const acceptedFilesArray = Array.isArray(acceptedFiles)
      ? acceptedFiles
      : acceptedFiles.split(",");
    const fileName = file.name || "";
    const mimeType = file.type || "";
    const baseMimeType = mimeType.replace(/\/.*$/, "");

    return acceptedFilesArray.some((type) => {
      const validType = type.trim();
      if (validType.charAt(0) === ".") {
        return fileName.toLowerCase().endsWith(validType.toLowerCase());
      } else if (/\/\*$/.test(validType)) {
        // This is something like a image/* mime type
        return baseMimeType === validType.replace(/\/.*$/, "");
      }
      return mimeType === validType;
    });
  }
  return true;
}
