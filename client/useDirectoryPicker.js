import React, { useCallback } from "camunda-modeler-plugin-helpers/react";
import { useFilePicker } from "use-file-picker";
import normalize from "normalize-path";

export default (onDirectoriesSelected) => {
  const onFilesSelected = useCallback(({ plainFiles }) => {
    const directories = new Set();
    plainFiles.map(file => {
        const normalizedPath = normalize(file.path);
        const normalizedRelPath = normalize(file.webkitRelativePath);
        const rootPath = normalizedPath.substring(0, normalizedPath.indexOf(normalizedRelPath))
        const directoryName = normalizedRelPath.substring(0, normalizedRelPath.indexOf("/"));
        return rootPath + directoryName;
      })
      .forEach(dir => directories.add(dir));

    if (onDirectoriesSelected) {
      onDirectoriesSelected(directories);
    }
  });

  const { openFilePicker: openDirectoryPicker } = useFilePicker({
    initializeWithCustomParameters: input => {
      // Enable to ability to select directories
      input.setAttribute("directory", "true");
      input.setAttribute("webkitdirectory", "true");
    },
    readFilesContent: false,
    onFilesSelected: onFilesSelected
  });

  return [ openDirectoryPicker ];
}