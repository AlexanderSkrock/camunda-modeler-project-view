/* eslint-disable no-unused-vars */
import React, { useCallback, useState } from 'camunda-modeler-plugin-helpers/react';

import { Box, Button, Form, List } from 'grommet'
import styled from 'styled-components';

import { useFilePicker } from 'use-file-picker';
import normalize from 'normalize-path';

export default ({ configuration, onSubmit }) => {
  const [initialConfig] = useState(configuration || {});
  const [libraryPaths, setLibraryPaths] = useState(initialConfig.libraryPaths || [])

  const addLibraryPaths = useCallback((files) => {
    const uniqueLibraryPaths = new Set(libraryPaths);
    files
      .map(file => {
        const normalizedPath = normalize(file.path);
        const normalizedRelPath = normalize(file.webkitRelativePath);
        const rootPath = normalizedPath.substring(0, normalizedPath.indexOf(normalizedRelPath))
        const directoryName = normalizedRelPath.substring(0, normalizedRelPath.indexOf("/"));
        return rootPath + directoryName;
      })
      .forEach(dir => uniqueLibraryPaths.add(dir));
    setLibraryPaths([...uniqueLibraryPaths]);
  }, [libraryPaths, setLibraryPaths]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const newConfig = { ...initialConfig };
    newConfig.libraryPaths = libraryPaths;
    onSubmit(newConfig);
  }, [libraryPaths, onSubmit]);

  const { openFilePicker } = useFilePicker({
    initializeWithCustomParameters: input => {
      // Enable to ability to select directories
      input.setAttribute("directory", "true");
      input.setAttribute("webkitdirectory", "true");
    },
    readFilesContent: false,
    onFilesSelected: (result) => addLibraryPaths(result.plainFiles)
  });

  return (
    <>
      Project View Configuration
      <Form id="projectViewConfigForm" onSubmit={ handleSubmit }>
        <List data={ libraryPaths } />
        <Button onClick={ openFilePicker }>
          Add library path
        </Button>
        <Box direction="row" gap="medium">
          <Button type="submit" primary label="Submit" />
          <Button type="reset" label="Reset" />
        </Box>
      </Form>
    </>
  );
}