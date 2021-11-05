/**
 * MagicDropZone
 * Clone of https://github.com/bourdakos1/react-magic-dropzone/
 * @module components/dropzone/MagicDropZone.js
 */

import React, { Component } from "react";

import {
  supportMultiple,
  fileAccepted,
  allFilesAccepted,
  fileMatchSize,
  onDocumentDragOver,
  getDataTransferItems,
} from "./utils";

class MagicDropzone extends Component {
  isFileDialogActive = false;

  componentDidMount() {
    this.dragTargets = [];

    // document.addEventListener("dragover", onDocumentDragOver, false);
    // document.addEventListener("drop", this.onDocumentDrop, false);
    document.addEventListener("dragstart", this.onDragStart, false);
    document.addEventListener("dragenter", this.onDragEnter, false);
    document.addEventListener("dragover", this.onDragOver, false);
    document.addEventListener("dragleave", this.onDragLeave, false);
    document.addEventListener("drop", this.onDrop, false);
    this.fileInputEl.addEventListener("click", this.onInputElementClick, false);
    // Tried implementing addEventListener, but didn't work out
    document.body.onfocus = this.onFileDialogCancel;
  }

  componentWillUnmount() {
    // document.removeEventListener("dragover", onDocumentDragOver);
    // document.removeEventListener("drop", this.onDocumentDrop);
    document.removeEventListener("dragstart", this.onDragStart);
    document.removeEventListener("dragenter", this.onDragEnter);
    document.removeEventListener("dragover", this.onDragOver);
    document.removeEventListener("dragleave", this.onDragLeave);
    document.removeEventListener("drop", this.onDrop);
    this.fileInputEl.removeEventListener(
      "click",
      this.onInputElementClick,
      false
    );
    // Can be replaced with removeEventListener, if addEventListener works
    document.body.onfocus = null;
  }

  composeHandlers = (handler) => {
    const { disabled } = this.props;
    if (disabled) {
      return null;
    }
    return handler;
  };

  onDocumentDrop = (e) => {
    if (this.node && this.node.contains(e.target)) {
      // if we intercepted an event for our instance, let it propagate down to the instance's onDrop handler
      return;
    }
    e.preventDefault();
    this.dragTargets = [];
  };

  onElementDrop = (e) => {
    // Allow event to propagate down to the document onDrop
    return;
  };

  onDragStart = (e) => {
    const { onDragStart } = this.props;
    if (onDragStart) {
      onDragStart.call(this, e);
    }
  };

  // After much internal debate I decided to not distinguish that the files will
  // be accepted. It is not widely supported and we only get mime-type info back
  // Also, users won't be able to react fast enough to do anything if the
  // overlay says WAIT THAT FILE ISN'T GOING TO WORK
  onDragEnter = (e) => {
    const { onDragEnter } = this.props;
    e.preventDefault();

    // Count the dropzone and any children that are entered.
    if (this.dragTargets.indexOf(e.target) === -1) {
      this.dragTargets.push(e.target);
    }

    const draggedFiles = getDataTransferItems(e);

    if (onDragEnter) {
      onDragEnter.call(this, e);
    }
  };

  onDragOver = (e) => {
    const { onDragOver } = this.props;
    e.preventDefault();
    e.stopPropagation();
    try {
      e.dataTransfer.dropEffect = "copy";
    } catch (err) {
      // continue regardless of error
    }

    if (onDragOver) {
      onDragOver.call(this, e);
    }
    return false;
  };

  onDragLeave = (e) => {
    const { onDragLeave } = this.props;
    e.preventDefault();

    // Only deactivate once the dropzone and all children have been left.
    this.dragTargets = this.dragTargets.filter(
      (element) => element !== e.target && this.node.contains(element)
    );
    if (this.dragTargets.length > 0) {
      return;
    }

    if (onDragLeave) {
      onDragLeave.call(this, e);
    }
  };

  onDrop = (e) => {
    const {
      onDrop,
      onDropAccepted,
      onDropRejected,
      multiple,
      disablePreview,
      minSize,
      maxSize,
      accept,
    } = this.props;
    const fileList = getDataTransferItems(e);
    const acceptedFiles = [];
    const rejectedFiles = [];

    // Stop default browser behavior
    e.preventDefault();

    // If there aren't any files, it might be a link.
    if (fileList.length === 0) {
      this.onLink(e);
      return;
    }

    // Reset the counter along with the drag on a drop.
    this.dragTargets = [];
    this.isFileDialogActive = false;

    fileList.forEach((file) => {
      if (!disablePreview) {
        try {
          file.preview = window.URL.createObjectURL(file);
        } catch (err) {
          if (process.env.NODE_ENV !== "production") {
            // console.error('Failed to generate preview for file', file, err)
          }
        }
      }

      if (fileAccepted(file, accept) && fileMatchSize(file, maxSize, minSize)) {
        acceptedFiles.push(file);
      } else {
        rejectedFiles.push(file);
      }
    });

    if (!multiple) {
      // if not in multi mode add any extra accepted files to rejected.
      // This will allow end users to easily ignore a multi file drop in "single" mode.
      rejectedFiles.push(...acceptedFiles.splice(1));
    }

    if (onDrop) {
      onDrop.call(this, acceptedFiles, rejectedFiles, [], e);
    }

    if (rejectedFiles.length > 0 && onDropRejected) {
      onDropRejected.call(this, rejectedFiles, e);
    }

    if (acceptedFiles.length > 0 && onDropAccepted) {
      onDropAccepted.call(this, acceptedFiles, e);
    }
  };

  onClick = (e) => {
    const { onClick, disableClick } = this.props;
    if (!disableClick) {
      e.stopPropagation();

      if (onClick) {
        onClick.call(this, e);
      }

      // in IE11/Edge the file-browser dialog is blocking, ensure this is behind setTimeout
      // this is so react can handle state changes in the onClick prop above above
      // see: https://github.com/react-dropzone/react-dropzone/issues/450
      setTimeout(this.open.bind(this), 0);
    }
  };

  onInputElementClick = (e) => {
    const { inputProps } = this.props;
    e.stopPropagation();
    if (inputProps && inputProps.onClick) {
      inputProps.onClick();
    }
  };

  onFileDialogCancel = () => {
    // timeout will not recognize context of this method
    const { onFileDialogCancel } = this.props;
    const { fileInputEl } = this;
    let { isFileDialogActive } = this;
    // execute the timeout only if the onFileDialogCancel is defined and FileDialog
    // is opened in the browser
    if (onFileDialogCancel && isFileDialogActive) {
      setTimeout(() => {
        // Returns an object as FileList
        const FileList = fileInputEl.files;
        if (!FileList.length) {
          isFileDialogActive = false;
          onFileDialogCancel();
        }
      }, 300);
    }
  };

  setRef = (ref) => {
    this.node = ref;
  };

  setRefs = (ref) => {
    this.fileInputEl = ref;
  };

  /**
   * Open system file upload dialog.
   *
   * @public
   */
  open() {
    this.isFileDialogActive = true;
    this.fileInputEl.value = null;
    this.fileInputEl.click();
  }

  onLink = (e) => {
    const { onDrop, accept } = this.props;

    if (!accept) {
      if (onDrop) {
        onDrop([], [], [], e);
      }
      return;
    }

    var extensionReg = /(\.[^.]+)(?=[,]|$)/gi;

    var extensions = accept.match(extensionReg);

    if (!extensions) {
      if (onDrop) {
        onDrop([], [], [], e);
      }
      return;
    }

    var replace =
      "(https://|http://)((?!http).)*(" + extensions.join("|") + ")";
    var urlReg = new RegExp(replace, "gi");

    var links = [];
    if (e.dataTransfer) {
      var uriLink = decodeURIComponent(
        e.dataTransfer.getData("text/uri-list")
      ).match(urlReg);

      var htmlLink = e.dataTransfer.getData("text/html").match(urlReg);

      // Have priority of the actual uri.
      if (uriLink) {
        links = [...uriLink];
      } else if (htmlLink) {
        links = [
          ...htmlLink
            .filter((l) => l.indexOf('"') === -1)
            .map((v) => {
              return decodeURIComponent(v);
            }),
        ];
      }
    } else {
      // Not sure when this will ever be the case?
      links = [...decodeURIComponent(e.target.value).match(urlReg)];
    }

    if (onDrop) {
      onDrop([], [], links, e);
    }
  };

  render() {
    const { accept, children, disabled, multiple, ...possibleUnused } =
      this.props;

    const {
      preventDropOnDocument,
      disablePreview,
      disableClick,
      maxSize,
      minSize,
      inputProps,
      onDropAccepted,
      onDropRejected,
      onFileDialogCancel,
      ...restOfProps
    } = possibleUnused;

    return (
      <div
        {...restOfProps}
        onClick={this.composeHandlers(this.onClick)}
        onDragStart={this.composeHandlers(this.onDragStart)}
        onDragEnter={this.composeHandlers(this.onDragEnter)}
        onDragOver={this.composeHandlers(this.onDragOver)}
        onDragLeave={this.composeHandlers(this.onDragLeave)}
        onDrop={this.composeHandlers(this.onElementDrop)}
        ref={this.setRef}
        aria-disabled={disabled}
      >
        {children}
        <input
          disabled={disabled}
          accept={accept}
          type="file"
          style={{ display: "none" }}
          multiple={supportMultiple && multiple}
          ref={this.setRefs}
          onChange={this.onDrop}
          autoComplete="off"
        />
      </div>
    );
  }
}

MagicDropzone.defaultProps = {
  preventDropOnDocument: true,
  disabled: false,
  disablePreview: false,
  disableClick: false,
  multiple: true,
  maxSize: Infinity,
  minSize: 0,
};

export default MagicDropzone;
